/**
 * Google Sheets content source.
 *
 * Reads a single Google Spreadsheet (one tab per screen) and turns it into the
 * structured content object the frontend expects. The spreadsheet must be
 * shared so that "anyone with the link" can view it (no API key required) — the
 * tabs are fetched through the public CSV export (gviz) endpoint.
 *
 * Configure with the `GOOGLE_SHEET_ID` environment variable (the long id in the
 * sheet URL: https://docs.google.com/spreadsheets/d/<THIS_PART>/edit).
 *
 * Every parse step is defensive: a missing tab, empty tab, or network error
 * simply omits that section, and the frontend falls back to its built-in
 * defaults. The display must never break.
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';

// Tab (worksheet) names expected inside the Google Sheet. Keep these in English
// so they survive URL encoding; column headers inside each tab may be Hebrew.
const TABS = {
  ticker: 'Ticker',
  home: 'Home',
  appearance: 'Appearance',
  services: 'Services',
  discipline: 'Discipline',
  procedures: 'Procedures',
  announcements: 'Announcements',
  safety: 'Safety',
};

// Cache the parsed content briefly so we don't hammer Google on every request.
const CACHE_TTL_MS = 30_000;
let cache = { at: 0, content: null };

/* ------------------------------------------------------------------ */
/*  Low-level helpers                                                   */
/* ------------------------------------------------------------------ */

function gvizUrl(tabName) {
  return (
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`
  );
}

/** Parse CSV text (RFC-4180-ish: quoted fields, escaped quotes, newlines). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char === '\r') {
      // ignore — handled by the following \n
    } else {
      field += char;
    }
  }
  // flush last field/row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Convert CSV text into row objects keyed by the (normalized) header row.
 * Returns `[]` when there's no data beyond the header.
 */
export function csvToRows(csv) {
  const rows = parseCsv(csv).filter((r) => r.some((c) => c.trim() !== ''));
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (cells[idx] ?? '').trim();
    });
    return obj;
  });
}

/**
 * Every content tab ships a help/instructions row immediately beneath the
 * header (row 2 in the sheet — the pale-cyan "explanation" row editors are told
 * not to delete). It documents each column and must never reach the display, so
 * we drop the first parsed row before any per-screen parsing runs.
 *
 * @param {Array<Record<string,string>>} rows
 */
function dropHelpRow(rows) {
  return rows.length ? rows.slice(1) : rows;
}

/**
 * Fetch a tab and return its rows as objects keyed by the (normalized) header
 * row. Returns `[]` on any failure.
 */
async function fetchTab(tabName) {
  if (!SHEET_ID) return [];
  try {
    const res = await fetch(gvizUrl(tabName));
    if (!res.ok) {
      console.warn(`⚠️  Sheet tab "${tabName}" returned HTTP ${res.status}`);
      return [];
    }
    return dropHelpRow(csvToRows(await res.text()));
  } catch (error) {
    console.warn(`⚠️  Failed to fetch sheet tab "${tabName}":`, error.message);
    return [];
  }
}

/** Pick the first non-empty value among several possible header names. */
function pick(obj, ...keys) {
  for (const key of keys) {
    if (obj[key] != null && obj[key].trim() !== '') return obj[key].trim();
  }
  return '';
}

/** Split a multi-line cell into a list (newlines or a literal "|"). */
function splitLines(value) {
  if (!value) return [];
  return value
    .split(/\r?\n|\|/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isTruthy(value) {
  const v = (value || '').trim().toLowerCase();
  return v === 'כן' || v === 'true' || v === '1' || v === 'yes' || v === 'v';
}

/* ------------------------------------------------------------------ */
/*  Per-screen parsers                                                 */
/* ------------------------------------------------------------------ */

function parseTicker(rows) {
  const messages = rows
    .map((r) => pick(r, 'הודעה', 'תוכן', 'content', 'message', Object.keys(r)[0]))
    .filter(Boolean);
  return messages.length ? messages : null;
}

function parseHome(rows) {
  const home = {};
  for (const r of rows) {
    const key = pick(r, 'שדה', 'מפתח', 'key', 'field');
    const value = pick(r, 'ערך', 'value', 'תוכן');
    if (!key) continue;
    if (key === 'box1Text') home.box1Text = value;
    else if (key === 'box2Text') home.box2Text = value;
    else if (key === 'dailyNote') home.dailyNote = value;
  }
  return Object.keys(home).length ? home : null;
}

function parseAppearance(rows) {
  const sections = [];
  let current = null;
  for (const r of rows) {
    const title = pick(r, 'כותרת', 'title', 'מקטע', 'section');
    const item = pick(r, 'פריט', 'item', 'תוכן', 'body', 'text');
    if (title) {
      if (!current || current.title !== title) {
        current = { title, items: [] };
        sections.push(current);
      }
    }
    if (item && current) {
      current.items.push(...splitLines(item));
    }
  }
  const cleaned = sections.filter((s) => s.title && s.items.length);
  return cleaned.length ? { sections: cleaned } : null;
}

function parseServices(rows) {
  const services = rows
    .map((r) => {
      const name = pick(r, 'שם', 'שירות', 'name');
      if (!name) return null;
      return {
        name,
        hours: splitLines(pick(r, 'שעות', 'hours')),
        location: pick(r, 'מיקום', 'location'),
        urgent: isTruthy(pick(r, 'דחוף', 'urgent')),
      };
    })
    .filter(Boolean);
  return services.length ? services : null;
}

function parseDiscipline(rows) {
  const blocks = rows
    .map((r) => {
      const title = pick(r, 'כותרת', 'title');
      if (!title) return null;
      return {
        title,
        subtitle: pick(r, 'תת_כותרת', 'תת כותרת', 'subtitle'),
        items: splitLines(pick(r, 'פריטים', 'items')),
      };
    })
    .filter(Boolean);
  return blocks.length ? blocks : null;
}

function parseProcedures(rows) {
  const procedures = {};
  for (const r of rows) {
    const key = pick(r, 'שדה', 'מפתח', 'key', 'field');
    const value = pick(r, 'ערך', 'value', 'תוכן');
    if (!key || !key.includes('.')) continue;
    const [card, prop] = key.split('.');
    if (!['card1', 'card2', 'card3'].includes(card)) continue;
    procedures[card] = procedures[card] || {};
    procedures[card][prop] = value;
  }
  return Object.keys(procedures).length ? procedures : null;
}

function parseAnnouncements(rows) {
  const board = [];
  const smoking = [];
  const directions = [];
  let directionsWarning = '';

  for (const r of rows) {
    const section = pick(r, 'מקטע', 'section').toLowerCase();
    const title = pick(r, 'כותרת', 'title');
    const body = pick(r, 'תוכן', 'body', 'text');
    if (section === 'board') {
      if (title || body) board.push({ title, body });
    } else if (section === 'smoking') {
      if (body || title) smoking.push(body || title);
    } else if (section === 'directions') {
      if (body || title) directions.push(body || title);
    } else if (section === 'directionswarning' || section === 'warning') {
      directionsWarning = body || title;
    }
  }

  const result = {};
  if (board.length) result.board = board;
  if (smoking.length) result.smoking = smoking;
  if (directions.length) result.directions = directions;
  if (directionsWarning) result.directionsWarning = directionsWarning;
  return Object.keys(result).length ? result : null;
}

function parseSafety(rows) {
  const cards = rows
    .map((r) => {
      const title = pick(r, 'כותרת', 'title');
      if (!title) return null;
      const card = {
        title,
        subtitle: pick(r, 'תת_כותרת', 'תת כותרת', 'subtitle'),
        alert: pick(r, 'התראה', 'alert'),
        items: splitLines(pick(r, 'פריטים', 'items')),
      };
      const critical = pick(r, 'קריטי', 'critical');
      const footer = pick(r, 'תחתית', 'footer');
      if (critical) card.critical = critical;
      if (footer) card.footer = footer;
      return card;
    })
    .filter(Boolean);
  return cards.length ? cards : null;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Assemble the cleaned (null-sections-dropped) content object from already
 * fetched tab rows. Pure function — exported for testing.
 *
 * @param {{ticker,home,services,discipline,procedures,announcements,safety}} tabs
 */
export function buildContent(tabs) {
  const content = {
    ticker: parseTicker(tabs.ticker || []),
    home: parseHome(tabs.home || []),
    appearance: parseAppearance(tabs.appearance || []),
    services: parseServices(tabs.services || []),
    discipline: parseDiscipline(tabs.discipline || []),
    procedures: parseProcedures(tabs.procedures || []),
    announcements: parseAnnouncements(tabs.announcements || []),
    safety: parseSafety(tabs.safety || []),
  };

  // Drop null sections so the response only carries real overrides.
  const cleaned = {};
  for (const [key, value] of Object.entries(content)) {
    if (value != null) cleaned[key] = value;
  }
  return cleaned;
}

/**
 * Returns the (partial) site content parsed from the Google Sheet, or `null`
 * when no sheet is configured / reachable. Sections that couldn't be parsed are
 * simply omitted so the frontend can fall back to its defaults.
 */
export async function getSiteContent() {
  if (!SHEET_ID) return null;

  const now = Date.now();
  if (cache.content && now - cache.at < CACHE_TTL_MS) {
    return cache.content;
  }

  const [
    ticker,
    home,
    appearance,
    services,
    discipline,
    procedures,
    announcements,
    safety,
  ] = await Promise.all([
    fetchTab(TABS.ticker),
    fetchTab(TABS.home),
    fetchTab(TABS.appearance),
    fetchTab(TABS.services),
    fetchTab(TABS.discipline),
    fetchTab(TABS.procedures),
    fetchTab(TABS.announcements),
    fetchTab(TABS.safety),
  ]);

  const cleaned = buildContent({
    ticker,
    home,
    appearance,
    services,
    discipline,
    procedures,
    announcements,
    safety,
  });

  cache = { at: now, content: cleaned };
  return cleaned;
}

export const SHEET_CONFIGURED = Boolean(SHEET_ID);

# Editing the signage from Google Sheets

The whole display (ticker + all 6 screens) can be driven by **one Google
Sheet**. People you share the sheet with can change the text, and the screen
updates automatically within ~1 minute — no code, no deploys.

If no sheet is configured, the app simply shows its built-in default content, so
nothing breaks.

---

## 1. Create the sheet (one-time setup)

Run `npm run sheet:template` in the project. It writes two things to the
`google-sheets-template/` folder:

- **`signage-content-template.xlsx`** — the recommended, ready-made workbook with
  all tabs, an "הוראות" (instructions) tab, branded navy/cyan headers, frozen
  header rows, per-column help text, dropdowns and hover notes.
- **`*.csv`** — plain CSV fallbacks (one per screen) if you'd rather build the
  tabs manually.

### Option A — Import the formatted workbook (recommended)

1. Go to <https://drive.google.com> and **upload** `signage-content-template.xlsx`.
2. Right-click the uploaded file → **Open with → Google Sheets**. Google converts
   it and **keeps all tabs, colors, dropdowns and notes** in a single step.
3. (Optional) **File → Save as Google Sheets** to keep a clean Sheets copy.

That's it — all 7 tabs (`Ticker`, `Home`, `Services`, `Discipline`,
`Procedures`, `Announcements`, `Safety`) plus the instructions tab are ready.

### Option B — Import the CSVs manually

1. Go to <https://sheets.google.com> and create a **new, blank** spreadsheet.
2. Import each CSV **as its own tab**:
   - **File → Import → Upload**, pick a CSV (e.g. `Ticker.csv`).
   - Import location: **Insert new sheet(s)**.
   - Separator type: **Comma**.
   - Click **Import data**.
   - Repeat for every CSV.
3. Rename each tab to match the file name **exactly** (case-sensitive):
   `Ticker`, `Home`, `Services`, `Discipline`, `Procedures`, `Announcements`,
   `Safety`. Delete the empty default `Sheet1` tab.

> The important part either way is the **tab names** and the **header row** — the
> app reads by those.

## 2. Share it so the screen can read it

1. Click **Share** (top-right).
2. Under **General access**, choose **Anyone with the link**, role **Viewer**.
3. Under **Share** you can also add specific people as **Editor** — those are the
   folks who will maintain the content.

## 3. Connect the app to the sheet

1. Copy the sheet **ID** from its URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_LONG_ID`**`/edit`
2. In the project, copy `.env.example` to `.env` and set:
   ```
   GOOGLE_SHEET_ID=THIS_LONG_ID
   ```
3. Restart the backend (`npm run dev:all`). On startup it logs
   `Google Sheet content source: ENABLED`.

That's it. Edits made in the sheet appear on the screen automatically (cached up
to ~30s on the server + the screen re-fetches every ~60s).

---

## What each tab controls

| Tab             | Screen            | Columns / format |
| --------------- | ----------------- | ---------------- |
| `Ticker`        | Bottom ticker     | One column `הודעה` — one message per row. |
| `Home`          | Home action boxes | `שדה`, `ערך`. Fields: `box1Text`, `box2Text`, `dailyNote`. |
| `Services`      | Unit services     | `שם`, `שעות`, `מיקום`, `דחוף`. |
| `Discipline`    | Discipline (4 blocks) | `כותרת`, `תת_כותרת`, `פריטים`. |
| `Procedures`    | Procedures (3 cards) | `שדה`, `ערך` (e.g. `card1.phone`). |
| `Announcements` | Announcements     | `מקטע`, `כותרת`, `תוכן`. |
| `Safety`        | Safety (3 cards)  | `כותרת`, `תת_כותרת`, `התראה`, `קריטי`, `פריטים`, `תחתית`. |

### Multi-line cells (hours, bullet lists)

For cells that become a **list** — `שעות` on Services, `פריטים` on Discipline and
Safety — put each item on its **own line inside the same cell**:

- In Google Sheets press **Alt + Enter** (Windows) or **⌥ Option + Enter**
  (Mac) to add a new line within a cell.
- Alternatively separate items with a vertical bar `|`.

### Services — `דחוף` column

Choose `לא` for a normal (cyan) card, or `כן` to mark the service urgent
(red border) — used for the clinic (`מרפאה`). In the formatted workbook this
column is a **dropdown**, so you just pick `כן` / `לא`.

### Announcements — the `מקטע` column

| `מקטע` value        | Meaning |
| ------------------- | ------- |
| `board`             | A notice on the big board (uses `כותרת` + `תוכן`). The **first** `board` row is shown as the large highlighted notice. |
| `smoking`           | A line in the "פינות עישון" box (uses `תוכן`). The first line is highlighted. |
| `directions`        | A line in the "דרכי הגעה" box (uses `תוכן`). The first line is highlighted. |
| `directionsWarning` | The red warning under directions (uses `תוכן`). |

### Procedures — the `שדה` keys

`card1.subtitle`, `card1.intro`, `card1.callToAction`, `card1.phone`,
`card1.extension`, `card2.subtitle`, `card2.para1`, `card2.para2`,
`card3.para1`.

---

## Safety & reliability notes

- The sheet is **read-only** to the app; it never writes back.
- "Anyone with the link: Viewer" makes the content **publicly readable** to
  anyone who has the URL. Don't put anything sensitive/classified in it.
- Any tab you leave empty, delete, or mistype falls back to the built-in default
  for that screen — the display never goes blank.
- Keep the **tab names** and **header row** intact; only edit the data rows.

## Removing the integration

Delete `GOOGLE_SHEET_ID` from `.env` (or leave it empty) and restart. The app
returns to its built-in default content.

/**
 * Generates the editor-facing content template for the Google Sheet that drives
 * the signage. It produces TWO things in ./google-sheets-template/ :
 *
 *   1. signage-content-template.xlsx  ← recommended. A polished, navy/cyan
 *      branded workbook (one tab per screen) with frozen headers, per-column
 *      help text, dropdowns, hover notes and RTL layout. Upload it to Google
 *      Drive and "Open with → Google Sheets" — all the formatting is kept and
 *      every tab lands in one import.
 *
 *   2. *.csv (one per tab)  ← fallback for anyone who prefers importing plain
 *      CSVs manually.
 *
 * Run:  npm run sheet:template
 *
 * The starter values mirror the current on-screen content, so editors begin
 * from the real text and can simply change what they need.
 *
 * NB: keep the column headers and tab names in sync with server/googleSheets.js.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, '..', 'google-sheets-template');

/* ------------------------------------------------------------------ */
/*  Brand palette (navy + cyan) — ARGB for ExcelJS.                    */
/* ------------------------------------------------------------------ */
const NAVY = 'FF0D2A5C';
const NAVY_DARK = 'FF0A1F44';
const CYAN = 'FF22D3EE';
const CYAN_SOFT = 'FFD6F6FB';
const WHITE = 'FFFFFFFF';
const SLATE = 'FF1E293B';
const BORDER = 'FFB9C6D9';
const FONT = 'Arial';

/** Quote a CSV field when it contains a comma, quote, or newline. */
function csvCell(value) {
  const v = value == null ? '' : String(value);
  if (/[",\n\r]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function toCsv(rows) {
  return rows.map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

/* ------------------------------------------------------------------ */
/*  Starter content (mirror of the on-screen defaults).                */
/* ------------------------------------------------------------------ */

const tabs = {
  Ticker: [
    ['הודעה'],
    ['ברוכים הבאים ליחידה - מחויבים למצוינות תמיד'],
    ['אנא שמרו על ניקיון והופעה ראויים בכל עת'],
    ['תדרוכי בטיחות מתקיימים בכל יום ראשון בשעה 08:00'],
    ['זכרו - אבטחת מידע היא אחריות כל אחד ואחת'],
    ['שעות קבלת קהל מפקד היחידה: ימים א׳-ה׳ בין 14:00-16:00'],
    ['הזמנת תורים למרפאה דרך מערכת אפסנאות בלבד'],
  ],

  Home: [
    ['שדה', 'ערך'],
    ['box1Text', 'חייל שפר הופעתך!'],
    ['box2Text', 'להזין דו״ח 1'],
    ['dailyNote', ''],
  ],

  Appearance: [
    ['כותרת', 'פריט'],
    ['הקדמה', 'המשמעת בעלת חשיבות מרבית להבטחת פעילותו התקינה של צה״ל, והיא תנאי הכרחי לביצוע מלא ויעיל של המשימות המוטלות עליו.'],
    ['הקדמה', 'חיילי ומפקדי צה״ל יקפידו על הופעה מסודרת ותקנית בכל עת.'],
    ['הוראות הלבוש לבאים במחנות צה״ל', 'לא תותר כניסה בלבוש לא הולם למחנות צה״ל או באופן שאינו מכבד את כללי השירות המשותף.'],
    ['הוראות הלבוש לבאים במחנות צה״ל', 'חייל יקפיד על כלל הוראות הקבע של הופעה ולבוש בצורה תקנית ומסודרת.'],
    ['הוראות הלבוש לבאים במחנות צה״ל', 'חייל ילבש מדי שירות בכל עת שהוא בתפקיד או במסגרת צבאית, מבין פריטי הלבוש שקיבל מצה״ל ומפורטים בתעודת ציודו האישי (טופס 1004) בלבד, אלא אם נקבע אחרת בפקודות הצבא או לפיהן.'],
  ],

  Services: [
    ['שם', 'שעות', 'מיקום', 'דחוף'],
    ['כוורת', 'א׳–ה׳: 08:00–20:00\nו׳: 08:00–14:00', 'בניין מרכזי, קומה 1', 'לא'],
    ['חד״א', 'בוקר: 06:30–08:00\nצהריים: 12:00–13:30\nערב: 18:00–19:30', 'בניין האוכל', 'לא'],
    ['חד״כ', 'א׳–ה׳: 06:00–22:00\nו׳–ש׳: 08:00–18:00', 'בניין הספורט', 'לא'],
    ['מספרה', 'א׳, ג׳, ה׳: 14:00–17:00\nללא תור — לפי הגעה', 'ליד הכוורת', 'לא'],
    ['בית כנסת', 'פתוח בכל עת\nשחרית: 06:30\nמנחה-ערבית: לפי השקיעה', 'בניין מרכזי, קומה 2', 'לא'],
    ['מרפאה', 'א׳–ה׳: 07:00–19:00\nו׳: 08:00–13:00\nחירום: 24/7 — טלפון 101', 'בניין הרפואה', 'כן'],
    ['אפסנאות', 'א׳, ג׳, ה׳: 09:00–12:00\nקבלת ציוד בתיאום מראש', 'המחסן המרכזי', 'לא'],
  ],

  Discipline: [
    ['כותרת', 'תת_כותרת', 'פריטים'],
    [
      'היתר גידול זקן',
      'ההיתר תקף לכל משך השירות, בכפוף לעמידה בקריטריונים',
      'גידול זקן מותר בהתאם לרצון הפרט, ובלבד שהוא מסודר והולם הופעה צבאית נאותה\nזקן מלא מהפאות עד הסנטר (כולל שפם), ללא ביצוע “מדרגות”\nמותר לסדר את הזקן והשפם, אך אין לקצצו עד כדי זיפים\nחובה למלא הצהרה; פגיעה בנראות הזקן תוביל לשלילת ההיתר',
    ],
    [
      'דלת פתוחה',
      'כל חייל וחיילת יכולים לפנות למפקדים ישירות',
      'שעות קבלה: א׳–ה׳, 14:00–16:00\nתיאום מראש דרך מזכירות היחידה\nניתן לפנות גם לקצין רווחה\nסודיות מלאה מובטחת',
    ],
    [
      'מסדרים ותורנויות',
      'לוחות זמנים מתפרסמים בתחילת כל שבוע',
      'מסדר בוקר: כל יום 06:30\nתורנות מטבח: לפי לוח חודשי\nתורנות שמירה: משמרות של 4 שעות\nהחלפות מתואמות דרך קצין התורנות בלבד',
    ],
    [
      'הצדעה',
      'כבוד וכללי צה״ל',
      'הצדעה לקצינים בדרגת סגן ומעלה\nמרחק הצדעה: 6 צעדים\nבעת נשיאת נשק — הצדעת נשק\nבעת תקיעת התרועה — עמידת דום',
    ],
  ],

  Procedures: [
    ['שדה', 'ערך'],
    ['card1.subtitle', 'מרכז התמודדות ותמיכה'],
    ['card1.intro', 'במידה ואירעה פגיעה על רקע מיני / אלימות בהקשר זוגי / משפחה'],
    ['card1.callToAction', 'לפנייה אנונימית התקשרו'],
    ['card1.phone', '1111'],
    ['card1.extension', 'שלוחה 5 - 2'],
    ['card2.subtitle', 'אפס סובלנות'],
    ['card2.intro', 'ממונת יוהל״ם ביחידה, קצינת הת״ש - 058-7303090'],
    ['card2.para1', 'השימוש בסמים ובמשקאות משכרים ביחידה יגרור לחקירת מצ״ח ודין משמעתי המחמיר ביותר.'],
    ['card2.para2', 'אין למכור במתקני צה״ל משקאות אלכוהוליים לצריכה בתוך המחנות.'],
    ['card2.para3', 'יש לדווח על כל נושא חריג בנושא זה למפקד הישיר ולרנ״ג הפיקוד.'],
    ['card3.para1', 'מידע צבאי מסווג לא יועבר בטלפון / בפקס האזרחי ו/או המטכ״לי.'],
    ['card3.para2', 'אין לחבר חיבור חיצוני למחשבים צבאיים (USB, וכו׳)'],
    ['card3.para3', 'אין להוציא מידע צבאי מחוץ לתחומי הבסיס ללא אישור ביטחון מידע.'],
    ['card3.para4', 'בסיום השירות במסמכים צבאיים, יש לגרוס ואין לזרוק לאשפה.'],
    ['card3.para5', 'אין להעלות פרטים מסווגים/צבאיים על גבי רשתות חברתיות.'],
  ],

  Announcements: [
    ['מקטע', 'כותרת', 'תוכן'],
    ['board', '📢 הודעה דחופה', 'תרגיל חירום יתקיים ביום רביעי הקרוב בשעה 10:00. כל אנשי היחידה חייבים להשתתף.'],
    ['board', 'שינוי שעות חדר האוכל', 'החל מהשבוע הבא, ארוחת הערב תתקיים בין 17:30–19:00 (במקום 18:00–19:30).'],
    ['board', 'סדנת הדרכה — אבטחת מידע', 'סדנת הדרכה תתקיים ביום שלישי הקרוב בשעה 14:00 באודיטוריום. נוכחות חובה.'],
    ['board', 'יום ספורט ביחידה', 'יום ספורט ופעילות גופנית יתקיים ביום שישי הבא החל מהשעה 08:00. הגעה בבגדי ספורט.'],
    ['board', 'עדכון נהלים', 'נהלים מעודכנים לשמירה על ביטחון מידע פורסמו באתר היחידה. יש לקרוא ולהפנים.'],
    ['smoking', '', 'עישון מותר אך ורק באזורים המיועדים!'],
    ['smoking', '', '📍 פינת עישון מרכזית — ליד בניין המטה'],
    ['smoking', '', '📍 פינת עישון דרומית — ליד חדר האוכל'],
    ['smoking', '', '📍 פינת עישון צפונית — ליד בניין האימונים'],
    ['directions', '', '🚌 תחבורה ציבורית'],
    ['directions', '', 'אוטובוס קו 400 — עוצר בכניסה הראשית'],
    ['directions', '', 'אוטובוס קו 405 — עוצר במרחק 5 דקות הליכה'],
    ['directions', '', 'רכבת — תחנת בסיס צבאי, 10 דקות הליכה'],
    ['directionsWarning', '', '⚠️ אסור לעלות על טרמפים!'],
  ],

  Safety: [
    ['כותרת', 'תת_כותרת', 'התראה', 'קריטי', 'פריטים', 'תחתית'],
    [
      'התגוננות',
      'נהלי חירום',
      'בעת שמיעת אזעקה — כניסה מיידית למרחב המוגן הקרוב!',
      '',
      'בניין מרכזי — קומת קרקע\nבניין אוכל — מרתף תחתון\nבניין אימונים — מקלט דרומי\nשטח פתוח — שכיבה צמודת קרקע\n⏱️ זמן מעבר למקלט: 90 שניות\nיש להישאר במקלט עד להודעה מפורשת',
      '',
    ],
    [
      'תדריך יציאה',
      'בטיחות בדרכים',
      'חובה להשתתף בתדריך לפני יציאה!',
      '⛔ אסור בהחלט לעלות על טרמפים!',
      'נסיעה אך ורק בתחבורה ציבורית או רכב פרטי מורשה\nשמירה על ביגוד צבאי מהודק ותקני\nציוד ואישורים — תמיד איתכם\nדיווח מיידי על כל אירוע חריג',
      'תדריך: כל יום חמישי 15:30',
    ],
    [
      'נשיאת נשק',
      'כללי בטיחות',
      'הנשק הוא באחריותך האישית!',
      '',
      'הנשק תמיד במצב סגור למעט במטווח\nהכידון תמיד פנוי וברור\nאסור להפנות נשק לכיוון בני אדם\nשמירה על הנשק בכל עת — אל תשאירו ללא השגחה\n⚠️ אובדן נשק — עבירה חמורה ביותר\nניקוי יומי לפי נהלים',
      'בדיקת נשק יומית: 08:00',
    ],
  ],
};

/* ------------------------------------------------------------------ */
/*  Per-tab presentation metadata (widths, help row, dropdowns).       */
/* ------------------------------------------------------------------ */

const SHEET_META = {
  Ticker: {
    columns: [
      { width: 95, help: 'משפט אחד שיופיע בסרגל הנע. כל שורה = הודעה אחת.' },
    ],
  },
  Home: {
    columns: [
      { width: 20, help: 'שם פנימי של השדה — אל תשנו' },
      { width: 55, help: 'הטקסט שמופיע על המסך — ערכו כאן' },
    ],
  },
  Appearance: {
    columns: [
      { width: 40, help: 'כותרת המקטע — שורות עם אותה כותרת מקובצות יחד' },
      { width: 90, help: 'פריט (בולט) אחד לכל שורה' },
    ],
  },
  Services: {
    columns: [
      { width: 16, help: 'שם השירות' },
      { width: 44, help: 'שעות פעילות — שורה לכל טווח (Alt+Enter למעבר שורה)' },
      { width: 28, help: 'מיקום' },
      { width: 10, help: '"כן" = שירות דחוף (מסגרת אדומה)', validation: ['כן', 'לא'] },
    ],
  },
  Discipline: {
    columns: [
      { width: 22, help: 'כותרת הבלוק' },
      { width: 40, help: 'כותרת משנה' },
      { width: 54, help: 'פריט לכל שורה (Alt+Enter למעבר שורה)' },
    ],
  },
  Procedures: {
    columns: [
      { width: 20, help: 'שם פנימי של השדה — אל תשנו' },
      { width: 58, help: 'הטקסט שמופיע על המסך — ערכו כאן' },
    ],
  },
  Announcements: {
    columns: [
      { width: 18, help: 'סוג המקטע — אל תשנו', validation: ['board', 'smoking', 'directions', 'directionsWarning'] },
      { width: 34, help: 'כותרת (אפשר להשאיר ריק)' },
      { width: 60, help: 'תוכן ההודעה' },
    ],
  },
  Safety: {
    columns: [
      { width: 16, help: 'כותרת הכרטיס' },
      { width: 18, help: 'כותרת משנה' },
      { width: 40, help: 'שורת התראה' },
      { width: 34, help: 'הודעה קריטית (אפשר ריק)' },
      { width: 50, help: 'פריט לכל שורה (Alt+Enter)' },
      { width: 28, help: 'שורת תחתית (אפשר ריק)' },
    ],
  },
};

/** Hover notes for the key/value field cells (Home + Procedures). */
const FIELD_NOTES = {
  box1Text: 'כיתוב בתיבה הכתומה במסך הבית',
  box2Text: 'כיתוב בתיבה הצהובה (דו״ח 1)',
  dailyNote: 'הערה יומית כללית — אפשר להשאיר ריק',
  'card1.subtitle': 'יוהל״ם — כותרת משנה',
  'card1.intro': 'יוהל״ם — טקסט הסבר',
  'card1.callToAction': 'יוהל״ם — קריאה לפעולה',
  'card1.phone': 'יוהל״ם — מספר טלפון',
  'card1.extension': 'יוהל״ם — שלוחה',
  'card2.subtitle': 'סמים ואלכוהול — כותרת משנה',
  'card2.intro': 'יוהל״ם — טקסט הסבר נוסף',
  'card2.para1': 'סמים ואלכוהול — פסקה ראשונה',
  'card2.para2': 'סמים ואלכוהול — פסקה שנייה',
  'card2.para3': 'סמים ואלכוהול — פסקה שלישית',
  'card3.para1': 'ביטחון מידע — פסקה ראשונה',
  'card3.para2': 'ביטחון מידע — פסקה שנייה',
  'card3.para3': 'ביטחון מידע — פסקה שלישית',
  'card3.para4': 'ביטחון מידע — פסקה רביעית',
  'card3.para5': 'ביטחון מידע — פסקה חמישית',
};

/* ------------------------------------------------------------------ */
/*  XLSX output (recommended — branded, formatted, RTL).               */
/* ------------------------------------------------------------------ */

const thinBorder = {
  top: { style: 'thin', color: { argb: BORDER } },
  left: { style: 'thin', color: { argb: BORDER } },
  bottom: { style: 'thin', color: { argb: BORDER } },
  right: { style: 'thin', color: { argb: BORDER } },
};

function solidFill(argb) {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb } };
}

function lineCount(value) {
  return value == null ? 1 : String(value).split('\n').length;
}

function buildInstructionsSheet(wb) {
  const ws = wb.addWorksheet('הוראות', {
    views: [{ rightToLeft: true, showGridLines: false }],
    properties: { defaultRowHeight: 20 },
  });
  ws.getColumn(1).width = 4;
  ws.getColumn(2).width = 110;

  const lines = [
    { text: 'תוכן לוח התצוגה — קובץ עריכה', kind: 'title' },
    { text: 'ערכו את הלשוניות בתחתית הקובץ. כל לשונית מתאימה למסך אחר באתר.', kind: 'subtitle' },
    { text: '', kind: 'space' },
    { text: 'איך עורכים', kind: 'h' },
    { text: '•  בחרו לשונית בתחתית (כל לשונית = מסך). ערכו רק את התאים — אל תמחקו ואל תשנו את שתי השורות הראשונות.', kind: 'p' },
    { text: '•  שורה ראשונה (כחולה) = שמות העמודות. שורה שנייה (תכלת) = הסבר קצר לכל עמודה. התחילו להזין מהשורה שמתחת.', kind: 'p' },
    { text: '•  טקסט עם כמה שורות (שעות פעילות, רשימות): הקישו Alt+Enter (ב-Mac: ⌥+Enter) כדי לרדת שורה בתוך אותו תא. אפשר גם להפריד עם הסימן |', kind: 'p' },
    { text: '•  בעמודה "דחוף" (לשונית שירותי היחידה) בחרו "כן" כדי לסמן שירות דחוף — תופיע מסגרת אדומה.', kind: 'p' },
    { text: '•  ריחוף עם העכבר מעל תאים מסוימים מציג הערת עזרה.', kind: 'p' },
    { text: '•  אחרי עריכה: השינויים יופיעו על המסך תוך כדקה — אין צורך לרענן.', kind: 'p' },
    { text: '', kind: 'space' },
    { text: 'הלשוניות והמסכים', kind: 'h' },
    { text: '•  Ticker — סרגל ההודעות הנע בתחתית', kind: 'p' },
    { text: '•  Home — מסך הבית', kind: 'p' },
    { text: '•  Appearance — מסך הופעה ולבוש', kind: 'p' },
    { text: '•  Procedures — מסך נהלים', kind: 'p' },
    { text: '•  Discipline — מסך משמעת', kind: 'p' },
    { text: '•  Services — מסך שירותי היחידה', kind: 'p' },
    { text: '•  Announcements — מסך הודעות', kind: 'p' },
    { text: '•  Safety — מסך בטיחות', kind: 'p' },
    { text: '', kind: 'space' },
    { text: 'חשוב', kind: 'h' },
    { text: '•  אל תשנו את שמות הלשוניות (Ticker, Home, ...). שמות אלו הם מה שהמערכת מחפשת.', kind: 'p' },
    { text: '•  כדי לפרסם: קובץ ← שיתוף ← "כל מי שיש לו הקישור: צופה".', kind: 'p' },
  ];

  let r = 1;
  for (const line of lines) {
    const cell = ws.getCell(r, 2);
    cell.value = line.text;
    if (line.kind === 'title') {
      ws.getRow(r).height = 46;
      cell.fill = solidFill(NAVY);
      cell.font = { name: FONT, size: 22, bold: true, color: { argb: CYAN } };
      cell.alignment = { vertical: 'middle', horizontal: 'right', indent: 1 };
    } else if (line.kind === 'subtitle') {
      ws.getRow(r).height = 28;
      cell.fill = solidFill(NAVY_DARK);
      cell.font = { name: FONT, size: 12, color: { argb: WHITE } };
      cell.alignment = { vertical: 'middle', horizontal: 'right', indent: 1 };
    } else if (line.kind === 'h') {
      ws.getRow(r).height = 26;
      cell.font = { name: FONT, size: 14, bold: true, color: { argb: NAVY } };
      cell.alignment = { vertical: 'middle', horizontal: 'right' };
    } else if (line.kind === 'p') {
      ws.getRow(r).height = 22;
      cell.font = { name: FONT, size: 11, color: { argb: SLATE } };
      cell.alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
    } else {
      ws.getRow(r).height = 8;
    }
    r += 1;
  }
}

function buildDataSheet(wb, tabName) {
  const rows = tabs[tabName];
  const meta = SHEET_META[tabName];
  const header = rows[0];
  const dataRows = rows.slice(1);

  const ws = wb.addWorksheet(tabName, {
    views: [{ rightToLeft: true, state: 'frozen', ySplit: 2 }],
    properties: { defaultRowHeight: 22 },
  });

  // Column widths.
  meta.columns.forEach((col, i) => {
    ws.getColumn(i + 1).width = col.width;
  });

  // Row 1 — header (navy + white).
  const headerRow = ws.getRow(1);
  headerRow.height = 30;
  header.forEach((label, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = label;
    cell.fill = solidFill(NAVY);
    cell.font = { name: FONT, size: 13, bold: true, color: { argb: WHITE } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = thinBorder;
  });

  // Row 2 — helper text (pale cyan, italic).
  const helpRow = ws.getRow(2);
  helpRow.height = 34;
  meta.columns.forEach((col, i) => {
    const cell = helpRow.getCell(i + 1);
    cell.value = col.help;
    cell.fill = solidFill(CYAN_SOFT);
    cell.font = { name: FONT, size: 10, italic: true, color: { argb: SLATE } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = thinBorder;
  });

  // Data rows start at row 3.
  dataRows.forEach((row, ri) => {
    const excelRow = ws.getRow(ri + 3);
    let maxLines = 1;
    meta.columns.forEach((col, ci) => {
      const value = row[ci] == null ? '' : row[ci];
      maxLines = Math.max(maxLines, lineCount(value));
      const cell = excelRow.getCell(ci + 1);
      cell.value = value;
      cell.font = { name: FONT, size: 11, color: { argb: SLATE } };
      cell.alignment = { vertical: 'top', horizontal: 'right', wrapText: true };
      cell.border = thinBorder;
      if (ri % 2 === 1) {
        cell.fill = solidFill('FFF4F8FC');
      }
      // Dropdown validation.
      if (col.validation) {
        cell.dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`"${col.validation.join(',')}"`],
          showErrorMessage: true,
          errorStyle: 'warning',
          errorTitle: 'ערך לא חוקי',
          error: `בחרו אחד מהערכים: ${col.validation.join(', ')}`,
        };
      }
    });
    // Hover notes on the field column of key/value sheets.
    const key = row[0];
    if (FIELD_NOTES[key]) {
      excelRow.getCell(1).note = FIELD_NOTES[key];
    }
    excelRow.height = Math.max(22, maxLines * 15 + 6);
  });
}

async function writeXlsx() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'IDF Digital Signage';
  wb.created = new Date();

  buildInstructionsSheet(wb);
  for (const tabName of Object.keys(tabs)) {
    buildDataSheet(wb, tabName);
  }

  const filePath = path.join(OUT_DIR, 'signage-content-template.xlsx');
  await wb.xlsx.writeFile(filePath);
  console.log('  ✓ signage-content-template.xlsx');
}

function writeCsvFiles() {
  for (const [tabName, rows] of Object.entries(tabs)) {
    const filePath = path.join(OUT_DIR, `${tabName}.csv`);
    // Mirror the XLSX layout: header (row 1) + help row (row 2) + data. The
    // server drops row 2, so keeping it here means CSV- and XLSX-imported
    // sheets share the exact same "two header rows" contract.
    const helpRow = SHEET_META[tabName].columns.map((col) => col.help);
    const [header, ...dataRows] = rows;
    const withHelp = [header, helpRow, ...dataRows];
    // Prepend a UTF-8 BOM so Excel/Sheets detect Hebrew correctly on import.
    fs.writeFileSync(filePath, '\uFEFF' + toCsv(withHelp), 'utf8');
    console.log(`  ✓ ${tabName}.csv`);
  }
}

/* ------------------------------------------------------------------ */

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Generating editor templates…');
  await writeXlsx();
  writeCsvFiles();

  console.log(`\nTemplates written to: ${OUT_DIR}`);
  console.log('\nRecommended: upload signage-content-template.xlsx to Google Drive,');
  console.log('then "Open with → Google Sheets" (formatting and all tabs are kept).');
  console.log('Finally share it with "Anyone with the link: Viewer".');
  console.log('See GOOGLE_SHEETS_SETUP.md for full steps.');
}

main().catch((err) => {
  console.error('Failed to generate templates:', err);
  process.exit(1);
});

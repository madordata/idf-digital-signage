import express from 'express';
import cors from 'cors';
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getSiteContent, SHEET_CONFIGURED } from './googleSheets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4100;

app.use(cors());
app.use(express.json());

const EXCEL_FILE_PATH = path.join(__dirname, 'updates.xlsx');

const DEFAULT_MESSAGES = [
  'ברוכים הבאים ליחידה - מחויבים למצוינות תמיד',
  'אנא שמרו על ניקיון והופעה ראויים בכל עת',
  'תדרוכי בטיחות מתקיימים בכל יום ראשון בשעה 08:00',
  'זכרו - אבטחת מידע היא אחריות כל אחד ואחת',
  'שעות קבלת קהל מפקד היחידה: ימים א׳-ה׳ בין 14:00-16:00',
  'הזמנת תורים למרפאה דרך מערכת אפסנאות בלבד',
];

async function readExcelFile() {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      console.warn('⚠️  updates.xlsx not found, using default messages');
      return DEFAULT_MESSAGES;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      console.warn('⚠️  No worksheet found in Excel file');
      return DEFAULT_MESSAGES;
    }

    const messages = [];
    const headers = {};
    
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber] = cell.value?.toString().trim().toLowerCase();
    });

    const contentColumn = Object.keys(headers).find(
      key => headers[key] === 'content' || headers[key] === 'תוכן'
    );

    if (!contentColumn) {
      console.warn('⚠️  "Content" or "תוכן" column not found in Excel file');
      return DEFAULT_MESSAGES;
    }

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      
      const cellValue = row.getCell(parseInt(contentColumn)).value;
      if (cellValue) {
        const message = cellValue.toString().trim();
        if (message) {
          messages.push(message);
        }
      }
    });

    if (messages.length === 0) {
      console.warn('⚠️  No messages found in Excel file');
      return DEFAULT_MESSAGES;
    }

    console.log(`✓ Successfully loaded ${messages.length} messages from Excel`);
    return messages;
    
  } catch (error) {
    console.error('❌ Error reading Excel file:', error.message);
    return DEFAULT_MESSAGES;
  }
}

app.get('/api/updates', async (req, res) => {
  try {
    // Prefer the Google Sheet ticker; fall back to the local Excel file, then
    // to the static defaults. The display must never break.
    let messages = null;
    if (SHEET_CONFIGURED) {
      const content = await getSiteContent();
      if (content?.ticker?.length) messages = content.ticker;
    }
    if (!messages) messages = await readExcelFile();

    res.json({
      success: true,
      messages,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/updates:', error);
    res.json({
      success: false,
      messages: DEFAULT_MESSAGES,
      timestamp: new Date().toISOString()
    });
  }
});

// Full site content (every editable screen) sourced from the Google Sheet.
// Returns only the sections the sheet actually provides; the frontend merges
// these over its built-in defaults, so missing/empty sections never break.
app.get('/api/content', async (req, res) => {
  try {
    const content = (await getSiteContent()) || {};
    res.json({
      success: true,
      configured: SHEET_CONFIGURED,
      content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/content:', error);
    res.json({
      success: false,
      configured: SHEET_CONFIGURED,
      content: {},
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    excelFileExists: fs.existsSync(EXCEL_FILE_PATH),
    googleSheetConfigured: SHEET_CONFIGURED
  });
});

// ---------------------------------------------------------------------------
// Serve the production build (single-process kiosk mode).
// When `dist/` exists (after `npm run build`) the same Express server that
// exposes the API also serves the compiled React app, so the whole signage
// runs on one port (4100) with no separate Vite dev server. The SPA fallback
// returns index.html for any non-API route so client-side routing keeps working.
// ---------------------------------------------------------------------------
const DIST_DIR = path.join(__dirname, '..', 'dist');

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));

  // SPA fallback: serve index.html for any non-API GET request.
  // (Express 5 no longer accepts a bare '*' route, so use middleware.)
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  console.log(`🖥️  Serving production build from ${DIST_DIR}`);
} else {
  console.warn(
    '⚠️  dist/ not found - run `npm run build` to serve the app from this server. ' +
    'Until then only the /api endpoints are available here.'
  );
}

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Excel file path: ${EXCEL_FILE_PATH}`);
  console.log(`📁 Excel file exists: ${fs.existsSync(EXCEL_FILE_PATH)}`);
  console.log(
    SHEET_CONFIGURED
      ? '📗 Google Sheet content source: ENABLED (GOOGLE_SHEET_ID set)'
      : '📗 Google Sheet content source: disabled (set GOOGLE_SHEET_ID to enable)'
  );
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `❌ Port ${PORT} is already in use. Set a different PORT in your .env file ` +
      `(and update VITE_API_URL to match), then restart.`
    );
    process.exit(1);
  }
  throw error;
});

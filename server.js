import express from 'express';
import cors from 'cors';
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

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
    const messages = await readExcelFile();
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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    excelFileExists: fs.existsSync(EXCEL_FILE_PATH)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Excel file path: ${EXCEL_FILE_PATH}`);
  console.log(`📁 Excel file exists: ${fs.existsSync(EXCEL_FILE_PATH)}`);
});

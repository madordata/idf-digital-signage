import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createSampleExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Updates');

  worksheet.columns = [
    { header: 'Content', key: 'content', width: 80 }
  ];

  const sampleMessages = [
    'ברוכים הבאים ליחידה - מחויבים למצוינות תמיד',
    'אנא שמרו על ניקיון והופעה ראויים בכל עת',
    'תדרוכי בטיחות מתקיימים בכל יום ראשון בשעה 08:00',
    'זכרו - אבטחת מידע היא אחריות כל אחד ואחת',
    'שעות קבלת קהל מפקד היחידה: ימים א׳-ה׳ בין 14:00-16:00',
    'הזמנת תורים למרפאה דרך מערכת אפסנאות בלבד',
    'אסור לעשן מחוץ לפינות העישון המיועדות',
    'יש לדווח מיד על כל תקלת ביטחון או חריגה',
    'ימי קבלה במחסן: א׳, ג׳, ה׳ בין השעות 09:00-12:00',
    'תדריך יציאה לסוף שבוע - כל יום חמישי בשעה 15:30'
  ];

  sampleMessages.forEach(message => {
    worksheet.addRow({ content: message });
  });

  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4A5568' }
  };
  worksheet.getRow(1).font.color = { argb: 'FFFFFFFF' };

  const filePath = path.join(__dirname, 'updates.xlsx');
  await workbook.xlsx.writeFile(filePath);
  
  console.log('✓ Sample Excel file created: updates.xlsx');
  console.log('  Location:', filePath);
  console.log('  Messages:', sampleMessages.length);
}

createSampleExcel().catch(console.error);

const HEBREW_MONTHS = [
  'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר',
  'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'
];

const HEBREW_DAYS = [
  'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'
];

export function getHebrewDayName(date: Date): string {
  return `יום ${HEBREW_DAYS[date.getDay()]}`;
}

export function getHebrewDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const hebrewYear = year + 3760;
  const approximateHebrewMonth = (month + 6) % 12;
  const hebrewMonth = HEBREW_MONTHS[approximateHebrewMonth];
  
  return `${day} ${hebrewMonth} ${hebrewYear}`;
}

export function getGregorianDate(date: Date = new Date()): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}

export interface Holiday {
  name: string;
  date: string;
  days: number;
}

export function getUpcomingHolidays(): Holiday[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const holidays: Holiday[] = [
    { name: 'ראש השנה', date: 'ספטמבר 2024', days: 30 },
    { name: 'יום כיפור', date: 'ספטמבר 2024', days: 40 },
    { name: 'סוכות', date: 'אוקטובר 2024', days: 45 },
    { name: 'חנוכה', date: 'דצמבר 2024', days: 120 },
    { name: 'פורים', date: 'מרץ 2025', days: 210 },
    { name: 'פסח', date: 'אפריל 2025', days: 240 },
  ];
  
  return holidays.slice(0, 3);
}

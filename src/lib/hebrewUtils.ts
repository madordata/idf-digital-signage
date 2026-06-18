const HEBREW_MONTHS = [
  'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר',
  'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'
];

const HEBREW_DAYS = [
  'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'
];

const GEMATRIA_ONES =    ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
const GEMATRIA_TENS =    ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
const GEMATRIA_HUNDREDS = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];

function numberToGematria(num: number): string {
  if (num <= 0) return '';
  let result = '';
  let n = num;

  const h = Math.floor(n / 100);
  if (h > 0) { result += GEMATRIA_HUNDREDS[h]; n -= h * 100; }

  // Special cases to avoid writing divine names (יה / יו)
  if (n === 15) { result += 'טו'; n = 0; }
  else if (n === 16) { result += 'טז'; n = 0; }
  else {
    const t = Math.floor(n / 10);
    if (t > 0) { result += GEMATRIA_TENS[t]; n -= t * 10; }
    result += GEMATRIA_ONES[n];
  }

  if (result.length === 1) return result + '׳';
  return result.slice(0, -1) + '״' + result.slice(-1);
}

export function getHebrewDayName(date: Date): string {
  return `יום ${HEBREW_DAYS[date.getDay()]}`;
}

export function getHebrewDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const parts = formatter.formatToParts(date);

    let dayStr = '', monthStr = '', yearStr = '';
    for (const p of parts) {
      if (p.type === 'day')   dayStr   = p.value;
      if (p.type === 'month') monthStr = p.value;
      if (p.type === 'year')  yearStr  = p.value;
    }

    const dayNum  = parseInt(dayStr, 10);
    const yearNum = parseInt(yearStr, 10);

    const dayLetters  = !isNaN(dayNum)  ? numberToGematria(dayNum)          : dayStr;
    const yearLetters = !isNaN(yearNum) ? numberToGematria(yearNum % 1000)  : yearStr;

    // Strip any "ב" prefix Intl may include in the month value
    const month = monthStr.replace(/^ב/, '');

    return `${dayLetters} ב${month} ${yearLetters}`;
  } catch {
    const hebrewMonth = HEBREW_MONTHS[(date.getMonth() + 6) % 12];
    return `${numberToGematria(date.getDate())} ב${hebrewMonth} ${numberToGematria((date.getFullYear() + 3760) % 1000)}`;
  }
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

// Canonical holiday dates for 2026-2028
const HOLIDAY_DATES: { name: string; date: Date }[] = [
  { name: 'ראש השנה',     date: new Date(2026, 8, 22)  }, // 22 Sep 2026
  { name: 'יום כיפור',   date: new Date(2026, 9,  1)  }, // 1 Oct 2026
  { name: 'סוכות',        date: new Date(2026, 9,  6)  }, // 6 Oct 2026
  { name: 'שמחת תורה',   date: new Date(2026, 9, 13)  }, // 13 Oct 2026
  { name: 'חנוכה',        date: new Date(2026, 11, 14) }, // 14 Dec 2026
  { name: 'ט״ו בשבט',    date: new Date(2027, 1,  1)  }, // 1 Feb 2027
  { name: 'פורים',        date: new Date(2027, 2,  3)  }, // 3 Mar 2027
  { name: 'פסח',          date: new Date(2027, 3,  2)  }, // 2 Apr 2027
  { name: 'יום השואה',   date: new Date(2027, 3, 14)  }, // 14 Apr 2027
  { name: 'יום הזיכרון', date: new Date(2027, 3, 21)  }, // 21 Apr 2027
  { name: 'יום העצמאות', date: new Date(2027, 3, 22)  }, // 22 Apr 2027
  { name: 'שבועות',       date: new Date(2027, 4, 22)  }, // 22 May 2027
  { name: 'ראש השנה',     date: new Date(2027, 8, 11)  }, // 11 Sep 2027
  { name: 'יום כיפור',   date: new Date(2027, 8, 20)  }, // 20 Sep 2027
  { name: 'סוכות',        date: new Date(2027, 8, 25)  }, // 25 Sep 2027
  { name: 'חנוכה',        date: new Date(2027, 11,  3)  }, // 3 Dec 2027
  { name: 'פורים',        date: new Date(2028, 1, 21)  }, // 21 Feb 2028
  { name: 'פסח',          date: new Date(2028, 2, 22)  }, // 22 Mar 2028
];

function getHolidaysOnDate(date: Date): string[] {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return HOLIDAY_DATES
    .filter(h => {
      const hd = new Date(h.date);
      hd.setHours(0, 0, 0, 0);
      return hd.getTime() === target.getTime();
    })
    .map(h => h.name);
}

export function getUpcomingHolidays(count = 4): Holiday[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return HOLIDAY_DATES
    .filter(h => h.date >= now)
    .slice(0, count)
    .map(h => {
      const days = Math.ceil((h.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        name: h.name,
        date: h.date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' }),
        days,
      };
    });
}

const SHORT_HEBREW_DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

export function getShortHebrewDayName(date: Date): string {
  return SHORT_HEBREW_DAYS[date.getDay()];
}

function getHebrewDayGematria(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric' });
    const dayNum = parseInt(formatter.format(date), 10);
    return !isNaN(dayNum) ? numberToGematria(dayNum) : '';
  } catch {
    return numberToGematria(date.getDate());
  }
}

export interface DayInfo {
  date: Date;
  shortDayName: string;
  dayNum: number;
  hebrewDayGematria: string;
  isToday: boolean;
  holidays: string[];
}

export function getNext7Days(): DayInfo[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      date: d,
      shortDayName: getShortHebrewDayName(d),
      dayNum: d.getDate(),
      hebrewDayGematria: getHebrewDayGematria(d),
      isToday: i === 0,
      holidays: getHolidaysOnDate(d),
    };
  });
}

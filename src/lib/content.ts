/**
 * Site content model.
 *
 * Everything visible on the screens that should be editable by non-developers
 * lives here. The backend (`/api/content`) returns the same shape, populated
 * from a Google Sheet. Each section can be `null` on the server response, which
 * means "use the built-in default for that section".
 *
 * The defaults below mirror the original hardcoded content, so the display
 * looks identical until a Google Sheet provides overrides.
 */

export interface ServiceItem {
  name: string;
  hours: string[];
  location: string;
  urgent?: boolean;
}

export interface DisciplineBlock {
  title: string;
  subtitle: string;
  items: string[];
}

export interface AnnouncementItem {
  title: string;
  body: string;
}

export interface SafetyCard {
  title: string;
  subtitle: string;
  alert: string;
  /** Optional heavily-emphasized line (e.g. a strict prohibition). */
  critical?: string;
  items: string[];
  footer?: string;
}

export interface ProceduresContent {
  card1: {
    subtitle: string;
    intro: string;
    callToAction: string;
    phone: string;
    extension: string;
  };
  card2: {
    subtitle: string;
    para1: string;
    para2: string;
  };
  card3: {
    para1: string;
  };
}

export interface HomeContent {
  box1Text: string;
  box2Text: string;
  /** Optional unit-wide daily note shown on the home screen. */
  dailyNote: string;
}

export interface AppearanceSection {
  title: string;
  items: string[];
}

export interface AppearanceContent {
  sections: AppearanceSection[];
}

export interface AnnouncementsContent {
  board: AnnouncementItem[];
  smoking: string[];
  directions: string[];
  /** Heavily-emphasized warning shown under the directions list. */
  directionsWarning: string;
}

export interface SiteContent {
  ticker: string[];
  home: HomeContent;
  appearance: AppearanceContent;
  procedures: ProceduresContent;
  discipline: DisciplineBlock[];
  services: ServiceItem[];
  announcements: AnnouncementsContent;
  safety: SafetyCard[];
}

/**
 * A deeply-partial version of the content, as the backend may return only the
 * fields that were actually filled in on the Google Sheet.
 */
export type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type PartialSiteContent = DeepPartial<SiteContent>;

/* ------------------------------------------------------------------ */
/*  Built-in defaults (mirror of the original hardcoded screens).      */
/* ------------------------------------------------------------------ */

export const DEFAULT_CONTENT: SiteContent = {
  ticker: [
    'ברוכים הבאים ליחידה - מחויבים למצוינות תמיד',
    'אנא שמרו על ניקיון והופעה ראויים בכל עת',
    'תדרוכי בטיחות מתקיימים בכל יום ראשון בשעה 08:00',
    'זכרו - אבטחת מידע היא אחריות כל אחד ואחת',
    'שעות קבלת קהל מפקד היחידה: ימים א׳-ה׳ בין 14:00-16:00',
    'הזמנת תורים למרפאה דרך מערכת אפסנאות בלבד',
  ],

  home: {
    box1Text: 'חייל שפר הופעתך!',
    box2Text: 'להזין דו״ח 1',
    dailyNote: '',
  },

  appearance: {
    sections: [
      {
        title: 'הקדמה',
        items: [
          'המשמעת בעלת חשיבות מרבית להבטחת פעילותו התקינה של צה״ל, והיא תנאי הכרחי לביצוע מלא ויעיל של המשימות המוטלות עליו.',
          'חיילי ומפקדי צה״ל יקפידו על הופעה מסודרת ותקנית בכל עת.',
        ],
      },
      {
        title: 'הוראות הלבוש לבאים במחנות צה״ל',
        items: [
          'לא תותר כניסה בלבוש לא הולם למחנות צה״ל או באופן שאינו מכבד את כללי השירות המשותף.',
          'חייל יקפיד על כלל הוראות הקבע של הופעה ולבוש בצורה תקנית ומסודרת.',
          'חייל ילבש מדי שירות בכל עת שהוא בתפקיד או במסגרת צבאית, מבין פריטי הלבוש שקיבל מצה״ל ומפורטים בתעודת ציודו האישי (טופס 1004) בלבד, אלא אם נקבע אחרת בפקודות הצבא או לפיהן.',
        ],
      },
    ],
  },

  procedures: {
    card1: {
      subtitle: 'מרכז התמודדות ותמיכה',
      intro: 'במידה ואירעה פגיעה על רקע מיני / אלימות בהקשר זוגי / משפחה',
      callToAction: 'לפנייה אנונימית התקשרו',
      phone: '1111',
      extension: 'שלוחה 5 - 2',
    },
    card2: {
      subtitle: 'אפס סובלנות',
      para1:
        'השימוש בסמים ובמשקאות משכרים ביחידה יגרור לחקירת מצ״ח ודין משמעתי המחמיר ביותר.',
      para2: 'אין למכור במתקני צה״ל משקאות אלכוהוליים לצריכה בתוך המחנות.',
    },
    card3: {
      para1: 'מידע צבאי מסווג לא יועבר בטלפון / בפקס האזרחי ו/או המטכ״לי.',
    },
  },

  discipline: [
    {
      title: 'היתר גידול זקן',
      subtitle: 'ההיתר תקף לכל משך השירות, בכפוף לעמידה בקריטריונים',
      items: [
        'גידול זקן מותר בהתאם לרצון הפרט, ובלבד שהוא מסודר והולם הופעה צבאית נאותה',
        'זקן מלא מהפאות עד הסנטר (כולל שפם), ללא ביצוע “מדרגות”',
        'מותר לסדר את הזקן והשפם, אך אין לקצצו עד כדי זיפים',
        'חובה למלא הצהרה; פגיעה בנראות הזקן תוביל לשלילת ההיתר',
      ],
    },
    {
      title: 'דלת פתוחה',
      subtitle: 'כל חייל וחיילת יכולים לפנות למפקדים ישירות',
      items: [
        'שעות קבלה: א׳–ה׳, 14:00–16:00',
        'תיאום מראש דרך מזכירות היחידה',
        'ניתן לפנות גם לקצין רווחה',
        'סודיות מלאה מובטחת',
      ],
    },
    {
      title: 'מסדרים ותורנויות',
      subtitle: 'לוחות זמנים מתפרסמים בתחילת כל שבוע',
      items: [
        'מסדר בוקר: כל יום 06:30',
        'תורנות מטבח: לפי לוח חודשי',
        'תורנות שמירה: משמרות של 4 שעות',
        'החלפות מתואמות דרך קצין התורנות בלבד',
      ],
    },
    {
      title: 'הצדעה',
      subtitle: 'כבוד וכללי צה״ל',
      items: [
        'הצדעה לקצינים בדרגת סגן ומעלה',
        'מרחק הצדעה: 6 צעדים',
        'בעת נשיאת נשק — הצדעת נשק',
        'בעת תקיעת התרועה — עמידת דום',
      ],
    },
  ],

  services: [
    {
      name: 'כוורת',
      hours: ['א׳–ה׳: 08:00–20:00', 'ו׳: 08:00–14:00'],
      location: 'בניין מרכזי, קומה 1',
    },
    {
      name: 'חד״א',
      hours: ['בוקר: 06:30–08:00', 'צהריים: 12:00–13:30', 'ערב: 18:00–19:30'],
      location: 'בניין האוכל',
    },
    {
      name: 'חד״כ',
      hours: ['א׳–ה׳: 06:00–22:00', 'ו׳–ש׳: 08:00–18:00'],
      location: 'בניין הספורט',
    },
    {
      name: 'מספרה',
      hours: ['א׳, ג׳, ה׳: 14:00–17:00', 'ללא תור — לפי הגעה'],
      location: 'ליד הכוורת',
    },
    {
      name: 'בית כנסת',
      hours: ['פתוח בכל עת', 'שחרית: 06:30', 'מנחה-ערבית: לפי השקיעה'],
      location: 'בניין מרכזי, קומה 2',
    },
    {
      name: 'מרפאה',
      hours: ['א׳–ה׳: 07:00–19:00', 'ו׳: 08:00–13:00', 'חירום: 24/7 — טלפון 101'],
      location: 'בניין הרפואה',
      urgent: true,
    },
    {
      name: 'אפסנאות',
      hours: ['א׳, ג׳, ה׳: 09:00–12:00', 'קבלת ציוד בתיאום מראש'],
      location: 'המחסן המרכזי',
    },
  ],

  announcements: {
    board: [
      {
        title: '📢 הודעה דחופה',
        body: 'תרגיל חירום יתקיים ביום רביעי הקרוב בשעה 10:00. כל אנשי היחידה חייבים להשתתף.',
      },
      {
        title: 'שינוי שעות חדר האוכל',
        body: 'החל מהשבוע הבא, ארוחת הערב תתקיים בין 17:30–19:00 (במקום 18:00–19:30).',
      },
      {
        title: 'סדנת הדרכה — אבטחת מידע',
        body: 'סדנת הדרכה תתקיים ביום שלישי הקרוב בשעה 14:00 באודיטוריום. נוכחות חובה.',
      },
      {
        title: 'יום ספורט ביחידה',
        body: 'יום ספורט ופעילות גופנית יתקיים ביום שישי הבא החל מהשעה 08:00. הגעה בבגדי ספורט.',
      },
      {
        title: 'עדכון נהלים',
        body: 'נהלים מעודכנים לשמירה על ביטחון מידע פורסמו באתר היחידה. יש לקרוא ולהפנים.',
      },
    ],
    smoking: [
      'עישון מותר אך ורק באזורים המיועדים!',
      '📍 פינת עישון מרכזית — ליד בניין המטה',
    ],
    directions: [
      '🚌 תחבורה ציבורית',
      'אוטובוס קו 400 — עוצר בכניסה הראשית',
      'אוטובוס קו 405 — עוצר במרחק 5 דקות הליכה',
    ],
    directionsWarning: '⚠️ אסור לעלות על טרמפים!',
  },

  safety: [
    {
      title: 'התגוננות',
      subtitle: 'נהלי חירום',
      alert: 'בעת שמיעת אזעקה — כניסה מיידית למרחב המוגן הקרוב!',
      items: [
        'בניין מרכזי — קומת קרקע',
        'בניין אוכל — מרתף תחתון',
        'בניין אימונים — מקלט דרומי',
        'שטח פתוח — שכיבה צמודת קרקע',
        '⏱️ זמן מעבר למקלט: 90 שניות',
        'יש להישאר במקלט עד להודעה מפורשת',
      ],
    },
    {
      title: 'תדריך יציאה',
      subtitle: 'בטיחות בדרכים',
      alert: 'חובה להשתתף בתדריך לפני יציאה!',
      critical: '⛔ אסור בהחלט לעלות על טרמפים!',
      items: [
        'נסיעה אך ורק בתחבורה ציבורית או רכב פרטי מורשה',
        'שמירה על ביגוד צבאי מהודק ותקני',
        'ציוד ואישורים — תמיד איתכם',
        'דיווח מיידי על כל אירוע חריג',
      ],
      footer: 'תדריך: כל יום חמישי 15:30',
    },
    {
      title: 'נשיאת נשק',
      subtitle: 'כללי בטיחות',
      alert: 'הנשק הוא באחריותך האישית!',
      items: [
        'הנשק תמיד במצב סגור למעט במטווח',
        'הכידון תמיד פנוי וברור',
        'אסור להפנות נשק לכיוון בני אדם',
        'שמירה על הנשק בכל עת — אל תשאירו ללא השגחה',
        '⚠️ אובדן נשק — עבירה חמורה ביותר',
        'ניקוי יומי לפי נהלים',
      ],
      footer: 'בדיקת נשק יומית: 08:00',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Resolution                                                         */
/* ------------------------------------------------------------------ */

/** Use `provided` only when it's a non-empty array, otherwise the default. */
function arrayOr<T>(provided: T[] | undefined | null, fallback: T[]): T[] {
  return Array.isArray(provided) && provided.length > 0 ? provided : fallback;
}

/**
 * Merge a (deeply-partial) server response over the built-in defaults.
 * Object sections are merged field-by-field; list sections are replaced only
 * when the sheet provides a non-empty list. Anything missing falls back to its
 * default, so the display never breaks even if the sheet is empty or
 * unreachable.
 */
export function resolveContent(
  partial: PartialSiteContent | null | undefined,
): SiteContent {
  if (!partial) return DEFAULT_CONTENT;
  const d = DEFAULT_CONTENT;
  const p = partial;

  return {
    ticker: arrayOr(p.ticker, d.ticker),

    home: { ...d.home, ...(p.home ?? {}) },

    appearance: {
      sections: arrayOr(
        p.appearance?.sections as AppearanceSection[] | undefined,
        d.appearance.sections,
      ),
    },

    procedures: {
      card1: { ...d.procedures.card1, ...(p.procedures?.card1 ?? {}) },
      card2: { ...d.procedures.card2, ...(p.procedures?.card2 ?? {}) },
      card3: { ...d.procedures.card3, ...(p.procedures?.card3 ?? {}) },
    },

    discipline: arrayOr(
      p.discipline as DisciplineBlock[] | undefined,
      d.discipline,
    ),

    services: arrayOr(p.services as ServiceItem[] | undefined, d.services),

    announcements: {
      board: arrayOr(
        p.announcements?.board as AnnouncementItem[] | undefined,
        d.announcements.board,
      ),
      smoking: arrayOr(p.announcements?.smoking, d.announcements.smoking),
      directions: arrayOr(
        p.announcements?.directions,
        d.announcements.directions,
      ),
      directionsWarning:
        p.announcements?.directionsWarning ?? d.announcements.directionsWarning,
    },

    safety: arrayOr(p.safety as SafetyCard[] | undefined, d.safety),
  };
}

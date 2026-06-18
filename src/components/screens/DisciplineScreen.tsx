import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clipboard, Door, ListChecks, HandWaving } from '@phosphor-icons/react';

const blocks = [
  {
    icon: Clipboard,
    title: 'הופעה ולבוש',
    subtitle: 'מדי אלף — מגולח, מהודק, מגוהץ',
    items: [
      'תספורת תקנית לפי נהלי צה״ל',
      'נעליים מצוחצחות ואחידות נקיות',
      'תגיות שם על כל פריט ביגוד',
      'בדיקות הופעה מתקיימות מדי יום',
    ],
  },
  {
    icon: Door,
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
    icon: ListChecks,
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
    icon: HandWaving,
    title: 'הצדעה',
    subtitle: 'כבוד וכללי צה״ל',
    items: [
      'הצדעה לקצינים בדרגת סגן ומעלה',
      'מרחק הצדעה: 6 צעדים',
      'בעת נשיאת נשק — הצדעת נשק',
      'בעת תקיעת התרועה — עמידת דום',
    ],
  },
];

export function DisciplineScreen() {
  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-6 p-8 overflow-hidden">
      {blocks.map(({ icon: Icon, title, subtitle, items }) => (
        <Card key={title} className="bg-card border-4 border-accent flex flex-col overflow-hidden">
          <CardHeader className="pb-3 shrink-0">
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <Icon size={52} weight="duotone" className="text-accent shrink-0" />
              <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>{title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex flex-col gap-3 overflow-hidden">
            <div className="p-4 bg-accent/10 rounded-lg border-r-4 border-accent shrink-0">
              <p className="text-2xl leading-relaxed text-accent font-bold" style={{ fontFamily: 'Rubik' }}>
                {subtitle}
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="p-3 bg-primary/50 rounded-lg text-2xl leading-relaxed text-foreground"
                  style={{ fontFamily: 'Assistant' }}
                >
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clipboard, Door, ListChecks, HandWaving } from '@phosphor-icons/react';

export function DisciplineScreen() {
  return (
    <div className="h-full grid grid-cols-2 gap-6 p-8">
      <Card className="bg-card border-4 border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <Clipboard size={56} weight="duotone" className="text-accent" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>הופעה ולבוש</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-4">
          <div className="p-5 bg-primary/50 rounded-lg border-r-4 border-accent">
            <p className="text-3xl leading-relaxed text-foreground font-bold mb-2" style={{ fontFamily: 'Rubik' }}>
              מדי אלף
            </p>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              מגולח, מהודק, מגוהץ - תמיד בהופעה ראויה
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • תספורת תקנית לפי נהלי צה״ל
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • נעליים מצוחצחות ואחידות נקיות
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • תגיות שם על כל פריט ביגוד
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • בדיקות הופעה מתקיימות מדי יום
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-4 border-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <Door size={56} weight="duotone" className="text-secondary" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>דלת פתוחה</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-4">
          <div className="p-5 bg-secondary/20 rounded-lg border-r-4 border-secondary">
            <p className="text-3xl leading-relaxed text-foreground font-bold mb-2" style={{ fontFamily: 'Rubik' }}>
              מדיניות דלת פתוחה
            </p>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              כל חייל וחיילת יכולים לפנות למפקדים ישירות
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              <span className="font-bold">שעות קבלה:</span> א׳-ה׳, 14:00-16:00
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • תיאום מראש דרך מזכירות היחידה
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • ניתן לפנות גם לקצין רווחה
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • סודיות מלאה מובטחת
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-4 border-accent/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <ListChecks size={56} weight="duotone" className="text-accent" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>מסדרים ותורנויות</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-4">
          <div className="p-5 bg-primary/50 rounded-lg border-r-4 border-accent">
            <p className="text-3xl leading-relaxed text-foreground font-bold mb-2" style={{ fontFamily: 'Rubik' }}>
              לוחות זמנים
            </p>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              מתפרסמים בתחילת כל שבוע
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • תורנות מטבח: לפי לוח חודשי
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • תורנות שמירה: משמרות של 4 שעות
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • מסדר בוקר: כל יום 06:30
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • החלפות מתואמות דרך קצין התורנות בלבד
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-4 border-secondary/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <HandWaving size={56} weight="duotone" className="text-secondary" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>הצדעה</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-4">
          <div className="p-5 bg-secondary/20 rounded-lg border-r-4 border-secondary">
            <p className="text-3xl leading-relaxed text-foreground font-bold mb-2" style={{ fontFamily: 'Rubik' }}>
              כללי הצדעה
            </p>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              כבוד וכללי צה״ל
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • הצדעה לקצינים בדרגת סגן ומעלה
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • מרחק הצדעה: 6 צעדים
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • בעת נשיאת נשק - הצדעת נשק
            </p>
          </div>
          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              • בעת תקיעת התרועה - עמידת דום
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

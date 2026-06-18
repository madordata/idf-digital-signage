import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDots, Star } from '@phosphor-icons/react';
import { getUpcomingHolidays } from '@/lib/hebrewUtils';

export function HomeScreen() {
  const holidays = getUpcomingHolidays();

  return (
    <div className="h-full flex flex-col gap-6 p-8">
      <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl p-8 border-4 border-accent">
        <div className="text-center">
          <div className="text-8xl mb-4">🎖️</div>
          <h2 className="text-6xl font-bold text-foreground mb-2" style={{ fontFamily: 'Rubik' }} dir="rtl">
            רוח צה״ל
          </h2>
          <p className="text-3xl text-muted-foreground" style={{ fontFamily: 'Assistant' }} dir="rtl">
            מחויבים למצוינות • מחויבים לשליחות
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        <Card className="bg-card border-2 border-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <CalendarDots size={48} weight="duotone" className="text-accent" />
              <span className="text-4xl" style={{ fontFamily: 'Rubik' }}>חגים ומועדים קרובים</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" dir="rtl">
            {holidays.map((holiday, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-primary/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Star size={32} weight="fill" className="text-accent" />
                  <div>
                    <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Rubik' }}>
                      {holiday.name}
                    </div>
                    <div className="text-xl text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
                      {holiday.date}
                    </div>
                  </div>
                </div>
                <Badge className="bg-secondary text-secondary-foreground text-xl px-4 py-2">
                  בעוד {holiday.days} ימים
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-secondary/50">
          <CardHeader>
            <CardTitle className="text-4xl" style={{ fontFamily: 'Rubik' }} dir="rtl">
              הודעות יומיות
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl">
            <div className="space-y-6">
              <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-accent">
                <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
                  תדריך בטיחות שבועי
                </h3>
                <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
                  מתקיים מדי יום ראשון בשעה 08:00 בחדר ההרצאות הראשי. נוכחות חובה לכל אנשי היחידה.
                </p>
              </div>
              
              <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-secondary">
                <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
                  שעות קבלת קהל
                </h3>
                <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
                  מפקד היחידה מקבל ימים א׳-ה׳ בין השעות 14:00-16:00. ניתן לתאם פגישה דרך מזכירות היחידה.
                </p>
              </div>

              <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-destructive">
                <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
                  תזכורת חשובה
                </h3>
                <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
                  אבטחת מידע היא אחריות אישית של כל חייל וחיילת. יש לשמור על נהלים בכל עת.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

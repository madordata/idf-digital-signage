import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scales, User, ShieldWarning } from '@phosphor-icons/react';

export function ProceduresScreen() {
  return (
    <div className="h-full flex flex-col gap-6 p-8">
      <div className="grid grid-cols-3 gap-6 h-full">
        <Card className="bg-card border-4 border-accent">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <User size={64} weight="duotone" className="text-accent" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>יוהל״ם</span>
              <span className="text-2xl text-muted-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                יועץ להתנהגות ומשמעת
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-4">
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • יועץ זמין לכל פנייה בנושאי משמעת והתנהגות
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • ניתן לפנות באופן פרטי ובסודיות מלאה
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • קבלת ציבור: ימים א׳-ה׳ 10:00-12:00
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • טלפון פנימי: 3456
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-4 border-destructive">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <ShieldWarning size={64} weight="duotone" className="text-destructive" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>סמים ואלכוהול</span>
              <span className="text-2xl text-destructive text-center font-bold" style={{ fontFamily: 'Assistant' }}>
                אפס סובלנות
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-4">
            <div className="p-6 bg-destructive/20 rounded-lg border-2 border-destructive">
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                שימוש בסמים או אלכוהול במהלך השירות - אסור בהחלט!
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • בדיקות תקופתיות מתבצעות באופן שוטף
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • עונשים משמעתיים חמורים למפרים
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • ניתן לפנות לתמיכה בסודיות למחלקת רווחה
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-4 border-secondary">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <Scales size={64} weight="duotone" className="text-secondary" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>ביטחון מידע</span>
              <span className="text-2xl text-muted-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                אחריות אישית של כולם
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-4">
            <div className="p-6 bg-secondary/20 rounded-lg border-2 border-secondary">
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                חומר מסווג נשאר בשטח היחידה בלבד!
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • אין להוציא מסמכים או קבצים למחשבים פרטיים
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • שימוש בטלפון סלולרי רק באזורים מורשים
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                • דיווח מיידי על כל חריגה או תקלה
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

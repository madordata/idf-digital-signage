import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, Siren, ShieldWarning } from '@phosphor-icons/react';

export function SafetyScreen() {
  return (
    <div className="h-full grid grid-cols-3 gap-6 p-8" dir="rtl">
      {/* Card 1: התגוננות — amber heavy warning border */}
      <Card className="bg-card border-4 border-amber-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col items-center gap-4">
            <Siren size={72} weight="duotone" className="text-amber-400" />
            <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>התגוננות</span>
            <span className="text-2xl text-amber-400 text-center font-bold" style={{ fontFamily: 'Assistant' }}>
              נהלי חירום
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-500/20 border-2 border-amber-500">
            <AlertDescription>
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                בעת שמיעת אזעקה — כניסה מיידית למרחב המוגן הקרוב!
              </p>
            </AlertDescription>
          </Alert>

          <div className="p-5 bg-primary/50 rounded-lg">
            <h4 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Rubik' }}>
              מיקומי מקלטים:
            </h4>
            <p className="text-2xl text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              • בניין מרכזי — קומת קרקע
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              • בניין אוכל — מרתף תחתון
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              • בניין אימונים — מקלט דרומי
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              • שטח פתוח — שכיבה צמודת קרקע
            </p>
          </div>

          <div className="p-5 bg-amber-500/20 rounded-lg border-2 border-amber-500">
            <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
              ⏱️ זמן מעבר למקלט: 90 שניות
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
              יש להישאר במקלט עד להודעה מפורשת
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: תדריך יציאה — red destructive border, NO טרמפים prominent */}
      <Card className="bg-card border-4 border-destructive">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col items-center gap-4">
            <ShieldWarning size={72} weight="duotone" className="text-destructive" />
            <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>תדריך יציאה</span>
            <span className="text-2xl text-destructive text-center font-bold" style={{ fontFamily: 'Assistant' }}>
              בטיחות בדרכים
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-destructive/20 border-2 border-destructive">
            <AlertDescription>
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                חובה להשתתף בתדריך לפני יציאה!
              </p>
            </AlertDescription>
          </Alert>

          {/* NO hitchhiking — heavily emphasized */}
          <div className="p-5 bg-destructive/30 rounded-lg border-4 border-destructive">
            <p className="text-3xl text-foreground font-black leading-relaxed text-center" style={{ fontFamily: 'Rubik' }}>
              ⛔ אסור בהחלט לעלות על טרמפים!
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <h4 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Rubik' }}>
              כללי בטיחות:
            </h4>
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • נסיעה אך ורק בתחבורה ציבורית או רכב פרטי מורשה
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • שמירה על ביגוד צבאי מהודק ותקני
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • ציוד ואישורים — תמיד איתכם
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • דיווח מיידי על כל אירוע חריג
            </p>
          </div>

          <div className="p-5 bg-accent/20 rounded-lg border-2 border-accent">
            <p className="text-2xl text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
              תדריך: כל יום חמישי 15:30
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: נשיאת נשק — amber heavy warning border */}
      <Card className="bg-card border-4 border-amber-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col items-center gap-4">
            <ShieldCheck size={72} weight="duotone" className="text-amber-400" />
            <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>נשיאת נשק</span>
            <span className="text-2xl text-amber-400 text-center font-bold" style={{ fontFamily: 'Assistant' }}>
              כללי בטיחות
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-500/20 border-2 border-amber-500">
            <AlertDescription>
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                הנשק הוא באחריותך האישית!
              </p>
            </AlertDescription>
          </Alert>

          <div className="p-5 bg-primary/50 rounded-lg">
            <h4 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Rubik' }}>
              כללי זהב:
            </h4>
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • הנשק תמיד במצב סגור למעט במטווח
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • הכידון תמיד פנוי וברור
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • אסור להפנות נשק לכיוון בני אדם
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • שמירה על הנשק בכל עת — אל תשאירו ללא השגחה
            </p>
          </div>

          <div className="p-5 bg-destructive/20 rounded-lg border-2 border-destructive">
            <p className="text-2xl text-foreground font-bold leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              ⚠️ אובדן נשק — עבירה חמורה ביותר
            </p>
          </div>

          <div className="p-5 bg-primary/50 rounded-lg">
            <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
              • ניקוי יומי לפי נהלים
            </p>
          </div>

          <div className="p-5 bg-amber-500/20 rounded-lg border-2 border-amber-500">
            <p className="text-2xl text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
              בדיקת נשק יומית: 08:00
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

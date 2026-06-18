import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Cigarette, MapPin } from '@phosphor-icons/react';

export function AnnouncementsScreen() {
  return (
    <div className="h-full grid grid-cols-2 gap-6 p-8">
      <Card className="bg-card border-4 border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <Bell size={56} weight="duotone" className="text-accent" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>הודעות חשובות</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-5">
          <div className="p-6 bg-accent/20 rounded-lg border-4 border-accent">
            <h3 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rubik' }}>
              📢 הודעה דחופה
            </h3>
            <p className="text-3xl leading-relaxed text-foreground mb-4" style={{ fontFamily: 'Assistant' }}>
              תרגיל חירום יתקיים ביום רביעי הקרוב בשעה 10:00. כל אנשי היחידה חייבים להשתתף.
            </p>
          </div>

          <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-secondary">
            <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
              שינוי שעות חדר האוכל
            </h3>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              החל מהשבוע הבא, ארוחת הערב תתקיים בין 17:30-19:00 (במקום 18:00-19:30).
            </p>
          </div>

          <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-secondary">
            <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
              סדנת הדרכה
            </h3>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              סדנת הדרכה בנושא אבטחת מידע תתקיים ביום שלישי הקרוב בשעה 14:00 באודיטוריום. נוכחות חובה.
            </p>
          </div>

          <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-accent">
            <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
              יום ספורט ביחידה
            </h3>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              יום ספורט ופעילות גופנית יתקיים ביום שישי הבא החל מהשעה 08:00. הגעה בבגדי ספורט.
            </p>
          </div>

          <div className="p-6 bg-primary/50 rounded-lg border-r-4 border-destructive">
            <h3 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
              עדכון נהלים
            </h3>
            <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
              נהלים מעודכנים לשמירה על ביטחון מידע פורסמו באתר היחידה. יש לקרוא ולהפנים.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-card border-4 border-destructive flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <Cigarette size={56} weight="duotone" className="text-destructive" />
              <span className="text-4xl" style={{ fontFamily: 'Rubik' }}>פינות עישון</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-4">
            <div className="p-5 bg-destructive/20 rounded-lg border-2 border-destructive">
              <p className="text-3xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                עישון מותר אך ורק באזורים המיועדים!
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                📍 פינת עישון מרכזית - ליד בניין המטה
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                📍 פינת עישון דרומית - ליד חדר האוכל
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                📍 פינת עישון צפונית - ליד בניין האימונים
              </p>
            </div>
            <div className="p-5 bg-destructive/20 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                ⚠️ עישון בניגוד לנהלים - עונש משמעתי חמור
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-4 border-secondary flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <MapPin size={56} weight="duotone" className="text-secondary" />
              <span className="text-4xl" style={{ fontFamily: 'Rubik' }}>דרכי הגעה ליחידה</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-4">
            <div className="p-5 bg-secondary/20 rounded-lg border-2 border-secondary">
              <p className="text-3xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                🚌 תחבורה ציבורית
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                אוטובוס קו 400 - עוצר בכניסה הראשית
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                אוטובוס קו 405 - עוצר במרחק 5 דקות הליכה
              </p>
            </div>
            <div className="p-5 bg-primary/50 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                רכבת - תחנת בסיס צבאי, 10 דקות הליכה
              </p>
            </div>
            <div className="p-5 bg-destructive/20 rounded-lg">
              <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                ⚠️ אסור לעלות על טרמפים!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

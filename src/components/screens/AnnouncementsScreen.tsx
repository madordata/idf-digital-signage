import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Cigarette, MapPin } from '@phosphor-icons/react';
import { useContent } from '@/lib/ContentContext';
import noSmokeImg from '@/assest/nosmoke.png';

export function AnnouncementsScreen() {
  const { announcements } = useContent();
  const { board, smoking, directions, directionsWarning } = announcements;
  const [smokingHeader, ...smokingRest] = smoking;
  const [directionsHeader, ...directionsRest] = directions;

  return (
    // In global RTL layout: first DOM child → RIGHT column, second → LEFT column
    <div className="h-full grid gap-6 p-8" style={{ minHeight: 0, gridTemplateRows: '1fr', gridTemplateColumns: '3fr 2fr' }}>

      {/* RIGHT column — פינות עישון + דרכי הגעה (first in DOM = right side in RTL) */}
      <div className="flex flex-col gap-3 min-h-0">

        {/* Smoking — compact sticker-style, auto height */}
        <div className="relative bg-card border-2 border-amber-500/70 rounded-xl p-3 flex flex-col gap-2">
          <img
            src={noSmokeImg}
            alt="אסור לעשן"
            className="absolute -left-4 -top-4 w-32 h-32 rounded-full object-cover border-2 border-amber-500/60 shadow-lg"
            style={{ rotate: '-12deg' }}
          />
          <div className="flex items-center gap-3 pb-1 border-b border-amber-500/40" dir="rtl">
            <Cigarette size={28} weight="duotone" className="text-amber-400 shrink-0" />
            <span className="text-2xl font-bold text-amber-300" style={{ fontFamily: 'Rubik' }}>פינות עישון</span>
          </div>
          {smokingHeader && (
            <div className="px-3 py-1.5 bg-amber-500/15 rounded-md border border-amber-500/50" dir="rtl">
              <p className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Assistant' }}>{smokingHeader}</p>
            </div>
          )}
          {smokingRest.map((line) => (
            <div key={line} className="px-3 py-1.5 bg-primary/40 rounded-md" dir="rtl">
              <p className="text-xl text-foreground" style={{ fontFamily: 'Assistant' }}>{line}</p>
            </div>
          ))}
        </div>

        {/* Directions — takes the rest of the column */}
        <Card className="bg-card border-4 border-accent flex-1 min-h-0 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <MapPin size={48} weight="duotone" className="text-accent" />
              <span className="text-4xl" style={{ fontFamily: 'Rubik' }}>דרכי הגעה ליחידה</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-3 overflow-hidden flex-1">
            {directionsHeader && (
              <div className="p-4 bg-accent/20 rounded-lg border-2 border-accent">
                <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                  {directionsHeader}
                </p>
              </div>
            )}
            {directionsRest.map((line) => (
              <div key={line} className="p-4 bg-primary/50 rounded-lg">
                <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                  {line}
                </p>
              </div>
            ))}
            {directionsWarning && (
              <div className="p-4 bg-destructive/20 rounded-lg border-2 border-destructive">
                <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                  {directionsWarning}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* LEFT column — large high-visibility notice board (second in DOM = left side in RTL) */}
      <Card className="bg-card border-4 border-accent min-h-0 overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-4" dir="rtl">
            <Bell size={56} weight="duotone" className="text-accent" />
            <span className="text-5xl" style={{ fontFamily: 'Rubik' }}>הודעות חשובות</span>
          </CardTitle>
        </CardHeader>
        <CardContent dir="rtl" className="space-y-4 overflow-hidden flex-1">
          {board.map((item, index) =>
            index === 0 ? (
              <div key={item.title} className="p-6 bg-accent/20 rounded-lg border-4 border-accent">
                <h3 className="text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'Rubik' }}>
                  {item.title}
                </h3>
                <p className="text-3xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                  {item.body}
                </p>
              </div>
            ) : (
              <div key={item.title} className="p-5 bg-primary/50 rounded-lg border-r-4 border-accent">
                <h3 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'Rubik' }}>
                  {item.title}
                </h3>
                <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
                  {item.body}
                </p>
              </div>
            ),
          )}
        </CardContent>
      </Card>
    </div>
  );
}

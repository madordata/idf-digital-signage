import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Cigarette, MapPin } from '@phosphor-icons/react';
import { useContent } from '@/lib/ContentContext';

export function AnnouncementsScreen() {
  const { announcements } = useContent();
  const { board, smoking, directions, directionsWarning } = announcements;
  const [smokingHeader, ...smokingRest] = smoking;
  const [directionsHeader, ...directionsRest] = directions;

  return (
    // In global RTL layout: first DOM child → RIGHT column, second → LEFT column
    <div className="h-full grid grid-cols-2 gap-6 p-8" style={{ minHeight: 0, gridTemplateRows: '1fr' }}>

      {/* RIGHT column — פינות עישון + דרכי הגעה (first in DOM = right side in RTL) */}
      <div className="flex flex-col gap-0 min-h-0">
        <Card className="bg-card border-4 border-accent rounded-b-none flex-1 min-h-0 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-4" dir="rtl">
              <Cigarette size={48} weight="duotone" className="text-accent" />
              <span className="text-4xl" style={{ fontFamily: 'Rubik' }}>פינות עישון</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="space-y-3 overflow-hidden flex-1">
            {smokingHeader && (
              <div className="p-4 bg-amber-500/20 rounded-lg border-2 border-amber-500">
                <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                  {smokingHeader}
                </p>
              </div>
            )}
            {smokingRest.map((line) => (
              <div key={line} className="p-4 bg-primary/50 rounded-lg">
                <p className="text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'Assistant' }}>
                  {line}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cyan divider between the two right-column sections */}
        <div className="h-1 bg-accent opacity-60" />

        <Card className="bg-card border-4 border-accent border-t-0 rounded-t-none flex-1 min-h-0 overflow-hidden flex flex-col">
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

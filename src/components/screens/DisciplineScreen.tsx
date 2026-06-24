import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Door, ListChecks } from '@phosphor-icons/react';
import { useContent } from '@/lib/ContentContext';
import madimImg from '@/assest/madim.png';
import kumtaImg from '@/assest/kumta.png';
import qrCode from '@/assest/qr-code.jpg';

type IconEntry =
  | { type: 'component'; Component: React.ComponentType<{ size: number; weight: string; className: string }> }
  | { type: 'image'; src: string };

// Icons are matched to discipline blocks by position.
const ICONS: IconEntry[] = [
  { type: 'image', src: madimImg },
  { type: 'component', Component: Door as React.ComponentType<{ size: number; weight: string; className: string }> },
  { type: 'component', Component: ListChecks as React.ComponentType<{ size: number; weight: string; className: string }> },
  { type: 'image', src: kumtaImg },
];

export function DisciplineScreen() {
  const { discipline } = useContent();

  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-4 p-6 overflow-hidden">
      {discipline.map(({ title, subtitle, items }, index) => {
        const iconEntry = ICONS[index % ICONS.length];
        const hasQr = title.includes('זקן');
        return (
          <Card key={title} className="bg-card border-4 border-accent flex flex-col overflow-hidden relative">
            <CardHeader className={`pb-1 pt-4 shrink-0 transition-all ${hasQr ? 'pl-[280px]' : ''}`}>
              <CardTitle className="flex items-center gap-3" dir="rtl">
                {iconEntry.type === 'image' ? (
                  <img src={iconEntry.src} alt="" className="shrink-0 object-contain" style={{ width: 40, height: 40 }} />
                ) : (
                  <iconEntry.Component size={40} weight="duotone" className="text-accent shrink-0" />
                )}
                <div className="flex flex-col gap-3">
                  <span className="text-3xl leading-tight" style={{ fontFamily: 'Rubik' }}>{title}</span>
                  {subtitle && (
                    <span className="text-base font-bold text-accent leading-tight px-3 py-1 bg-accent/10 rounded-lg border-r-4 border-accent self-start" style={{ fontFamily: 'Rubik' }}>{subtitle}</span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent dir="rtl" className={`flex gap-4 overflow-hidden min-h-0 flex-1 transition-all ${hasQr ? 'pl-[280px]' : ''}`}>
              <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
                <ul className="flex flex-col gap-2 flex-1 min-h-0">
                  {items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center bg-primary/50 rounded-lg text-foreground flex-1 min-h-0 px-3 py-2 ${
                        hasQr ? 'text-xl leading-snug' : 'text-2xl leading-tight'
                      }`}
                      style={{ fontFamily: 'Assistant' }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            {hasQr && (
              <div className="absolute left-6 top-6 w-[240px] flex flex-col items-center gap-2.5 z-10">
                <div className="w-full aspect-square bg-white rounded-2xl p-3 flex items-center justify-center shadow-xl border-4 border-accent">
                  <img
                    src={qrCode}
                    alt="קוד QR לטופס ההיתר"
                    className="h-full w-full object-contain"
                    draggable={false}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <span
                  className="text-xl font-bold text-accent text-center leading-tight shrink-0 bg-background/80 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-accent/20"
                  style={{ fontFamily: 'Rubik' }}
                >
                  סרקו לטופס ההיתר
                </span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

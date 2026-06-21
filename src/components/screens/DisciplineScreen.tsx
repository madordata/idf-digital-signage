import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Door, ListChecks } from '@phosphor-icons/react';
import { useContent } from '@/lib/ContentContext';
import madimImg from '@/assest/madim.png';
import kumtaImg from '@/assest/kumta.png';

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
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-6 p-8 overflow-hidden">
      {discipline.map(({ title, subtitle, items }, index) => {
        const iconEntry = ICONS[index % ICONS.length];
        return (
          <Card key={title} className="bg-card border-4 border-accent flex flex-col overflow-hidden">
            <CardHeader className="pb-3 shrink-0">
              <CardTitle className="flex items-center gap-4" dir="rtl">
                {iconEntry.type === 'image' ? (
                  <img src={iconEntry.src} alt="" className="shrink-0 object-contain" style={{ width: 52, height: 52 }} />
                ) : (
                  <iconEntry.Component size={52} weight="duotone" className="text-accent shrink-0" />
                )}
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
        );
      })}
    </div>
  );
}

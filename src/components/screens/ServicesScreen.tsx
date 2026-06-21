import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Storefront, ForkKnife, Barbell, Scissors, FirstAid, Package } from '@phosphor-icons/react';
import senagogImg from '@/assest/senagaog.png';
import { useContent } from '@/lib/ContentContext';

// Icons are matched to services by name; falls back to a generic icon.
const ICONS_BY_NAME: Record<string, typeof Storefront> = {
  'כוורת': Storefront,
  'חד״א': ForkKnife,
  'חד״כ': Barbell,
  'מספרה': Scissors,
  'בית כנסת': null,
  'מרפאה': FirstAid,
  'אפסנאות': Package,
};

export function ServicesScreen() {
  const { services } = useContent();

  return (
    <div className="h-full p-8 overflow-hidden flex flex-col gap-0">
      <div className="grid grid-cols-4 grid-rows-2 gap-5 h-full">
        {services.map((service) => {
          const iconDef = ICONS_BY_NAME[service.name];
          const Icon = iconDef === undefined ? Storefront : iconDef;
          const borderColor = service.urgent ? 'border-destructive' : 'border-accent';
          const iconColor = service.urgent ? 'text-destructive' : 'text-accent';
          return (
            <Card
              key={service.name}
              className={`bg-card border-4 ${borderColor} flex flex-col gap-2 overflow-hidden`}
            >
              <CardHeader className="pb-2 shrink-0">
                <CardTitle className="flex flex-col items-center gap-2" dir="rtl">
                  {service.name === 'בית כנסת' ? (
                    <img src={senagogImg} alt="בית כנסת" className="w-14 h-14 object-contain" style={{ filter: service.urgent ? 'brightness(0) saturate(100%) invert(27%) sepia(86%) saturate(5000%) hue-rotate(347deg) brightness(90%)' : 'brightness(0) saturate(100%) invert(41%) sepia(88%) saturate(2064%) hue-rotate(209deg) brightness(99%)' }} />
                  ) : Icon ? (
                    <Icon size={52} weight="duotone" className={iconColor} />
                  ) : null}
                  <span className="text-4xl text-center" style={{ fontFamily: 'Rubik' }}>
                    {service.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent dir="rtl" className="flex flex-col gap-2 overflow-hidden">
                <p className="text-xl font-bold text-accent" style={{ fontFamily: 'Rubik' }}>
                  שעות פעילות:
                </p>
                <div className="flex flex-col gap-1">
                  {service.hours.map((h) => (
                    <p
                      key={h}
                      className="text-xl leading-snug text-accent font-semibold"
                      style={{ fontFamily: 'Assistant' }}
                    >
                      {h}
                    </p>
                  ))}
                </div>
                <div className={`mt-auto p-3 rounded-lg border-r-4 ${borderColor} bg-accent/10`}>
                  <p className="text-xl text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                    {service.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


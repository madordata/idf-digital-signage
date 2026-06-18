import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Storefront, ForkKnife, Barbell, Scissors, Church, FirstAid, Package } from '@phosphor-icons/react';

const services = [
  {
    icon: Storefront,
    name: 'כוורת',
    hours: ['א׳–ה׳: 08:00–20:00', 'ו׳: 08:00–14:00'],
    location: 'בניין מרכזי, קומה 1',
  },
  {
    icon: ForkKnife,
    name: 'חד״א',
    hours: ['בוקר: 06:30–08:00', 'צהריים: 12:00–13:30', 'ערב: 18:00–19:30'],
    location: 'בניין האוכל',
  },
  {
    icon: Barbell,
    name: 'חד״כ',
    hours: ['א׳–ה׳: 06:00–22:00', 'ו׳–ש׳: 08:00–18:00'],
    location: 'בניין הספורט',
  },
  {
    icon: Scissors,
    name: 'מספרה',
    hours: ['א׳, ג׳, ה׳: 14:00–17:00', 'ללא תור — לפי הגעה'],
    location: 'ליד הכוורת',
  },
  {
    icon: Church,
    name: 'בית כנסת',
    hours: ['פתוח בכל עת', 'שחרית: 06:30', 'מנחה-ערבית: לפי השקיעה'],
    location: 'בניין מרכזי, קומה 2',
  },
  {
    icon: FirstAid,
    name: 'מרפאה',
    hours: ['א׳–ה׳: 07:00–19:00', 'ו׳: 08:00–13:00', 'חירום: 24/7 — טלפון 101'],
    location: 'בניין הרפואה',
    urgent: true,
  },
  {
    icon: Package,
    name: 'אפסנאות',
    hours: ['א׳, ג׳, ה׳: 09:00–12:00', 'קבלת ציוד בתיאום מראש'],
    location: 'המחסן המרכזי',
  },
];

export function ServicesScreen() {
  return (
    <div className="h-full p-8 overflow-hidden flex flex-col gap-0">
      <div className="grid grid-cols-4 grid-rows-2 gap-5 h-full">
        {services.map((service) => {
          const Icon = service.icon;
          const borderColor = service.urgent ? 'border-destructive' : 'border-accent';
          const iconColor = service.urgent ? 'text-destructive' : 'text-accent';
          return (
            <Card
              key={service.name}
              className={`bg-card border-4 ${borderColor} flex flex-col overflow-hidden`}
            >
              <CardHeader className="pb-2 shrink-0">
                <CardTitle className="flex flex-col items-center gap-2" dir="rtl">
                  <Icon size={52} weight="duotone" className={iconColor} />
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


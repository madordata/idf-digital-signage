import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Storefront, ForkKnife, Barbell, Scissors, Church, FirstAid, Package } from '@phosphor-icons/react';

export function ServicesScreen() {
  const services = [
    {
      icon: Storefront,
      name: 'כוורת',
      hours: 'א׳-ה׳: 08:00-20:00',
      hours2: 'ו׳: 08:00-14:00',
      location: 'בניין מרכזי, קומה 1',
      color: 'accent'
    },
    {
      icon: ForkKnife,
      name: 'חדר אוכל',
      hours: 'ארוחת בוקר: 06:30-08:00',
      hours2: 'צהריים: 12:00-13:30',
      hours3: 'ערב: 18:00-19:30',
      location: 'בניין האוכל',
      color: 'secondary'
    },
    {
      icon: Barbell,
      name: 'חדר כושר',
      hours: 'א׳-ה׳: 06:00-22:00',
      hours2: 'ו׳-ש׳: 08:00-18:00',
      location: 'בניין הספורט',
      color: 'accent'
    },
    {
      icon: Scissors,
      name: 'מספרה',
      hours: 'א׳, ג׳, ה׳: 14:00-17:00',
      hours2: 'ללא תור - לפי סדר הגעה',
      location: 'ליד הכוורת',
      color: 'secondary'
    },
    {
      icon: Church,
      name: 'בית כנסת',
      hours: 'פתוח בכל עת',
      hours2: 'תפילות: שחרית 06:30',
      hours3: 'מנחה-ערבית: לפי זמני השקיעה',
      location: 'בניין מרכזי, קומה 2',
      color: 'accent'
    },
    {
      icon: FirstAid,
      name: 'מרפאה',
      hours: 'א׳-ה׳: 07:00-19:00',
      hours2: 'ו׳: 08:00-13:00',
      hours3: 'חירום: 24/7 - טלפון 101',
      location: 'בניין הרפואה',
      color: 'destructive'
    },
    {
      icon: Package,
      name: 'אפסנאות',
      hours: 'א׳, ג׳, ה׳: 09:00-12:00',
      hours2: 'קבלת ציוד חדש בתיאום מראש',
      location: 'המחסן המרכזי',
      color: 'secondary'
    }
  ];

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="grid grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card 
              key={index}
              className={`bg-card border-4 ${
                service.color === 'accent' ? 'border-accent' :
                service.color === 'secondary' ? 'border-secondary' :
                service.color === 'destructive' ? 'border-destructive' :
                'border-border'
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col items-center gap-3" dir="rtl">
                  <Icon 
                    size={64} 
                    weight="duotone" 
                    className={`${
                      service.color === 'accent' ? 'text-accent' :
                      service.color === 'secondary' ? 'text-secondary' :
                      service.color === 'destructive' ? 'text-destructive' :
                      'text-foreground'
                    }`} 
                  />
                  <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>
                    {service.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent dir="rtl" className="space-y-3">
                <div className="p-4 bg-primary/50 rounded-lg">
                  <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                    שעות פעילות:
                  </p>
                </div>
                <div className="p-4 bg-primary/50 rounded-lg">
                  <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
                    {service.hours}
                  </p>
                </div>
                {service.hours2 && (
                  <div className="p-4 bg-primary/50 rounded-lg">
                    <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
                      {service.hours2}
                    </p>
                  </div>
                )}
                {service.hours3 && (
                  <div className="p-4 bg-primary/50 rounded-lg">
                    <p className="text-2xl leading-relaxed text-muted-foreground" style={{ fontFamily: 'Assistant' }}>
                      {service.hours3}
                    </p>
                  </div>
                )}
                <div className={`p-4 rounded-lg border-r-4 ${
                  service.color === 'accent' ? 'bg-accent/20 border-accent' :
                  service.color === 'secondary' ? 'bg-secondary/20 border-secondary' :
                  service.color === 'destructive' ? 'bg-destructive/20 border-destructive' :
                  'bg-muted border-border'
                }`}>
                  <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                    📍 {service.location}
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

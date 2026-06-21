import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, Siren, ShieldWarning } from '@phosphor-icons/react';
import { useContent } from '@/lib/ContentContext';

// Per-card visual styling, matched to the safety cards by position.
const CARD_STYLES = [
  {
    Icon: Siren,
    border: 'border-amber-500',
    iconColor: 'text-amber-400',
    subtitleColor: 'text-amber-400',
    alert: 'bg-amber-500/20 border-2 border-amber-500',
    footer: 'bg-amber-500/20 border-2 border-amber-500',
  },
  {
    Icon: ShieldWarning,
    border: 'border-destructive',
    iconColor: 'text-destructive',
    subtitleColor: 'text-destructive',
    alert: 'bg-destructive/20 border-2 border-destructive',
    footer: 'bg-accent/20 border-2 border-accent',
  },
  {
    Icon: ShieldCheck,
    border: 'border-amber-500',
    iconColor: 'text-amber-400',
    subtitleColor: 'text-amber-400',
    alert: 'bg-amber-500/20 border-2 border-amber-500',
    footer: 'bg-amber-500/20 border-2 border-amber-500',
  },
];

export function SafetyScreen() {
  const { safety } = useContent();

  return (
    <div className="h-full grid grid-cols-3 gap-6 p-8" dir="rtl">
      {safety.map((card, index) => {
        const style = CARD_STYLES[index % CARD_STYLES.length];
        const { Icon } = style;
        return (
          <Card key={card.title} className={`bg-card border-4 ${style.border}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-col items-center gap-4">
                <Icon size={72} weight="duotone" className={style.iconColor} />
                <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>{card.title}</span>
                <span className={`text-2xl ${style.subtitleColor} text-center font-bold`} style={{ fontFamily: 'Assistant' }}>
                  {card.subtitle}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className={style.alert}>
                <AlertDescription>
                  <p className="text-2xl leading-relaxed text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                    {card.alert}
                  </p>
                </AlertDescription>
              </Alert>

              {card.critical && (
                <div className="p-5 bg-destructive/30 rounded-lg border-4 border-destructive">
                  <p className="text-3xl text-foreground font-black leading-relaxed text-center" style={{ fontFamily: 'Rubik' }}>
                    {card.critical}
                  </p>
                </div>
              )}

              {card.items.map((item) => (
                <div key={item} className="p-5 bg-primary/50 rounded-lg">
                  <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Assistant' }}>
                    • {item}
                  </p>
                </div>
              ))}

              {card.footer && (
                <div className={`p-5 rounded-lg ${style.footer}`}>
                  <p className="text-2xl text-foreground font-bold" style={{ fontFamily: 'Assistant' }}>
                    {card.footer}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldWarning, User } from '@phosphor-icons/react';
import bamImg from '@/assest/bam.png';
import securityImg from '@/assest/security.png';
import { useContent } from '@/lib/ContentContext';

export function ProceduresScreen() {
  const { procedures } = useContent();
  const { card1, card2, card3 } = procedures;

  return (
    <div className="h-full flex flex-col gap-6 p-8">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* יוהל״ם */}
        <Card className="bg-card border-4 border-accent flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <User size={64} weight="duotone" className="text-accent" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>יוהל״ם</span>
              <span className="text-2xl text-muted-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                {card1.subtitle}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-center gap-6">
            <div className="p-6 bg-primary/50 rounded-xl border border-accent/30">
              <p className="text-3xl leading-relaxed text-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                {card1.intro}
              </p>
            </div>
            <div className="p-6 bg-accent/10 rounded-xl border-2 border-accent">
              <p className="text-3xl leading-relaxed text-foreground font-bold text-center" style={{ fontFamily: 'Assistant' }}>
                {card1.callToAction}
              </p>
              <p className="text-7xl font-bold text-center text-accent mt-2" style={{ fontFamily: 'Rubik' }}>
                {card1.phone}
              </p>
              <p className="text-4xl font-bold text-center mt-1" style={{ fontFamily: 'Rubik' }}>
                {card1.extension}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* סמים ואלכוהול */}
        <Card className="bg-card border-4 border-destructive flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <ShieldWarning size={64} weight="duotone" className="text-destructive" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>סמים ואלכוהול</span>
              <span className="text-2xl text-destructive text-center font-bold" style={{ fontFamily: 'Assistant' }}>
                {card2.subtitle}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-center gap-6">
            <div className="p-6 bg-destructive/20 rounded-xl border-2 border-destructive">
              <p className="text-3xl leading-relaxed text-foreground font-bold text-center" style={{ fontFamily: 'Assistant' }}>
                {card2.para1}
              </p>
            </div>
            <div className="p-6 bg-primary/50 rounded-xl border border-destructive/40">
              <p className="text-3xl leading-relaxed text-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                {card2.para2}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ביטחון מידע */}
        <Card className="bg-card border-4 border-accent flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col items-center gap-4" dir="rtl">
              <img src={securityImg} alt="ביטחון מידע" className="w-16 h-16 object-contain" />
              <span className="text-5xl text-center" style={{ fontFamily: 'Rubik' }}>ביטחון מידע</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-between gap-4">
            <div className="p-6 bg-accent/10 rounded-lg border-2 border-accent">
              <p className="text-2xl leading-relaxed text-foreground font-bold text-center" style={{ fontFamily: 'Assistant' }}>
                {card3.para1}
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img src={bamImg} alt="בטחון מידע" className="w-72 h-72 rounded-full object-cover border-4 border-accent shadow-[0_0_32px_rgba(34,211,238,0.4)]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

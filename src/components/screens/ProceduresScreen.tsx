import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldWarning, User, ClipboardText } from '@phosphor-icons/react';
import bamImg from '@/assest/bam.png';
import securityImg from '@/assest/security.png';
import { useContent } from '@/lib/ContentContext';

export function ProceduresScreen() {
  const { procedures } = useContent();
  const { card1, card2, card3 } = procedures;

  return (
    <div className="h-full flex flex-col gap-6 p-8 overflow-hidden select-none">
      <div className="grid grid-cols-3 gap-6 h-full overflow-hidden">
        {/* יוהל״ם */}
        <Card className="bg-card border-4 border-accent flex flex-col h-full overflow-hidden justify-between">
          <CardHeader className="pb-2 pt-6 flex-shrink-0">
            <CardTitle className="flex flex-col items-center gap-2" dir="rtl">
              <User size={64} weight="duotone" className="text-accent" />
              <span className="text-5xl text-center font-bold" style={{ fontFamily: 'Rubik' }}>יוהל״ם</span>
              <span className="text-2xl text-muted-foreground text-center font-medium" style={{ fontFamily: 'Assistant' }}>
                {card1.subtitle}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-between gap-4 pb-6 px-6 overflow-hidden">
            <div className="p-4 bg-primary/40 rounded-xl border border-accent/20 flex flex-col justify-center min-h-[100px]">
              <p className="text-[1.5rem] leading-relaxed text-foreground text-center" style={{ fontFamily: 'Assistant' }}>
                {card1.intro}
              </p>
            </div>
            
            {card2?.intro && (
              <div className="p-4 bg-accent/5 rounded-xl border border-accent/30 flex flex-col justify-center min-h-[100px] border-dashed">
                <p className="text-[1.4rem] leading-relaxed text-cyan-300 font-bold text-center" style={{ fontFamily: 'Assistant' }}>
                  {card2.intro}
                </p>
              </div>
            )}

            <div className="p-4 bg-accent/15 rounded-xl border-2 border-accent flex flex-col justify-center items-center">
              <p className="text-[1.5rem] leading-none text-foreground font-bold text-center mb-2" style={{ fontFamily: 'Assistant' }}>
                {card1.callToAction}
              </p>
              <p className="text-6xl font-extrabold text-center text-accent tracking-wider leading-none" style={{ fontFamily: 'Rubik' }}>
                {card1.phone}
              </p>
              <p className="text-3xl font-bold text-center text-foreground/90 mt-1 leading-none" style={{ fontFamily: 'Rubik' }}>
                {card1.extension}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* סמים ואלכוהול */}
        <Card className="bg-card border-4 border-destructive flex flex-col h-full overflow-hidden justify-between">
          <CardHeader className="pb-2 pt-6 flex-shrink-0">
            <CardTitle className="flex flex-col items-center gap-2" dir="rtl">
              <ShieldWarning size={64} weight="duotone" className="text-destructive" />
              <span className="text-5xl text-center font-bold" style={{ fontFamily: 'Rubik' }}>סמים ואלכוהול</span>
              <span className="text-2xl text-destructive text-center font-bold" style={{ fontFamily: 'Assistant' }}>
                {card2.subtitle}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-between gap-4 pb-6 px-6 overflow-hidden">
            <div className="p-5 bg-destructive/15 rounded-xl border-2 border-destructive flex items-center justify-center min-h-[120px]">
              <p className="text-[1.5rem] leading-relaxed text-foreground font-bold text-center" style={{ fontFamily: 'Assistant' }}>
                {card2.para1}
              </p>
            </div>
            <div className="p-4 bg-primary/40 rounded-xl border border-destructive/30 flex items-center justify-center min-h-[100px]">
              <p className="text-[1.4rem] leading-relaxed text-foreground/95 text-center" style={{ fontFamily: 'Assistant' }}>
                {card2.para2}
              </p>
            </div>
            {card2?.para3 && (
              <div className="p-4 bg-primary/40 rounded-xl border border-destructive/30 flex items-center justify-center min-h-[100px]">
                <p className="text-[1.4rem] leading-relaxed text-foreground/95 text-center font-semibold" style={{ fontFamily: 'Assistant' }}>
                  {card2.para3}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ביטחון מידע */}
        <Card className="bg-card border-4 border-green-500 flex flex-col h-full overflow-hidden justify-between">
          <CardHeader className="pb-1 pt-3 flex-shrink-0">
            <CardTitle className="flex flex-col items-center gap-1" dir="rtl">
              <img src={securityImg} alt="ביטחון מידע" className="w-24 h-28 object-contain" />
              <span className="text-5xl text-center font-bold" style={{ fontFamily: 'Rubik' }}>ביטחון מידע</span>
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl" className="flex-1 flex flex-col justify-between gap-2 pb-3 px-6 overflow-hidden">
            {/* מידע צבאי - 5 הנחיות מרוכזות */}
            <div className="p-3 bg-accent/5 rounded-xl border border-accent/20 flex-1 flex flex-col justify-center gap-2 overflow-hidden">
              {[card3.para1, card3?.para2, card3?.para3, card3?.para4, card3?.para5]
                .filter(Boolean)
                .map((para, idx) => (
                  <div key={idx} className="flex items-start gap-3 border-b border-accent/10 pb-1 last:border-0 last:pb-0">
                    <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                      {idx + 1}
                    </span>
                    <p className="text-[1.05rem] leading-snug text-foreground font-semibold" style={{ fontFamily: 'Assistant' }}>
                      {para}
                    </p>
                  </div>
                ))}
            </div>
            
            {/* סמל BAM */}
            <div className="flex-shrink-0 flex items-center justify-center py-1">
              <img 
                src={bamImg} 
                alt="בטחון מידע" 
                className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-[0_0_24px_rgba(34,211,238,0.35)]" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

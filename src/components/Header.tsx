import { useEffect, useState } from 'react';
import { Clock, CloudSun } from '@phosphor-icons/react';
import { getHebrewDayName, getHebrewDate, getGregorianDate, formatTime } from '@/lib/hebrewUtils';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  currentScreenTitle: string;
}

export function Header({ currentScreenTitle }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary border-b-4 border-accent z-50">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-4xl font-bold">
              🎖️
            </div>
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-4xl font-bold">
              🇮🇱
            </div>
          </div>
          
          <Separator orientation="vertical" className="h-16 bg-border" />
          
          <div className="flex flex-col gap-1" dir="rtl">
            <div className="text-2xl font-bold text-foreground">
              {getHebrewDate(currentTime)}
            </div>
            <div className="text-xl text-muted-foreground">
              {getGregorianDate(currentTime)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-accent tracking-tight" style={{ fontFamily: 'Rubik' }} dir="rtl">
            {currentScreenTitle}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end gap-1" dir="rtl">
            <div className="text-2xl font-semibold text-foreground">
              {getHebrewDayName(currentTime)}
            </div>
            <div className="flex items-center gap-3">
              <Clock size={36} weight="bold" className="text-accent" />
              <div className="text-4xl font-bold text-foreground tabular-nums" style={{ fontFamily: 'Rubik' }}>
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
          
          <Separator orientation="vertical" className="h-16 bg-border" />
          
          <div className="flex items-center gap-3">
            <CloudSun size={48} weight="duotone" className="text-accent" />
            <div className="flex flex-col" dir="rtl">
              <div className="text-4xl font-bold text-foreground">22°</div>
              <div className="text-lg text-muted-foreground">בהיר</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { Clock, Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudSnow, CloudLightning, Wind } from '@phosphor-icons/react';
import { getHebrewDayName, getHebrewDate, getGregorianDate, formatTime } from '@/lib/hebrewUtils';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { WEATHER_REFRESH_INTERVAL } from '@/lib/config';
import idfBadge from '@/assest/PakmazLogo.svg.png';
import unitLogo from '@/assest/white logo.png';

// Jerusalem coordinates (Asia/Jerusalem timezone)
const JERUSALEM_LAT = 31.7683;
const JERUSALEM_LON = 35.2137;

interface WeatherData {
  tempCelsius: number;
  condition: string;
  wmoCode: number;
}

/** Map WMO weather interpretation codes → { Hebrew label, icon component key } */
function getWeatherMeta(code: number): { label: string; iconKey: string } {
  if (code === 0)                               return { label: 'בהיר',           iconKey: 'Sun' };
  if (code === 1)                               return { label: 'בהיר חלקית',      iconKey: 'CloudSun' };
  if (code === 2)                               return { label: 'מעונן חלקית',     iconKey: 'CloudSun' };
  if (code === 3)                               return { label: 'מעונן',           iconKey: 'Cloud' };
  if (code === 45 || code === 48)               return { label: 'ערפל',            iconKey: 'CloudFog' };
  if (code >= 51 && code <= 57)                 return { label: 'טפטוף',           iconKey: 'CloudRain' };
  if (code >= 61 && code <= 67)                 return { label: 'גשם',             iconKey: 'CloudRain' };
  if (code >= 71 && code <= 77)                 return { label: 'שלג',             iconKey: 'CloudSnow' };
  if (code >= 80 && code <= 82)                 return { label: 'סופת גשם',      iconKey: 'CloudRain' };
  if (code === 85 || code === 86)               return { label: 'סופת שלג',      iconKey: 'CloudSnow' };
  if (code === 95)                              return { label: 'סופת רעמים',      iconKey: 'CloudLightning' };
  if (code === 96 || code === 99)               return { label: 'סופת ברד',        iconKey: 'CloudLightning' };
  return { label: 'בהיר', iconKey: 'Sun' };
}

const ICON_MAP: Record<string, React.FC<{ size: number; weight: string; className: string }>> = {
  Sun:            Sun as any,
  CloudSun:       CloudSun as any,
  Cloud:          Cloud as any,
  CloudFog:       CloudFog as any,
  CloudRain:      CloudRain as any,
  CloudSnow:      CloudSnow as any,
  CloudLightning: CloudLightning as any,
  Wind:           Wind as any,
};

async function fetchJerusalemWeather(): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${JERUSALEM_LAT}&longitude=${JERUSALEM_LON}` +
    `&current=temperature_2m,weathercode&timezone=Asia%2FJerusalem`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const json = await res.json();
  const code: number = json.current.weathercode;
  const temp: number = Math.round(json.current.temperature_2m);
  return { tempCelsius: temp, condition: getWeatherMeta(code).label, wmoCode: code };
}

const FALLBACK_WEATHER: WeatherData = { tempCelsius: 22, condition: 'בהיר', wmoCode: 0 };

function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>(FALLBACK_WEATHER);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchJerusalemWeather()
        .then(data => { if (!cancelled) setWeather(data); })
        .catch(() => { /* keep previous / fallback value */ });
    };

    load();
    const interval = setInterval(load, WEATHER_REFRESH_INTERVAL);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const { iconKey } = getWeatherMeta(weather.wmoCode);
  const WeatherIcon = ICON_MAP[iconKey];

  return (
    <div className="flex items-center gap-3">
      <WeatherIcon size={40} weight="duotone" className="text-accent" />
      <div className="flex flex-col items-end" dir="rtl">
        <div className="text-3xl font-bold text-foreground tabular-nums">{weather.tempCelsius}°</div>
        <div className="text-base text-muted-foreground">{weather.condition}</div>
      </div>
    </div>
  );
}

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
      <div className="flex items-center justify-between px-8 py-3">
        {/* ── LEFT: logos + dates ── */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={idfBadge} alt='לוגו צה"ל' />
              <AvatarFallback className="bg-accent text-primary text-xl font-bold">צ</AvatarFallback>
            </Avatar>
            <Avatar className="w-20 h-20">
              <AvatarImage src={unitLogo} alt="לוגו יחידה" />
              <AvatarFallback className="bg-secondary text-primary text-xl font-bold">יח</AvatarFallback>
            </Avatar>
          </div>

          <Separator orientation="vertical" className="h-14 bg-border" />

          <div className="flex flex-col gap-0.5 text-right" dir="rtl">
            <div className="text-2xl font-bold text-foreground">
              {getHebrewDate(currentTime)}
            </div>
            <div className="text-2xl font-semibold text-muted-foreground">
              {getGregorianDate(currentTime)}
            </div>
          </div>
        </div>

        {/* ── CENTER: screen title ── */}
        <div className="flex flex-col items-center min-w-0 flex-1 px-8">
          <h1
            className="text-4xl font-bold text-accent tracking-tight w-full text-center leading-tight"
            style={{ fontFamily: 'Rubik', overflowWrap: 'break-word', wordBreak: 'keep-all' }}
            dir="rtl"
          >
            מחנה נחמיה תמרי
            <br />
            <span className="text-2xl font-semibold text-foreground/80">פיקוד המרכז</span>
          </h1>
        </div>

        {/* ── RIGHT: day + clock + weather ── */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl font-bold text-accent text-right" dir="rtl">
              {getHebrewDayName(currentTime)}
            </div>
            <div className="flex items-center gap-3" dir="rtl">
              <Clock size={28} weight="bold" className="text-accent" />
              <div className="text-3xl font-bold text-foreground tabular-nums" style={{ fontFamily: 'Rubik' }}>
                {formatTime(currentTime)}
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-14 bg-border" />

          <WeatherWidget />
        </div>
      </div>
    </header>
  );
}

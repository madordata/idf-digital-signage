import { getUpcomingHolidays, getNext7Days } from '@/lib/hebrewUtils';
import idfSpirit from '@/assest/idf-spirit.png';
import doh1 from '@/assest/doh1.png';

export function HomeScreen() {
  const days = getNext7Days();
  const holidays = getUpcomingHolidays(4);

  return (
    <div className="h-full flex overflow-hidden">

      {/* ── Left content column ───────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 p-6 min-w-0">

        {/* 7-day calendar strip */}
        <div className="flex gap-2 flex-shrink-0" dir="rtl">
          {days.map((day, i) => (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-4 px-1 rounded-xl border-2 ${
                day.isToday
                  ? 'bg-accent/15 border-accent shadow-lg shadow-accent/20'
                  : 'bg-card/40 border-border/40'
              }`}
            >
              {/* Short day name — א׳ ב׳ … */}
              <span
                className={`text-2xl font-bold ${day.isToday ? 'text-accent' : 'text-muted-foreground'}`}
                style={{ fontFamily: 'Rubik' }}
              >
                {day.shortDayName}
              </span>

              {/* Gregorian day number — big */}
              <span
                className={`text-6xl font-bold leading-none ${day.isToday ? 'text-accent' : 'text-foreground'}`}
                style={{ fontFamily: 'Rubik' }}
              >
                {day.dayNum}
              </span>

              {/* Hebrew day gematria */}
              <span
                className="text-xl text-muted-foreground"
                style={{ fontFamily: 'Assistant' }}
              >
                {day.hebrewDayGematria}
              </span>

              {/* Holiday badge (if any) */}
              {day.holidays.length > 0 && (
                <span
                  className="text-base font-bold text-yellow-300 text-center px-1 leading-tight mt-1"
                  style={{ fontFamily: 'Assistant' }}
                >
                  {day.holidays[0]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Holiday countdown circles */}
        <div className="flex gap-6 justify-around items-start flex-shrink-0 py-2" dir="rtl">
          {holidays.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              {/* Countdown circle */}
              <div className="w-36 h-36 rounded-full border-4 border-accent bg-card/60 flex flex-col items-center justify-center shadow-lg shadow-accent/10">
                <span
                  className="text-5xl font-bold text-accent leading-none"
                  style={{ fontFamily: 'Rubik' }}
                >
                  {h.days}
                </span>
                <span
                  className="text-lg text-muted-foreground"
                  style={{ fontFamily: 'Assistant' }}
                >
                  ימים
                </span>
              </div>

              {/* Holiday name + date */}
              <span
                className="text-2xl font-bold text-foreground text-center"
                style={{ fontFamily: 'Rubik' }}
              >
                {h.name}
              </span>
              <span
                className="text-lg text-muted-foreground text-center"
                style={{ fontFamily: 'Assistant' }}
              >
                {h.date}
              </span>
            </div>
          ))}
        </div>

        {/* Two action boxes */}
        <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">

          {/* Box 1 — חייל שפר הופעתך */}
          <div
            className="flex items-center justify-center rounded-xl border-2 border-orange-400 bg-orange-500/10 px-6"
            dir="rtl"
          >
            <span
              className="text-5xl font-bold text-orange-300 text-center leading-snug"
              style={{ fontFamily: 'Rubik' }}
            >
              חייל שפר הופעתך
            </span>
          </div>

          {/* Box 2 — להזין דו״ח 1 */}
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-yellow-400 bg-yellow-400/10 px-6 py-4"
            dir="rtl"
          >
            <img
              src={doh1}
              alt="דו״ח 1"
              className="h-32 w-32 object-contain"
              draggable={false}
            />
            <span
              className="text-5xl font-bold text-yellow-300 text-center leading-snug"
              style={{ fontFamily: 'Rubik' }}
            >
              להזין דו״ח 1
            </span>
          </div>

        </div>
      </div>

      {/* ── Right side — IDF Spirit image, full height, pixel-perfect ratio 1358×1900 ── */}
      <div className="flex-shrink-0 h-full overflow-hidden" style={{ aspectRatio: '1358 / 1900' }}>
        <img
          src={idfSpirit}
          alt="רוח צה״ל"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

    </div>
  );
}

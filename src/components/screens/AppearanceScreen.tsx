import idfSpirit from '@/assest/idf-spirit.png';
import madimImg from '@/assest/madim.png';
import { useContent } from '@/lib/ContentContext';

export function AppearanceScreen() {
  const { appearance } = useContent();

  return (
    <div className="h-full flex overflow-hidden" dir="rtl">

      {/* ── Right side — IDF Spirit image (~40% width) ── */}
      <div className="basis-2/5 flex-shrink-0 h-full overflow-hidden">
        <img
          src={idfSpirit}
          alt="רוח צה״ל"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* ── Left side — appearance & dress banner ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5 p-8 overflow-hidden">

        {/* Banner title */}
        <div className="flex items-center gap-5 flex-shrink-0 bg-card border-4 border-accent rounded-2xl px-8 py-5 shadow-lg shadow-accent/10">
          <img
            src={madimImg}
            alt=""
            className="shrink-0 object-contain"
            style={{ width: 64, height: 64 }}
          />
          <h1
            className="text-6xl font-bold text-white leading-none"
            style={{ fontFamily: 'Rubik' }}
          >
            הופעה ולבוש
          </h1>
        </div>

        {/* Sections */}
        <div className="flex-1 min-h-0 flex flex-col gap-5 overflow-hidden">
          {appearance.sections.map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-3 rounded-2xl border-2 border-accent/40 bg-primary/40 px-7 py-5"
            >
              <h2
                className="text-4xl font-bold text-accent leading-tight"
                style={{ fontFamily: 'Rubik' }}
              >
                {section.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-3xl leading-snug text-foreground"
                    style={{ fontFamily: 'Assistant' }}
                  >
                    <span className="text-accent shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackGoal } from "@/components/YandexMetrika";
import hero1 from "@/assets/portfolio-new-8.jpg";
import hero3 from "@/assets/portfolio-new-2.jpg";
import hero4 from "@/assets/real-work-2.jpg";
import hero5 from "@/assets/portfolio-new-6.jpg";
import hero6 from "@/assets/portfolio-new-5.jpg";
import extra8 from "@/assets/real-work-5.jpg";

function getVisibleWorks<T>(items: T[], start: number, count: number) {
  return Array.from({ length: count }, (_, offset) => items[(start + offset) % items.length]);
}

const works = [
  { src: hero1, caption: "Мраморный almond в молочных тонах", alt: "Молочный маникюр от мастера Изабеллы" },
  { src: hero3, caption: "Нежный квадрат с сияющим френчем", alt: "Французский маникюр в Смоленске" },
  { src: hero4, caption: "Френч с акцентным дизайном", alt: "Дизайн ногтей в Смоленске" },
  { src: hero5, caption: "Бордовый glass-эффект с розами", alt: "Маникюр с покрытием гель-лаком в Смоленске" },
  { src: hero6, caption: "Белый дизайн со звёздами", alt: "Дизайн ногтей в Смоленске от Izabella Nails" },
  { src: extra8, caption: "Молочный объёмный дизайн", alt: "Наращивание ногтей в Смоленске" },
];

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const activeWork = activeIndex !== null ? works[activeIndex] : null;
  const visibleWorks = getVisibleWorks(works.map((work, index) => ({ ...work, index })), startIndex, 4);

  const move = (direction: "prev" | "next") => {
    setStartIndex((prev) => {
      if (direction === "next") return (prev + 1) % works.length;
      return (prev - 1 + works.length) % works.length;
    });
  };

  const handleWorkClick = (index: number) => {
    trackGoal("portfolio_open", { work_index: index + 1, work_name: works[index]?.caption });
    setActiveIndex(index);
  };

  return (
    <section id="portfolio" className="bg-background py-6 md:py-16">
      <div className="mx-auto max-w-7xl px-2 md:px-6">
        <div className="mb-4 flex items-end justify-between gap-3 md:mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Портфолио</span>
            <h2 className="mt-2 mb-3 font-display text-xl md:mt-3 md:mb-4 md:text-5xl">
              Работы <span className="italic text-gradient-gold">мастера</span>
            </h2>
          </div>
          <div className="flex gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => move("prev")}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card"
              aria-label="Прокрутить работы назад"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => move("next")}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card"
              aria-label="Прокрутить работы вперёд"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-0 md:px-12">
          <button
            type="button"
            onClick={() => move("prev")}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 md:inline-flex items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft "
            aria-label="Прокрутить работы назад"
          >
            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>

          <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-4">
            {visibleWorks.map((w) => (
              <button
                key={w.index}
                type="button"
                onClick={() => handleWorkClick(w.index)}
                data-cta="portfolio"
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted md:rounded-[1.25rem] shadow-card focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <img
                  src={w.src}
                  alt={w.alt}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent hidden md:block`} />
                <div className={`absolute inset-x-0 bottom-0 p-2 text-left text-card hidden md:block md:p-3`}>
                  <div className="text-xs font-medium leading-snug md:text-sm">{w.caption}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move("next")}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 md:inline-flex items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft "
            aria-label="Прокрутить работы вперёд"
          >
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-4 text-sm text-muted-foreground md:mt-5">
          <a href="#booking" className="font-medium text-primary hover:underline">
            Хочу такой же → Записаться
          </a>
        </div>

        {activeWork ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-background shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                aria-label="Закрыть фото"
              >
                ×
              </button>
              <img src={activeWork.src} alt={activeWork.alt} className="max-h-[85vh] w-full object-contain bg-black" />
              <div className="px-6 py-4 text-center">
                <div className="text-sm font-medium text-foreground">{activeWork.caption}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

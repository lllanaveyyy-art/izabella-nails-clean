import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  { src: hero1, caption: "Мраморный almond в молочных тонах", alt: "Молочный almond с мраморным дизайном" },
  { src: hero3, caption: "Нежный квадрат с сияющим френчем", alt: "Нежный квадратный маникюр с полупрозрачным френчем" },
  { src: hero4, caption: "Френч с акцентным дизайном", alt: "Френч с акцентным дизайном" },
  { src: hero5, caption: "Бордовый glass-эффект с розами", alt: "Бордовый маникюр с прозрачным эффектом и розами" },
  { src: hero6, caption: "Белый дизайн со звёздами", alt: "Белый маникюр с синими звёздами" },
  { src: extra8, caption: "Молочный объёмный дизайн", alt: "Молочный маникюр с объёмным дизайном" },
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

  return (
    <section id="portfolio" className="py-12 md:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Портфолио</span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 mb-4">
              Работы <span className="italic text-gradient-gold">мастера</span>
            </h2>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-10 md:px-12">
          <button
            type="button"
            onClick={() => move("prev")}
            className="absolute left-0 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:bg-rose-soft"
            aria-label="Прокрутить работы назад"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {visibleWorks.map((w) => (
              <button
                key={w.index}
                type="button"
                onClick={() => setActiveIndex(w.index)}
                className="group relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-muted shadow-card focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <img
                  src={w.src}
                  alt={w.alt}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left text-card">
                  <div className="text-xs font-medium leading-snug md:text-sm">{w.caption}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move("next")}
            className="absolute right-0 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:bg-rose-soft"
            aria-label="Прокрутить работы вперёд"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-4 text-sm text-muted-foreground">
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

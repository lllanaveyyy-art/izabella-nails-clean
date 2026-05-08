import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { brand } from "@/data/brand";

function chunkItems<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function Reviews() {
  const [page, setPage] = useState(0);
  const reviewPages = useMemo(() => chunkItems(reviews, 4), []);

  const goToPage = (direction: "prev" | "next") => {
    setPage((prev) => {
      if (direction === "next") return (prev + 1) % reviewPages.length;
      return (prev - 1 + reviewPages.length) % reviewPages.length;
    });
  };

  return (
    <section id="reviews" className="bg-cream/40 py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 md:mb-10 md:gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Отзывы</span>
            <h2 className="mt-2 mb-3 font-display text-2xl md:mt-3 md:mb-4 md:text-5xl">
              Что говорят <span className="italic text-gradient-gold">клиенты</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card md:gap-4 md:px-6 md:py-4">
              <div className="text-center">
                <div className="font-display text-2xl text-foreground md:text-3xl">{brand.rating.toFixed(1)}</div>
                <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="h-10 w-px bg-border md:h-12" />
              <div>
                <div className="text-sm font-semibold">{brand.reviewsCount} отзывов</div>
                <div className="text-xs text-muted-foreground">Источник: Авито</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative px-0 md:px-16">
          <button
            type="button"
            onClick={() => goToPage("prev")}
            className="absolute left-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft md:left-0 md:h-11 md:w-11"
            aria-label="Прокрутить отзывы назад"
          >
            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
          {reviewPages[page].map((r) => (
            <article
              key={r.id}
              data-review-id={r.id}
              data-review-source={r.source}
              className="group flex min-h-[160px] flex-col rounded-[1.25rem] border border-border bg-card p-3 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant md:min-h-[170px] md:rounded-[1.5rem] md:p-4"
            >
              <div className="mb-2 flex items-center gap-2 md:mb-3 md:gap-3">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-rose font-display text-sm text-primary md:h-11 md:w-11 md:text-base">
                  <span className="absolute inset-0 flex items-center justify-center">{r.initials}</span>
                  {r.avatar ? (
                    <img
                      src={r.avatar}
                      alt={r.nickname}
                      className="absolute inset-0 h-full w-full rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold md:text-sm">{r.nickname}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>

              <div className="mb-2 flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-[13px] leading-relaxed text-foreground/85 md:text-sm">«{r.text}»</p>
            </article>
          ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage("next")}
            className="absolute right-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft md:right-0 md:h-11 md:w-11"
            aria-label="Прокрутить отзывы вперёд"
          >
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-4 text-xs text-muted-foreground md:mt-5 md:text-sm">
          <span>* Все отзывы в этом блоке реальные и взяты с Avito.</span>
        </div>
      </div>
    </section>
  );
}

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
    <section id="reviews" className="bg-cream/40 py-6 md:py-16">
      <div className="mx-auto max-w-7xl px-2 md:px-6">
        <div className="mb-4 flex items-end justify-between gap-3 md:mb-10 md:gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Отзывы</span>
            <h2 className="mt-2 mb-3 font-display text-xl md:mt-3 md:mb-4 md:text-5xl">
              Что говорят <span className="italic text-gradient-gold">клиенты</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card md:flex md:gap-4 md:px-6 md:py-4">
              <div className="text-center">
                <div className="font-display text-2xl text-foreground md:text-3xl">{brand.rating.toFixed(1)}</div>
                <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold md:h-3.5 md:w-3.5" />
                  ))}
                </div>
              </div>
              <div className="h-10 w-px bg-border md:h-12" />
              <div>
                <div className="text-xs font-semibold md:text-sm">{brand.reviewsCount} отзывов</div>
                <div className="text-xs text-muted-foreground">Источник: Авито</div>
              </div>
            </div>
            <div className="flex gap-1.5 md:hidden">
              <button
                type="button"
                onClick={() => goToPage("prev")}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card"
                aria-label="Прокрутить отзывы назад"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => goToPage("next")}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card"
                aria-label="Прокрутить отзывы вперёд"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative px-0 md:px-16">
          <button
            type="button"
            onClick={() => goToPage("prev")}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 md:inline-flex items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft "
            aria-label="Прокрутить отзывы назад"
          >
            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>

          <div className="grid grid-cols-2 gap-1.5 md:gap-4">
          {reviewPages[page].map((r) => (
            <article
              key={r.id}
              data-review-id={r.id}
              data-review-source={r.source}
              className="group flex min-h-[122px] flex-col rounded-xl border border-border bg-card p-2.5 md:rounded-[1.5rem] md:p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant md:min-h-[170px]"
            >
              <div className="mb-1.5 flex items-center gap-1.5 md:mb-3 md:gap-3">
                <div className="relative flex h-7 w-7 md:h-11 md:w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-rose font-display text-sm text-primary md:text-base">
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

              <div className="mb-1.5 flex md:mb-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold md:h-3.5 md:w-3.5" />
                ))}
              </div>

              <p className="text-xs leading-relaxed text-foreground/85 md:text-sm">«{r.text}»</p>
            </article>
          ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage("next")}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 md:inline-flex items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card transition hover:bg-rose-soft "
            aria-label="Прокрутить отзывы вперёд"
          >
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>

        <div className="mt-3 flex justify-end gap-4 text-xs text-muted-foreground md:mt-5 md:text-sm">
          <span>* Все отзывы в этом блоке реальные и взяты с Avito.</span>
        </div>
      </div>
    </section>
  );
}

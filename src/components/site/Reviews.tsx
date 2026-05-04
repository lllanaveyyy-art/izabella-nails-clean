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
    <section id="reviews" className="py-12 md:py-16 bg-cream/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Отзывы</span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 mb-4">
              Что говорят <span className="italic text-gradient-gold">клиенты</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 rounded-2xl bg-card border border-border px-6 py-4 shadow-card">
              <div className="text-center">
                <div className="font-display text-3xl text-foreground">{brand.rating.toFixed(1)}</div>
                <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-sm font-semibold">{brand.reviewsCount} отзывов</div>
                <div className="text-xs text-muted-foreground">Источник: Авито</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative px-12 md:px-16">
          <button
            type="button"
            onClick={() => goToPage("prev")}
            className="absolute left-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:bg-rose-soft"
            aria-label="Прокрутить отзывы назад"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-4">
          {reviewPages[page].map((r) => (
            <article
              key={r.id}
              data-review-id={r.id}
              data-review-source={r.source}
              className="group flex min-h-[170px] flex-col rounded-[1.5rem] border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-rose flex items-center justify-center font-display text-base text-primary">
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
                  <div className="text-sm font-semibold">{r.nickname}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>

              <div className="mb-2 flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed">«{r.text}»</p>
            </article>
          ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage("next")}
            className="absolute right-0 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition hover:bg-rose-soft"
            aria-label="Прокрутить отзывы вперёд"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-4 text-sm text-muted-foreground">
          <span>* Все отзывы в этом блоке реальные и взяты с Avito.</span>
        </div>
      </div>
    </section>
  );
}

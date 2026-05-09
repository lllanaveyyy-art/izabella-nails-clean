import { Send, Star, Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";
import { trackGoal } from "@/components/YandexMetrika";

export function Hero() {
  const visual = (
    <div className="relative ml-auto flex h-full w-full max-w-[14rem] flex-col md:mx-auto md:block md:h-auto md:max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] shrink-0">
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-elegant rotate-2 md:rounded-[2rem]">
          <img
            src={heroImg}
            alt="Маникюр в Смоленске от Izabella Nails"
            width={1080}
            height={1920}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -left-1 rounded-lg border border-border bg-card/95 px-1.5 py-1 shadow-card backdrop-blur md:-bottom-6 md:-left-6 md:rounded-2xl md:px-5 md:py-4">
          <div className="flex items-center gap-1 md:gap-3">
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-rose md:h-10 md:w-10">
              <Sparkles className="h-2.5 w-2.5 text-primary md:h-5 md:w-5" />
            </div>
            <div>
              <div className="text-[8px] font-semibold leading-none md:text-sm">
                Онлайн-запись
              </div>
              <div className="mt-0.5 text-[6.5px] leading-none text-muted-foreground md:text-xs">
                Удобное время · 24/7
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-0.5 -top-1.5 block rounded-lg border border-border bg-card/95 px-1.5 py-0.5 shadow-card backdrop-blur md:-right-4 md:-top-4 md:rounded-2xl md:px-4 md:py-3">
          <div className="text-[6.5px] uppercase tracking-widest text-muted-foreground md:text-[11px]">
            Онлайн
          </div>
          <div className="text-[8px] font-semibold leading-none md:text-sm">
            Запись открыта
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-end pt-2 md:hidden">
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-1 shadow-card backdrop-blur">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-[11px] font-semibold leading-none text-foreground">
            {brand.rating.toFixed(1)}
          </span>
          <span className="text-[10px] leading-none text-muted-foreground">
            · {brand.reviewsCount} отзывов
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.92 0.05 25 / 0.6), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.95 0.04 70 / 0.6), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-3 pb-7 pt-4 md:grid md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="md:space-y-7">
          <span className="hidden items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-1 text-[8px] font-medium leading-tight text-foreground/80 backdrop-blur md:inline-flex md:gap-2 md:px-4 md:py-1.5 md:text-xs">
            <Sparkles className="h-2.5 w-2.5 shrink-0 text-primary md:h-3.5 md:w-3.5" />
            <span>
              <span className="block md:inline">Маникюр в Смоленске</span>
              <span className="hidden md:inline"> · </span>
              <span className="block md:inline">ул. 25 Сентября, 16</span>
            </span>
          </span>

          <h1 className="font-display text-[2rem] leading-[0.98] text-foreground md:mt-0 md:text-5xl lg:text-6xl">
            Чистый маникюр <br />
            и трендовые дизайны <br />
            <span className="italic text-gradient-gold">от Изабеллы</span>
          </h1>

          <div className="mt-5 grid grid-cols-[0.78fr_1.22fr] items-stretch gap-2 md:mt-0 md:block">
            <div className="flex h-full min-h-[17.75rem] flex-col gap-5 md:block md:min-h-0 md:space-y-7">
              <p className="max-w-xl pt-1 text-[10px] leading-snug text-muted-foreground md:pt-0 md:text-lg md:leading-relaxed">
                <span className="block">Маникюр в Смоленске.</span>
                <span className="mt-2 block">
                  Аккуратный маникюр, покрытие и дизайн.
                </span>
                <span className="mt-2 block">
                  Стерильно, удобно, онлайн-запись.
                </span>
              </p>

              <div className="mt-auto flex flex-col items-start gap-1 md:mt-0 md:flex-row md:flex-wrap md:items-center md:gap-3">
                <a
                  href={brand.bookingUrl}
                  data-cta="booking"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-1.5 text-[10px] font-medium text-primary-foreground shadow-elegant transition-opacity hover:opacity-90 md:px-7 md:py-3.5 md:text-sm"
                >
                  Записаться онлайн
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-card/60 px-2.5 py-1.5 text-[10px] font-medium text-foreground backdrop-blur transition-colors hover:bg-card md:px-7 md:py-3.5 md:text-sm"
                >
                  Посмотреть услуги
                </a>
                <a
                  href={brand.telegram}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cta="telegram"
                  onClick={() => trackGoal("telegram_click")}
                  className="inline-flex items-center gap-1 rounded-full px-0 py-0.5 text-[10px] font-medium text-primary hover:underline md:gap-2 md:px-4 md:py-3 md:text-sm"
                >
                  <Send className="h-3 w-3 md:h-4 md:w-4" /> Написать в Telegram
                </a>
              </div>

              <div className="hidden items-center gap-1.5 pt-0.5 md:flex md:gap-6 md:pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-gold text-gold md:h-4 md:w-4"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-foreground md:text-sm">
                    {brand.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    · {brand.reviewsCount} отзывов
                  </span>
                </div>
                <span className="hidden sm:block h-6 w-px bg-border" />
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  Документы проверены · Онлайн-запись
                </span>
              </div>
            </div>

            <div className="md:hidden">{visual}</div>
          </div>
        </div>

        <div className="hidden md:block">{visual}</div>
      </div>
    </section>
  );
}

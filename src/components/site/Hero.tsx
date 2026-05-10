import { Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";

export function Hero() {
  const visual = (
    <div className="relative ml-auto w-full max-w-[13rem] overflow-visible md:mx-auto md:max-w-[22rem] lg:max-w-[25rem] xl:max-w-[27rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-elegant md:rotate-2 md:rounded-[2rem]">
        <img
          src={heroImg}
          alt="Маникюр в Смоленске от Izabella Nails"
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute -right-1 top-2 flex items-center gap-1 rounded-xl border border-white/70 bg-card/95 px-2 py-1 shadow-card backdrop-blur md:-right-6 md:-top-4 md:gap-2 md:rounded-2xl md:px-4 md:py-3">
        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-rose md:h-8 md:w-8">
          <Sparkles className="h-2.5 w-2.5 text-primary md:h-4 md:w-4" />
        </div>
        <div>
          <div className="text-[6px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]">
            ДИЗАЙНЫ
          </div>
          <div className="text-[8px] font-semibold leading-tight text-foreground md:text-sm">
            Трендовые идеи
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-xl border border-white/70 bg-card/95 px-2 py-1 shadow-card backdrop-blur md:-bottom-5 md:-left-6 md:gap-2 md:rounded-2xl md:px-4 md:py-3">
        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-rose md:h-8 md:w-8">
          <Sparkles className="h-2.5 w-2.5 text-primary md:h-4 md:w-4" />
        </div>
        <div>
          <div className="text-[6px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]">
            STYLE
          </div>
          <div className="text-[8px] font-semibold leading-tight text-foreground md:text-sm">
            Clean Girl Nails
          </div>
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-[0.98fr_1.02fr] items-center gap-2 px-3 pb-8 pt-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h1 className="font-display text-[1.74rem] leading-[1.02] text-foreground md:text-7xl md:leading-[0.95] lg:text-8xl">
            Маникюр <br />в Смоленске
          </h1>

          <div className="mt-3 h-px w-10 bg-gold md:mt-7 md:w-20" />

          <p className="mt-3 max-w-[9.25rem] text-[11px] leading-relaxed text-foreground/80 md:mt-7 md:max-w-xl md:text-xl md:leading-relaxed">
            Аккуратный маникюр, покрытие и дизайн.
            <br />
            Стерильно. Удобная онлайн-запись.
          </p>

          <div className="mt-4 flex flex-row flex-nowrap items-center gap-1.5 md:mt-8 md:flex-wrap md:gap-4">
            <a
              href={brand.bookingUrl}
              data-cta="booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-1.5 py-1.5 text-[8.5px] font-medium leading-tight text-primary-foreground shadow-elegant transition-opacity hover:opacity-90 md:px-8 md:py-4 md:text-sm"
            >
              Записаться онлайн
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-foreground/25 bg-card/35 px-1.5 py-1.5 text-[8.5px] font-medium leading-tight text-foreground backdrop-blur transition-colors hover:bg-card md:px-8 md:py-4 md:text-sm"
            >
              Услуги и цены
            </a>
          </div>

          <div className="mt-5 flex flex-nowrap items-center gap-1.5 text-[9px] font-medium leading-tight text-foreground/75 md:hidden">
            <span className="shrink-0">{brand.rating.toFixed(1)} ⭐</span>
            <span className="h-7 shrink-0 border-l border-foreground/20" />
            <span className="shrink-0">{brand.reviewsCount} отзывов</span>
            <span className="h-7 shrink-0 border-l border-foreground/20" />
            <span className="flex shrink-0 flex-col leading-tight">
              <span>ул. 25</span>
              <span>Сентября, 16</span>
            </span>
          </div>
          <div className="mt-9 hidden text-sm font-medium leading-snug text-foreground/75 md:block">
            {brand.rating.toFixed(1)} ⭐ · {brand.reviewsCount} отзывов · ул. 25
            Сентября, 16
          </div>
        </div>

        <div>{visual}</div>
      </div>
    </section>
  );
}

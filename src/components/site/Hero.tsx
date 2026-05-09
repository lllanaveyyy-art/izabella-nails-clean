import { Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";

export function Hero() {
  const visual = (
    <div className="relative mx-auto w-full max-w-[10.25rem] overflow-visible md:max-w-[22rem] lg:max-w-[25rem] xl:max-w-[27rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-elegant md:rotate-2 md:rounded-[2rem]">
        <img
          src={heroImg}
          alt="Маникюр в Смоленске от Izabella Nails"
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute -right-3 -top-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-card/95 px-3 py-2 shadow-card backdrop-blur md:-right-6 md:-top-4 md:px-4 md:py-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-rose md:h-8 md:w-8">
          <Sparkles className="h-3 w-3 text-primary md:h-4 md:w-4" />
        </div>
        <div>
          <div className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]">
            ДИЗАЙНЫ
          </div>
          <div className="text-[11px] font-semibold leading-tight text-foreground md:text-sm">
            Трендовые идеи
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-card/95 px-3 py-2 shadow-card backdrop-blur md:-bottom-5 md:-left-6 md:px-4 md:py-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-rose md:h-8 md:w-8">
          <Sparkles className="h-3 w-3 text-primary md:h-4 md:w-4" />
        </div>
        <div>
          <div className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]">
            STYLE
          </div>
          <div className="text-[11px] font-semibold leading-tight text-foreground md:text-sm">
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-[0.88fr_1.12fr] items-center gap-2 px-3 pb-8 pt-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h1 className="font-display text-[2.35rem] leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
            Маникюр <br />в Смоленске
          </h1>

          <div className="mt-3 h-px w-10 bg-gold md:mt-7 md:w-20" />

          <p className="mt-3 max-w-xl text-[11px] leading-snug text-foreground/80 md:mt-7 md:text-xl md:leading-relaxed">
            Аккуратный маникюр, покрытие и дизайн.
            <br />
            Стерильно. Удобная онлайн-запись.
          </p>

          <div className="mt-4 flex flex-col items-start gap-1.5 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-4">
            <a
              href={brand.bookingUrl}
              data-cta="booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground shadow-elegant transition-opacity hover:opacity-90 md:px-8 md:py-4 md:text-sm"
            >
              Записаться онлайн
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-foreground/25 bg-card/35 px-3 py-1.5 text-[10px] font-medium text-foreground backdrop-blur transition-colors hover:bg-card md:px-8 md:py-4 md:text-sm"
            >
              Услуги и цены
            </a>
          </div>

          <div className="mt-4 text-[9px] font-medium leading-snug text-foreground/75 md:mt-9 md:text-sm">
            {brand.rating.toFixed(1)} ⭐ · {brand.reviewsCount} отзывов · ул. 25
            Сентября, 16
          </div>
        </div>

        <div>{visual}</div>
      </div>
    </section>
  );
}

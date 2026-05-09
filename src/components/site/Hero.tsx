import { Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";

export function Hero() {
  const visual = (
    <div className="relative mx-auto w-full max-w-[17rem] md:max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-elegant md:rounded-[2rem]">
        <img
          src={heroImg}
          alt="Маникюр в Смоленске от Izabella Nails"
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
        />

        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/70 bg-card/90 px-2 py-1 text-[9px] font-medium leading-none text-foreground shadow-card backdrop-blur md:right-4 md:top-4 md:gap-2 md:px-4 md:py-2 md:text-xs">
          <Sparkles className="h-3 w-3 text-primary md:h-4 md:w-4" />
          трендовые дизайны
        </div>

        <div className="absolute bottom-2 left-2 rounded-full border border-white/70 bg-card/90 px-2.5 py-1 text-[9px] font-medium leading-none text-foreground shadow-card backdrop-blur md:bottom-4 md:left-4 md:px-4 md:py-2 md:text-xs">
          clean girl style
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-3 pb-8 pt-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h1 className="font-display text-[3.25rem] leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
            Маникюр <br />в Смоленске
          </h1>

          <div className="mt-4 h-px w-12 bg-gold md:mt-7 md:w-20" />

          <p className="mt-4 max-w-xl text-[12px] font-medium leading-snug text-foreground/75 md:mt-7 md:text-xl md:leading-relaxed">
            Аккуратный маникюр, покрытие и дизайн.
            <br />
            Стерильно. Удобная онлайн-запись.
          </p>

          <div className="mt-5 flex flex-col items-start gap-2 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-4">
            <a
              href={brand.bookingUrl}
              data-cta="booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-2 text-[11px] font-medium text-primary-foreground shadow-elegant transition-opacity hover:opacity-90 md:px-8 md:py-4 md:text-sm"
            >
              Записаться онлайн
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-foreground/25 bg-card/35 px-3.5 py-2 text-[11px] font-medium text-foreground backdrop-blur transition-colors hover:bg-card md:px-8 md:py-4 md:text-sm"
            >
              Услуги и цены
            </a>
          </div>

          <div className="mt-5 text-[10px] font-medium leading-snug text-foreground/75 md:mt-9 md:text-sm">
            {brand.rating.toFixed(1)} ⭐ · {brand.reviewsCount} отзывов · ул. 25
            Сентября, 16
          </div>
        </div>

        <div>{visual}</div>
      </div>
    </section>
  );
}

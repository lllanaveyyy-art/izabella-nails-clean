import { Send, Star, Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.92 0.05 25 / 0.6), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.95 0.04 70 / 0.6), transparent 60%)" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[1.15fr_0.85fr] items-center gap-3 px-3 py-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-2.5 md:space-y-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2 py-1 text-[9px] font-medium text-foreground/80 backdrop-blur md:gap-2 md:px-4 md:py-1.5 md:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Nail-студия в Смоленске · {brand.address}
          </span>

          <h1 className="font-display text-[1.56rem] leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Чистый маникюр <br />
            и трендовые дизайны <br />
            <span className="italic text-gradient-gold">от Изабеллы</span>
          </h1>

          <p className="max-w-xl text-[11px] leading-snug text-muted-foreground md:text-lg md:leading-relaxed">
            Привет, я Изабелла - nail-мастер в Смоленске 💖 Люблю чистый
            маникюр, аккуратную форму и дизайн без перегруза. Качественные
            материалы, стерильность и внимание к деталям - чтобы результат
            выглядел красиво и носился с комфортом.
          </p>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <a href={brand.bookingUrl} data-cta="hero-booking"
               className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-elegant md:text-sm transition-opacity hover:opacity-90 md:px-7 md:py-3.5">
              Записаться онлайн
            </a>
            <a href="#services"
               className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-card/60 px-3 py-2 text-xs font-medium text-foreground backdrop-blur md:text-sm transition-colors hover:bg-card md:px-7 md:py-3.5">
              Посмотреть услуги
            </a>
            <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
               className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium text-primary hover:underline md:gap-2 md:px-4 md:py-3 md:text-sm">
              <Send className="h-4 w-4" /> Написать в Telegram
            </a>
          </div>

          <div className="flex items-center gap-2 pt-1 md:gap-6 md:pt-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold md:h-4 md:w-4" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground md:text-sm">{brand.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground md:text-sm">· {brand.reviewsCount} отзывов</span>
            </div>
            <span className="hidden sm:block h-6 w-px bg-border" />
            <span className="hidden sm:inline text-sm text-muted-foreground">Документы проверены · Онлайн-запись</span>
          </div>
        </div>

        {/* Visual collage */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[8.75rem] md:max-w-md lg:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-elegant rotate-2 md:rounded-[2rem]">
            <img src={heroImg} alt="Аккуратный маникюр от Izabella Nails в Смоленске"
                 width={1080} height={1920}
                 className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -left-2 rounded-xl border border-border bg-card px-2 py-1.5 shadow-card md:-bottom-6 md:-left-6 md:rounded-2xl md:px-5 md:py-4">
            <div className="flex items-center gap-1.5 md:gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-rose md:h-10 md:w-10">
                <Sparkles className="h-3.5 w-3.5 text-primary md:h-5 md:w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold md:text-sm">Онлайн-запись</div>
                <div className="text-[8px] leading-tight text-muted-foreground md:text-xs">Удобное время · 24/7</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-card px-4 py-3 border border-border hidden sm:block">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Онлайн</div>
            <div className="text-sm font-semibold">Запись открыта</div>
          </div>
        </div>
      </div>
    </section>
  );
}

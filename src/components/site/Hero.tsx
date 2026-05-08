import { Send, Star, Sparkles } from "lucide-react";
import heroImg from "@/assets/real-work-8.jpg";
import { brand } from "@/data/brand";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.92 0.05 25 / 0.6), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.95 0.04 70 / 0.6), transparent 60%)" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-3 py-7 md:gap-10 md:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-3 md:space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/70 px-3 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur border border-border md:px-4 md:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Nail-студия в Смоленске · {brand.address}
          </span>

          <h1 className="font-display text-[1.85rem] leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
            Чистый маникюр <br />
            и трендовые дизайны <br />
            <span className="italic text-gradient-gold">от Изабеллы</span>
          </h1>

          <p className="text-[13px] text-muted-foreground md:text-lg max-w-xl leading-relaxed">
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
               className="inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-medium text-primary hover:underline md:px-4 md:py-3 md:text-sm md:px-4 md:py-3">
              <Send className="h-4 w-4" /> Написать в Telegram
            </a>
          </div>

          <div className="flex items-center gap-3 pt-1 md:gap-6 md:pt-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{brand.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">· {brand.reviewsCount} отзывов</span>
            </div>
            <span className="hidden sm:block h-6 w-px bg-border" />
            <span className="hidden sm:inline text-sm text-muted-foreground">Документы проверены · Онлайн-запись</span>
          </div>
        </div>

        {/* Visual collage */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[13rem] md:max-w-md lg:max-w-none">
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-elegant rotate-2">
            <img src={heroImg} alt="Аккуратный маникюр от Izabella Nails в Смоленске"
                 width={1080} height={1920}
                 className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-3 left-3 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-card md:-bottom-6 md:-left-6 md:block md:px-5 md:py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-rose flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">Онлайн-запись</div>
                <div className="text-xs text-muted-foreground">Удобное время · 24/7</div>
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

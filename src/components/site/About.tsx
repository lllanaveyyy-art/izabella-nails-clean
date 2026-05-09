import aboutImg from "@/assets/about-izabella.jpg";
import { Sparkles } from "lucide-react";
import { brand } from "@/data/brand";

export function About() {
  return (
    <section id="about" className="bg-background py-8 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-[0.42fr_0.58fr] items-start gap-3 px-4 md:grid-cols-1 md:gap-8 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant md:rounded-[2rem]">
            <img src={aboutImg} alt="Маникюр в Смоленске от мастера Изабеллы"
                 width={1200} height={1500} loading="lazy"
                 className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-card rounded-2xl px-5 py-4 shadow-card border border-border max-w-[240px]">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">мастер</div>
            <div className="font-display text-xl leading-tight">{brand.masterFullName}</div>
            <div className="mt-0.5 text-[9px] text-muted-foreground md:mt-1 md:text-xs">Смоленск · ул. 25-Сентября, 16</div>
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium md:text-xs md:tracking-[0.25em]">О мастере</span>
          <h2 className="mt-1 mb-2 font-display text-xl md:mt-3 md:mb-6 md:text-5xl">
            Немного <span className="italic text-gradient-gold">обо мне</span>
          </h2>
          <div className="space-y-2 text-[11px] leading-snug text-foreground/85 md:space-y-4 md:text-base md:leading-relaxed">
            <p>Привет, я Изабелла — твой мастер маникюра 💖</p>
            <p>
              Люблю чистый маникюр, аккуратную форму и дизайны, которые подчёркивают
              стиль, но не перегружают образ. Работаю на качественных материалах,
              соблюдаю стерильность и внимательно отношусь к каждой детали.
            </p>
            <p>
              Со мной твои ручки будут выглядеть ухоженно, красиво и аккуратно
              каждый день.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 md:mt-8 md:gap-4">
            {[
              { k: "5.0", v: "Рейтинг" },
              { k: "18+", v: "Отзывов" },
              { k: "100%", v: "Стерильность" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-cream/60 p-1.5 text-center md:rounded-2xl md:p-4">
                <div className="font-display text-sm text-foreground md:text-2xl">{s.k}</div>
                <div className="mt-0.5 text-[9px] text-muted-foreground md:mt-1 md:text-xs">{s.v}</div>
              </div>
            ))}
          </div>

          <a href={brand.bookingUrl}
             data-cta="booking"
             className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 md:mt-8 md:gap-2 md:px-6 md:py-3 md:text-sm">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" /> Записаться онлайн
          </a>
        </div>
      </div>
    </section>
  );
}

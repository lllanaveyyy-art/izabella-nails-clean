import aboutImg from "@/assets/about-izabella.jpg";
import { Sparkles } from "lucide-react";
import { brand } from "@/data/brand";

const stats = [
  { k: "5.0", v: "Рейтинг" },
  { k: "18+", v: "Отзывов" },
  { k: "100%", v: "Стерильность" },
];

export function About() {
  const statsBlock = (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {stats.map((s) => (
        <div
          key={s.v}
          className="rounded-xl border border-border bg-cream/60 p-1.5 text-center md:rounded-2xl md:p-4"
        >
          <div className="font-display text-sm text-foreground md:text-2xl">
            {s.k}
          </div>
          <div className="mt-0.5 text-[8px] text-muted-foreground md:mt-1 md:text-xs">
            {s.v}
          </div>
        </div>
      ))}
    </div>
  );

  const bookingButton = (
    <a
      href={brand.bookingUrl}
      data-cta="booking"
      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[11px] font-medium text-primary-foreground hover:opacity-90 md:gap-2 md:px-6 md:py-3 md:text-sm"
    >
      <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" /> Записаться онлайн
    </a>
  );

  return (
    <section id="about" className="bg-background py-6 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-[0.48fr_0.52fr] items-start gap-3 px-3 md:grid-cols-1 md:gap-8 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant md:rounded-[2rem]">
            <img
              src={aboutImg}
              alt="Маникюр в Смоленске от мастера Изабеллы"
              width={1200}
              height={1500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden max-w-[240px] rounded-2xl border border-border bg-card px-5 py-4 shadow-card md:block">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              мастер
            </div>
            <div className="font-display text-xl leading-tight">
              {brand.masterFullName}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Смоленск · ул. 25-Сентября, 16
            </div>
          </div>

          <div className="mt-2 space-y-2 md:hidden">
            {statsBlock}
            {bookingButton}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary md:text-xs md:tracking-[0.25em]">
            О мастере
          </span>
          <h2 className="mt-1 mb-2 font-display text-[1.35rem] leading-tight md:mt-3 md:mb-6 md:text-5xl">
            Немного <span className="italic text-gradient-gold">обо мне</span>
          </h2>
          <div className="space-y-2 text-[11px] leading-snug text-foreground/85 md:space-y-4 md:text-base md:leading-relaxed">
            <p>
              Люблю чистый маникюр, аккуратную форму и дизайн, который выглядит
              стильно не только на фото, но и в жизни.
            </p>
            <p>
              Работаю с качественными материалами, соблюдаю стерильность и
              подбираю форму, длину и покрытие под твой образ жизни и вкус.
            </p>
            <p>
              Можно выбрать как спокойный минимализм, так и более выразительный
              дизайн - главное, чтобы результат был аккуратным и по-настоящему
              твоим.
            </p>
          </div>

          <div className="mt-8 hidden md:block">{statsBlock}</div>
          <div className="mt-8 hidden md:block">{bookingButton}</div>
        </div>
      </div>
    </section>
  );
}

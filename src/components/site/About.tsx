import aboutImg from "@/assets/about-izabella.jpg";
import { Sparkles } from "lucide-react";
import { brand } from "@/data/brand";

export function About() {
  return (
    <section id="about" className="py-12 md:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant">
            <img src={aboutImg} alt="Изабелла - мастер маникюра в Смоленске"
                 width={1200} height={1500} loading="lazy"
                 className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-card rounded-2xl px-5 py-4 shadow-card border border-border max-w-[240px]">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">мастер</div>
            <div className="font-display text-xl leading-tight">{brand.masterFullName}</div>
            <div className="text-xs text-muted-foreground mt-1">Смоленск · ул. 25-Сентября, 16</div>
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">О мастере</span>
          <h2 className="font-display text-3xl md:text-5xl mt-3 mb-6">
            Немного <span className="italic text-gradient-gold">обо мне</span>
          </h2>
          <div className="space-y-4 text-foreground/85 leading-relaxed">
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

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "5.0", v: "Рейтинг" },
              { k: "18+", v: "Отзывов" },
              { k: "100%", v: "Стерильность" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-cream/60 border border-border p-4 text-center">
                <div className="font-display text-2xl text-foreground">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>

          <a href={brand.bookingUrl}
             className="inline-flex items-center gap-2 mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Sparkles className="h-4 w-4" /> Записаться онлайн
          </a>
        </div>
      </div>
    </section>
  );
}

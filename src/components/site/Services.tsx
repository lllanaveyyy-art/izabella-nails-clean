import { Clock, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { brand } from "@/data/brand";

export function Services() {
  return (
    <section id="services" className="py-12 md:py-16 bg-cream/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Услуги</span>
          <h2 className="font-display text-3xl md:text-5xl mt-3 mb-4">
            Прайс-лист <span className="italic text-gradient-gold">студии</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Полный спектр услуг - от классического ухода до наращивания и
            трендовых дизайнов. Все цены окончательные, без скрытых доплат.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.id}
              data-service-id={s.id}
              data-service-duration={s.durationMinutes}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                  <Clock className="h-3 w-3" /> {s.duration}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.category === "extension" ? "Наращивание" : "Маникюр"}
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl leading-tight mb-3">
                {s.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {s.description}
              </p>

              <div className="flex items-end justify-between pt-5 border-t border-border">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-0.5">
                    Стоимость
                  </div>
                  <div className="font-display text-2xl text-foreground">{s.price}</div>
                </div>
                <a
                  href={brand.bookingUrl}
                  data-cta="service-book"
                  data-service-id={s.id}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                >
                  Записаться
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

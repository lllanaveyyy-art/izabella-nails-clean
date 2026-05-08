import { Clock, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { brand } from "@/data/brand";

export function Services() {
  return (
    <section id="services" className="bg-cream/40 py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 max-w-2xl md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Услуги</span>
          <h2 className="mt-2 mb-3 font-display text-2xl md:mt-3 md:mb-4 md:text-5xl">
            Прайс-лист <span className="italic text-gradient-gold">студии</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Полный спектр услуг - от классического ухода до наращивания и
            трендовых дизайнов. Все цены окончательные, без скрытых доплат.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              data-service-id={s.id}
              data-service-duration={s.durationMinutes}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant md:p-7"
            >
              <div className="mb-4 flex items-start justify-between gap-3 md:mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                  <Clock className="h-3 w-3" /> {s.duration}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.category === "extension" ? "Наращивание" : "Маникюр"}
                </span>
              </div>

              <h3 className="mb-2 font-display text-lg leading-tight md:mb-3 md:text-2xl">
                {s.name}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground md:mb-6">
                {s.description}
              </p>

              <div className="flex items-end justify-between border-t border-border pt-4 md:pt-5">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-0.5">
                    Стоимость
                  </div>
                  <div className="font-display text-xl text-foreground md:text-2xl">{s.price}</div>
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

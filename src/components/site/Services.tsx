import { Clock, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { brand } from "@/data/brand";

export function Services() {
  return (
    <section id="services" className="bg-cream/40 py-6 md:py-16">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="mb-4 max-w-2xl md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">Услуги</span>
          <h2 className="mt-2 mb-3 font-display text-xl md:mt-3 md:mb-4 md:text-5xl">
            Прайс-лист <span className="italic text-gradient-gold">студии</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Полный спектр услуг - от классического ухода до наращивания и
            трендовых дизайнов. Все цены окончательные, без скрытых доплат.
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-1.5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              data-service-id={s.id}
              data-service-name={s.name}
              data-service-duration={s.durationMinutes}
              className="group relative flex h-full min-h-[158px] flex-col rounded-xl border border-border bg-card p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant md:min-h-0 md:rounded-3xl md:p-7"
            >
              <div className="mb-1.5 flex items-start justify-between gap-1.5 md:mb-5 md:gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-1 py-0.5 text-[8px] leading-none text-muted-foreground md:gap-1.5 md:px-3 md:py-1 md:text-xs">
                  <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" /> {s.duration}
                </span>
                <span className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
                  {s.category === "extension" ? "Наращивание" : "Маникюр"}
                </span>
              </div>

              <h3 className="mb-2 min-h-[2.65rem] font-display text-[15.5px] font-semibold leading-[1.08] text-foreground md:mb-3 md:min-h-0 md:text-2xl md:font-normal">
                {s.name}
              </h3>
              <p className="mb-3 flex-1 overflow-hidden text-[11px] leading-snug text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:mb-6 md:block md:text-sm md:leading-relaxed">
                {s.description}
              </p>

              <div className="mt-auto flex items-end justify-between gap-2.5 border-t border-border pt-2.5 md:pt-5">
                <div>
                  <div className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:inline mb-0.5">
                    Стоимость
                  </div>
                  <div className="whitespace-nowrap font-display text-base text-foreground md:text-2xl">{s.price}</div>
                </div>
                <a
                  href={brand.bookingUrl}
                  data-cta="booking"
                  data-service-id={s.id}
                  data-service-name={s.name}
                  data-service-price={s.price}
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-primary/15 bg-rose-soft/70 px-1.5 py-1 text-[10px] font-medium text-primary transition-all hover:bg-rose-soft md:gap-1.5 md:text-sm md:hover:gap-2.5"
                >
                  Записаться
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

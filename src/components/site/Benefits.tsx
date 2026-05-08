import { Shield, Gem, Sparkles, Heart, CalendarCheck, Clock3 } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Стерильность", text: "Полная обработка инструментов после каждого клиента." },
  { icon: Gem, title: "Качественные материалы", text: "Аккуратная работа и хорошие материалы для комфортной носки." },
  { icon: Sparkles, title: "Чистый маникюр", text: "Ровная форма, аккуратная кутикула и покрытие до самого края." },
  { icon: Clock3, title: "Носибельный результат", text: "Маникюр выглядит аккуратно и спокойно носится в среднем 3–4 недели." },
  { icon: Heart, title: "Приём в салоне", text: "Приём проходит в салоне в Смоленске, не на случайной точке." },
  { icon: CalendarCheck, title: "Удобная запись", text: "Можно записаться на сайте, через Telegram или VK – как удобно." },
];

export function Benefits() {
  return (
    <section className="bg-background py-5 md:py-16">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="grid grid-cols-2 gap-1.5 md:gap-4 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-2.5 transition-shadow hover:shadow-soft md:rounded-2xl md:p-6">
              <div className="mb-1.5 flex items-center gap-1.5 md:mb-4 md:block">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-soft md:h-11 md:w-11 md:rounded-xl">
                  <Icon className="h-3.5 w-3.5 text-primary md:h-5 md:w-5" />
                </div>
                <h3 className="font-display text-[13px] leading-tight md:mt-3 md:text-lg">{title}</h3>
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground md:text-sm md:leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

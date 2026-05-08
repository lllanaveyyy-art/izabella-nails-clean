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
    <section className="bg-background py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-soft md:p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-soft md:mb-4 md:h-11 md:w-11">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 font-display text-base md:mb-1.5 md:text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

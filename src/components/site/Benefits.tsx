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
    <section className="py-12 md:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-soft transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-rose-soft flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

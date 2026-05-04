import { MapPin, Send } from "lucide-react";
import { brand } from "@/data/brand";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-2xl">
            Izabella <span className="text-gradient-gold">Nails</span>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-background/60 mt-1">
            {brand.tagline}
          </div>
          <p className="text-sm text-background/70 mt-5 leading-relaxed max-w-xs">
            Маникюр в Смоленске: чистая работа, аккуратная форма, качественные
            материалы и удобная запись онлайн.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-background/60 mb-4">Навигация</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-background transition-colors">Услуги</a></li>
            <li><a href="#portfolio" className="hover:text-background transition-colors">Работы</a></li>
            <li><a href="#reviews" className="hover:text-background transition-colors">Отзывы</a></li>
            <li><a href="#about" className="hover:text-background transition-colors">О мастере</a></li>
            <li><a href="#booking" className="hover:text-background transition-colors">Записаться</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-background/60 mb-4">Контакты</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-rose" />
              <span>{brand.city}, {brand.address}</span>
            </li>
            <li>
              <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
                 className="inline-flex items-center gap-2 hover:text-background transition-colors">
                <Send className="h-4 w-4" /> Telegram: @izabellanails
              </a>
            </li>
            <li>
              <a href={brand.vk} target="_blank" rel="noreferrer noopener"
                 className="inline-flex items-center gap-2 hover:text-background transition-colors">
                <span className="font-bold text-xs">VK</span> vk.ru/nytiiiii
              </a>
            </li>
            <li>
              <a href={brand.bookingUrl}
                 className="inline-flex items-center gap-2 hover:text-background transition-colors">
                Онлайн-запись
              </a>
            </li>
          </ul>

          <a href={brand.bookingUrl}
             className="inline-flex items-center mt-6 rounded-full bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90">
            Записаться онлайн
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-background/50 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Izabella Nails · Смоленск</span>
          <span>Маникюр · Наращивание · Дизайн</span>
        </div>
      </div>
    </footer>
  );
}

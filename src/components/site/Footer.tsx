import { MapPin, Send } from "lucide-react";
import { brand } from "@/data/brand";
import { trackGoal } from "@/components/YandexMetrika";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="mx-auto grid max-w-7xl gap-5 px-3 py-6 md:grid-cols-3 md:gap-10 md:px-6 md:py-14">
        <div>
          <div className="font-display text-xl md:text-2xl">
            Izabella <span className="text-gradient-gold">Nails</span>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-background/60 mt-1">
            {brand.tagline}
          </div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-background/70 md:mt-5">
            Маникюр в Смоленске: чистая работа, аккуратная форма, качественные
            материалы и удобная запись онлайн.
          </p>
        </div>

        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-background/60 md:mb-4">Навигация</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-background transition-colors">Услуги</a></li>
            <li><a href="#portfolio" className="hover:text-background transition-colors">Работы</a></li>
            <li><a href="#reviews" className="hover:text-background transition-colors">Отзывы</a></li>
            <li><a href="#about" className="hover:text-background transition-colors">О мастере</a></li>
            <li><a href="#booking" className="hover:text-background transition-colors">Записаться</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-background/60 md:mb-4">Контакты</div>
          <ul className="space-y-1.5 text-sm md:space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-rose" />
              <span>{brand.city}, {brand.address}</span>
            </li>
            <li>
              <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
                 data-cta="telegram"
                 onClick={() => trackGoal("telegram_click")}
                 className="inline-flex items-center gap-2 hover:text-background transition-colors">
                <Send className="h-4 w-4" /> Telegram: @izabellanails
              </a>
            </li>
            <li>
              <a href={brand.vk} target="_blank" rel="noreferrer noopener"
                 data-cta="vk"
                 onClick={() => trackGoal("vk_click")}
                 className="inline-flex items-center gap-2 hover:text-background transition-colors">
                <span className="font-bold text-xs">VK</span> vk.ru/nytiiiii
              </a>
            </li>
          </ul>

          <a href={brand.bookingUrl}
             data-cta="booking"
             className="mt-3 inline-flex items-center rounded-full bg-background px-3 py-2 text-xs md:text-sm font-medium text-foreground hover:opacity-90 md:mt-6 md:px-5 md:py-2.5">
            Записаться онлайн
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-3 text-xs text-background/50 md:px-6 md:py-5">
          <span>© {new Date().getFullYear()} Izabella Nails · Смоленск</span>
          <span>Маникюр в Смоленске · 25 Сентября, 16 · гель-лак · укрепление · наращивание · дизайн</span>
        </div>
      </div>
    </footer>
  );
}

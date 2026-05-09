import { Send } from "lucide-react";
import { brand } from "@/data/brand";
import { trackGoal } from "@/components/YandexMetrika";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4 lg:gap-4">
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-display text-lg tracking-tight text-foreground md:text-2xl">
            Izabella <span className="text-gradient-gold">Nails</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:text-[11px] md:tracking-[0.2em]">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/80">
          <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">Работы</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
          <a href="#about" className="hover:text-primary transition-colors">О мастере</a>
          <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
             aria-label="Telegram"
             data-cta="telegram"
             onClick={() => trackGoal("telegram_click")}
             className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-rose-soft transition-colors">
            <Send className="h-4 w-4" />
          </a>
          <a href={brand.vk} target="_blank" rel="noreferrer noopener"
             aria-label="VK"
             data-cta="vk"
             onClick={() => trackGoal("vk_click")}
             className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-rose-soft transition-colors text-xs font-semibold">
            VK
          </a>
          <a href={brand.bookingUrl}
             data-cta="booking"
             className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90 md:px-5 md:py-2.5 md:text-sm">
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}

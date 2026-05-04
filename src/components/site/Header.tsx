import { Send } from "lucide-react";
import { brand } from "@/data/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-display text-xl md:text-2xl tracking-tight text-foreground">
            Izabella <span className="text-gradient-gold">Nails</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/80">
          <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">Работы</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
          <a href="#about" className="hover:text-primary transition-colors">О мастере</a>
          <a href="#booking" className="hover:text-primary transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
             aria-label="Telegram"
             className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-rose-soft transition-colors">
            <Send className="h-4 w-4" />
          </a>
          <a href={brand.vk} target="_blank" rel="noreferrer noopener"
             aria-label="VK"
             className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-rose-soft transition-colors text-xs font-semibold">
            VK
          </a>
          <a href={brand.bookingUrl}
             data-cta="header-booking"
             className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity">
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}

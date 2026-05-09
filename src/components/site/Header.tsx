import { Send } from "lucide-react";
import { brand } from "@/data/brand";
import { trackGoal } from "@/components/YandexMetrika";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 md:px-6 md:py-4 lg:gap-4">
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-display text-base tracking-tight text-foreground md:text-2xl">
            Izabella <span className="text-gradient-gold">Nails</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.12em] text-muted-foreground md:text-[11px] md:tracking-[0.2em]">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/80">
          <a href="#services" className="hover:text-primary transition-colors">
            Услуги
          </a>
          <a href="#portfolio" className="hover:text-primary transition-colors">
            Работы
          </a>
          <a href="#reviews" className="hover:text-primary transition-colors">
            Отзывы
          </a>
          <a href="#about" className="hover:text-primary transition-colors">
            О мастере
          </a>
          <a href="#contacts" className="hover:text-primary transition-colors">
            Контакты
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={brand.telegram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Telegram"
            data-cta="telegram"
            onClick={() => trackGoal("telegram_click")}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card/70 transition-colors hover:bg-rose-soft sm:h-9 sm:w-9 sm:bg-transparent"
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          <a
            href={brand.vk}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="VK"
            data-cta="vk"
            onClick={() => trackGoal("vk_click")}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card/70 text-[9px] font-semibold transition-colors hover:bg-rose-soft sm:h-9 sm:w-9 sm:bg-transparent sm:text-xs"
          >
            VK
          </a>
          <a
            href={brand.bookingUrl}
            data-cta="booking"
            className="inline-flex items-center rounded-full bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90 md:px-5 md:py-2.5 md:text-sm"
          >
            Записаться
          </a>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl gap-0.5 overflow-x-auto whitespace-nowrap px-3 pb-2 text-[10px] text-foreground/75 [scrollbar-width:none] md:px-6 lg:hidden [&::-webkit-scrollbar]:hidden">
        <a
          href="#services"
          className="rounded-full border border-border bg-card/60 px-2 py-1 transition-colors hover:text-primary"
        >
          Услуги
        </a>
        <a
          href="#portfolio"
          className="rounded-full border border-border bg-card/60 px-2 py-1 transition-colors hover:text-primary"
        >
          Работы
        </a>
        <a
          href="#reviews"
          className="rounded-full border border-border bg-card/60 px-2 py-1 transition-colors hover:text-primary"
        >
          Отзывы
        </a>
        <a
          href="#about"
          className="rounded-full border border-border bg-card/60 px-2 py-1 transition-colors hover:text-primary"
        >
          Мастер
        </a>
        <a
          href="#contacts"
          className="rounded-full border border-border bg-card/60 px-2 py-1 transition-colors hover:text-primary"
        >
          Карта
        </a>
      </nav>
    </header>
  );
}

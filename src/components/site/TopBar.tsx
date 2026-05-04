import { MapPin, Send } from "lucide-react";
import { brand } from "@/data/brand";

export function TopBar() {
  return (
    <div className="hidden md:block border-b border-border/60 bg-cream/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {brand.city} · {brand.address}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href={brand.telegram} target="_blank" rel="noreferrer noopener"
             className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Send className="h-3.5 w-3.5" /> Telegram
          </a>
          <a href={brand.vk} target="_blank" rel="noreferrer noopener"
             className="hover:text-primary transition-colors">
            VK
          </a>
          <a href={brand.bookingUrl} data-cta="booking-online" className="text-primary font-medium hover:underline">
            Записаться онлайн →
          </a>
        </div>
      </div>
    </div>
  );
}

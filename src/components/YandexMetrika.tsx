import { useEffect } from "react";

export const YANDEX_METRIKA_COUNTER_ID = 109115374;

export type MetrikaGoal =
  | "booking_click"
  | "telegram_click"
  | "vk_click"
  | "map_click"
  | "service_click"
  | "portfolio_open"
  | "dikidi_open"
  | "route_click";

export function trackGoal(goalName: MetrikaGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;

  window.ym(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goalName, params);
}

export function YandexMetrika() {
  useEffect(() => {
    if (window.ym) {
      return;
    }

    window.ym =
      window.ym ||
      function (...args: unknown[]) {
        (window.ym!.a = window.ym!.a || []).push(args);
      };
    window.ym.l = Date.now();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);

    window.ym(YANDEX_METRIKA_COUNTER_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, []);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_COUNTER_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}

declare global {
  interface Window {
    ym?: {
      (...args: unknown[]): void;
      a?: unknown[];
      l?: number;
    };
  }
}

import { useEffect } from "react";

const COUNTER_ID = 109115374;

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

    window.ym(COUNTER_ID, "init", {
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
          src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
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

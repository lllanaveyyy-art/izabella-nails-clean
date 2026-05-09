import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Izabella Nails - маникюр в Смоленске на ул. 25 Сентября" },
      {
        name: "description",
        content:
          "Маникюр в Смоленске у Изабеллы: гель-лак, укрепление, наращивание и дизайн ногтей. Адрес: ул. 25 Сентября, 16. Онлайн-запись на удобное время.",
      },
      { name: "robots", content: "index,follow" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' data:; frame-src https://yandex.ru https://*.yandex.ru; base-uri 'self'; form-action 'self'; object-src 'none'",
      },
      { property: "og:title", content: "Izabella Nails - маникюр в Смоленске на ул. 25 Сентября" },
      {
        property: "og:description",
        content:
          "Маникюр в Смоленске у Изабеллы: гель-лак, укрепление, наращивание и дизайн ногтей. Адрес: ул. 25 Сентября, 16. Онлайн-запись на удобное время.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://izabellanails.vercel.app/" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Izabella Nails - маникюр в Смоленске на ул. 25 Сентября" },
      {
        name: "twitter:description",
        content:
          "Маникюр в Смоленске: покрытие гель-лаком, укрепление, наращивание и дизайн ногтей. Izabella Nails, ул. 25 Сентября, 16.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://izabellanails.vercel.app/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

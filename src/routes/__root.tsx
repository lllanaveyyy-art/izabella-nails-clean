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
      { title: "Маникюр в Смоленске недорого - Izabella Nails" },
      {
        name: "description",
        content:
          "Недорогой маникюр, гель-лак, укрепление и наращивание ногтей в Промышленном районе Смоленска. Ул. 25 Сентября, рядом с Медгородком.",
      },
      { name: "robots", content: "index,follow" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' data:; frame-src https://yandex.ru https://*.yandex.ru; base-uri 'self'; form-action 'self'; object-src 'none'",
      },
      { property: "og:title", content: "Маникюр в Смоленске недорого - Izabella Nails" },
      {
        property: "og:description",
        content:
          "Недорогой маникюр, гель-лак, укрепление и наращивание ногтей в Промышленном районе Смоленска. Ул. 25 Сентября, рядом с Медгородком.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://izabellanails.vercel.app/" },
      { property: "og:image", content: "https://izabellanails.vercel.app/og-image.png" },
      { property: "og:image:alt", content: "Izabella Nails" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Маникюр в Смоленске недорого - Izabella Nails" },
      {
        name: "twitter:description",
        content:
          "Недорогой маникюр, гель-лак, укрепление и наращивание ногтей в Промышленном районе Смоленска. Ул. 25 Сентября, рядом с Медгородком.",
      },
      {
        name: "twitter:image",
        content: "https://izabellanails.vercel.app/og-image.png",
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
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
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

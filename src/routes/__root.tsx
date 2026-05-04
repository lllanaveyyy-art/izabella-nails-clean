import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import favicon from "../assets/favicon.svg?url";

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
      { title: "Izabella Nails - Маникюр в Смоленске" },
      { name: "description", content: "Izabella Nails Studio: a premium website for a nail master in Smolensk." },
      { name: "author", content: "Lovable" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' data:; frame-src https://yandex.ru https://*.yandex.ru; base-uri 'self'; form-action 'self'; object-src 'none'",
      },
      { property: "og:title", content: "Izabella Nails | Маникюр | Смоленск" },
      { property: "og:description", content: "Izabella Nails Studio: a premium website for a nail master in Smolensk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Izabella Nails | Маникюр | Смоленск" },
      { name: "twitter:description", content: "Izabella Nails Studio: a premium website for a nail master in Smolensk." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a77c2631-b9f8-43bd-83c4-939c21a4304c/id-preview-678c6ccf--8c82ff9d-3117-4ceb-a7ec-f4713c855235.lovable.app-1777300962371.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a77c2631-b9f8-43bd-83c4-939c21a4304c/id-preview-678c6ccf--8c82ff9d-3117-4ceb-a7ec-f4713c855235.lovable.app-1777300962371.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: favicon,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

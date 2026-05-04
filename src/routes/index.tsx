import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Reviews } from "@/components/site/Reviews";
import { About } from "@/components/site/About";
import { Booking } from "@/components/site/Booking";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Izabella Nails — Маникюр в Смоленске | ул. 25-Сентября, 16" },
      {
        name: "description",
        content:
          "Премиум-маникюр в Смоленске от мастера Изабеллы. Классический и аппаратный маникюр, гель-лак, укрепление, наращивание. Стерильность, качественные материалы, онлайн-запись.",
      },
      { property: "og:title", content: "Izabella Nails | Маникюр | Смоленск" },
      {
        property: "og:description",
        content:
          "Чистый маникюр и трендовые дизайны от Изабеллы. Смоленск, ул. 25-Сентября, 16. Онлайн-запись.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <Portfolio />
        <Reviews />
        <About />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

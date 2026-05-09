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
      { title: "Izabella Nails - маникюр в Смоленске на ул. 25 Сентября" },
      {
        name: "description",
        content:
          "Маникюр в Смоленске у Изабеллы: гель-лак, укрепление, наращивание и дизайн ногтей. Адрес: ул. 25 Сентября, 16. Онлайн-запись на удобное время.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Izabella Nails - маникюр в Смоленске на ул. 25 Сентября" },
      {
        property: "og:description",
        content:
          "Маникюр в Смоленске у Изабеллы: гель-лак, укрепление, наращивание и дизайн ногтей. Адрес: ул. 25 Сентября, 16. Онлайн-запись на удобное время.",
      },
      { property: "og:url", content: "https://izabellanails.vercel.app/" },
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
        <Portfolio />
        <Services />
        <About />
        <Benefits />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

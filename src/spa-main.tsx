import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TopBar } from '@/components/site/TopBar';
import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { Benefits } from '@/components/site/Benefits';
import { Services } from '@/components/site/Services';
import { Portfolio } from '@/components/site/Portfolio';
import { Reviews } from '@/components/site/Reviews';
import { About } from '@/components/site/About';
import { Booking } from '@/components/site/Booking';
import { Footer } from '@/components/site/Footer';
import '@/styles.css';

function App() {
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

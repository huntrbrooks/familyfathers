import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Process />
      <About />
      <Pricing />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}

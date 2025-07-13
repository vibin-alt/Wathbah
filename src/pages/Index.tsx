import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { ProductSection } from "@/components/ProductSection";
import { CartSection } from "@/components/CartSection";
import { BookingSection } from "@/components/BookingSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <AboutSection />
        <NewArrivalsSection />
        <ProductSection />
        <CartSection />
        <BookingSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;

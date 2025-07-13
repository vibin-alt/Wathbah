import { Button } from "@/components/ui/button";
import { ChevronDown, Car, Wrench, Shield } from "lucide-react";
import heroImage from "@/assets/hero-automotive.jpg";

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium automotive spare parts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 animate-slide-in">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
              Al Wathbah Auto New Spare Parts TR LLC
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Original & Aftermarket
            </span>
            <br />
            <span className="text-foreground">German Car Parts</span>
            <br />
            <span className="text-accent">in the UAE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium quality spare parts for BMW, Mercedes-Benz, Audi & Volkswagen. 
            Professional service with fast delivery across Sharjah and Ajman.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-slide-in">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Expert Installation</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Car className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection("products")}
              className="group"
            >
              Shop Now
              <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">Discover More</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
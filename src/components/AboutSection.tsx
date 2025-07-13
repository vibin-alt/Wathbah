import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Award, Users, Truck, Phone } from "lucide-react";

export const AboutSection = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Strategic Locations",
      description: "Based in Sharjah and Ajman for convenient access",
    },
    {
      icon: Award,
      title: "Years of Expertise",
      description: "Specialized in German automotive excellence",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery across the UAE",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional consultation and installation services",
    },
    {
      icon: Clock,
      title: "Quality Service",
      description: "Professional packaging and handling of all parts",
    },
    {
      icon: Phone,
      title: "Customer Support",
      description: "Dedicated support for all your automotive needs",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Al Wathbah Auto</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Al Wathbah Auto New Spare Parts TR LLC is your trusted partner for premium 
            German automotive parts in the UAE. We specialize in providing both original 
            and high-quality aftermarket parts for BMW, Mercedes-Benz, Audi, and Volkswagen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To provide UAE's automotive enthusiasts with premium German car parts, 
              backed by expert knowledge and exceptional service. We understand the 
              precision engineering that goes into German vehicles and ensure every 
              part meets those exact standards.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Original & Aftermarket Parts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">BMW, Mercedes-Benz, Audi, Volkswagen</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Professional Installation Service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">UAE-Wide Delivery Network</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {highlights.map((highlight, index) => (
              <Card key={index} className="group hover:shadow-automotive transition-all duration-300 border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <highlight.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-metal rounded-xl p-8 shadow-precision animate-fade-in">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Why Choose Al Wathbah Auto?
          </h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            With years of experience in the German automotive industry, we've built our reputation 
            on quality, reliability, and customer satisfaction. Our strategic locations in Sharjah 
            and Ajman allow us to serve customers across the UAE with fast, professional service.
          </p>
        </div>
      </div>
    </section>
  );
};
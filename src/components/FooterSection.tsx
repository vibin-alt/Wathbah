import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin,
  Car,
  Send,
  ExternalLink
} from "lucide-react";

export const FooterSection = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Gallery", href: "#gallery" },
    { name: "Book Service", href: "#booking" },
  ];

  const services = [
    "BMW Parts & Service",
    "Mercedes-Benz Parts",
    "Audi Components", 
    "Volkswagen Parts",
    "Engine Repair",
    "Brake Service",
    "Transmission Service",
    "Electrical Systems"
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 pt-20 pb-8 border-t border-border/20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6 animate-slide-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Al Wathbah Auto</h3>
                <p className="text-sm text-muted-foreground">German Car Specialists</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for premium German automotive parts in the UAE. 
              Specializing in BMW, Mercedes-Benz, Audi, and Volkswagen with 
              professional service and fast delivery.
            </p>
            
            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Follow Us</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 animate-slide-in">
            <h3 className="font-bold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-3">Our Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 4).map((service, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in">
            <h3 className="font-bold text-lg text-foreground">Contact Info</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Main Workshop</p>
                  <p className="text-sm text-muted-foreground">
                    Industrial Area 2<br />
                    Sharjah, UAE
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">+971 6 123 4567</p>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">info@alwathbaauto.ae</p>
                  <p className="text-sm text-muted-foreground">General Inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Working Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9AM-7PM<br />
                    Sat: 9AM-5PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 animate-slide-in">
            <h3 className="font-bold text-lg text-foreground">Stay Updated</h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Subscribe to our newsletter for the latest updates on new products, 
              special offers, and automotive tips.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="bg-background/50"
                required
              />
              <Button type="submit" variant="automotive" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            
            <div className="bg-gradient-metal rounded-lg p-4 border border-border/30">
              <h4 className="font-semibold text-foreground mb-2">Need Parts Now?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Call us for urgent part requirements
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-border/30" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-6">
            <p>&copy; 2024 Al Wathbah Auto New Spare Parts TR LLC. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Warranty</a>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">
              German Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
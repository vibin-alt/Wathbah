import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Car, Menu, Phone, Mail, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Gallery", href: "#gallery" },
    { name: "Book Service", href: "#booking" },
    { name: "Cart", href: "#cart" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-automotive border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">Al Wathbah Auto</h1>
              <p className="text-xs text-muted-foreground">German Car Specialists</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.replace("#", ""))}
                className="text-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+971 6 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@alwathbaauto.ae</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => scrollToSection("cart")}
              className="mr-2 relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {getCartItemsCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="automotive" 
              size="sm"
              onClick={() => scrollToSection("booking")}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => scrollToSection("cart")}
              className="hidden sm:flex relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {getCartItemsCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="automotive" 
              size="sm"
              onClick={() => scrollToSection("booking")}
              className="hidden sm:flex"
            >
              Book Now
            </Button>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-foreground">Al Wathbah Auto</h1>
                      <p className="text-xs text-muted-foreground">German Car Specialists</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-4 mb-8">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href.replace("#", ""))}
                        className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="space-y-4 mt-auto">
                    <div className="space-y-3 p-4 bg-gradient-metal rounded-lg">
                      <h3 className="font-semibold text-foreground">Contact Us</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+971 6 123 4567</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>info@alwathbaauto.ae</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 relative"
                        onClick={() => scrollToSection("cart")}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cart
                        {getCartItemsCount() > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                          >
                            {getCartItemsCount()}
                          </Badge>
                        )}
                      </Button>
                    </div>
                    
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => scrollToSection("booking")}
                    >
                      Book Service Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
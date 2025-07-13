import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Clock, Zap } from "lucide-react";
import productsImage from "@/assets/products-showcase.jpg";

interface NewArrival {
  id: number;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  description: string;
  category: string;
}

const newArrivals: NewArrival[] = [
  {
    id: 1,
    name: "Advanced Brake Disc Set",
    brand: "BMW",
    originalPrice: 450,
    salePrice: 389,
    discount: 14,
    image: productsImage,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    description: "High-performance brake discs with enhanced cooling",
    category: "Brakes"
  },
  {
    id: 2,
    name: "Turbo Oil Filter Kit",
    brand: "Mercedes",
    originalPrice: 85,
    salePrice: 75,
    discount: 12,
    image: productsImage,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    description: "Premium filtration for turbocharged engines",
    category: "Engine"
  },
  {
    id: 3,
    name: "LED Headlight Assembly",
    brand: "Audi",
    originalPrice: 750,
    salePrice: 650,
    discount: 13,
    image: productsImage,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    description: "Matrix LED technology with adaptive lighting",
    category: "Electrical"
  },
  {
    id: 4,
    name: "Performance Air Filter",
    brand: "Volkswagen",
    originalPrice: 120,
    salePrice: 99,
    discount: 18,
    image: productsImage,
    isNew: true,
    isBestSeller: true,
    rating: 4.6,
    description: "High-flow air filter for increased performance",
    category: "Engine"
  },
  {
    id: 5,
    name: "Adaptive Suspension Kit",
    brand: "BMW",
    originalPrice: 1200,
    salePrice: 1050,
    discount: 13,
    image: productsImage,
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    description: "Electronic damping control system",
    category: "Suspension"
  },
  {
    id: 6,
    name: "Smart Transmission Mount",
    brand: "Mercedes",
    originalPrice: 280,
    salePrice: 240,
    discount: 14,
    image: productsImage,
    isNew: true,
    isBestSeller: false,
    rating: 4.5,
    description: "Intelligent vibration dampening technology",
    category: "Transmission"
  }
];

export const NewArrivalsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;
  const totalSlides = Math.ceil(newArrivals.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerPage;
    return newArrivals.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "fill-accent text-accent" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section id="new-arrivals" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-accent" />
            <span className="text-sm uppercase tracking-widest text-accent font-semibold">
              Just Arrived
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            New <span className="bg-gradient-primary bg-clip-text text-transparent">Arrivals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the latest premium German automotive parts with exclusive launch discounts
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8 animate-slide-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCurrentItems().map((item) => (
              <Card key={item.id} className="group hover:shadow-automotive transition-all duration-300 border-border/50 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isNew && (
                      <Badge className="bg-accent text-accent-foreground">
                        NEW
                      </Badge>
                    )}
                    {item.isBestSeller && (
                      <Badge className="bg-gradient-primary">
                        Best Seller
                      </Badge>
                    )}
                  </div>
                  
                  {/* Discount */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive" className="bg-red-500">
                      -{item.discount}%
                    </Badge>
                  </div>

                  {/* Quick Add Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" size="sm" className="bg-white/90 text-black hover:bg-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.brand}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({item.rating})
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        AED {item.salePrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        AED {item.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="automotive">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 border-border/50 hover:bg-background shadow-automotive"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 border-border/50 hover:bg-background shadow-automotive"
                onClick={nextSlide}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Special Offers Banner */}
        <div className="bg-gradient-metal rounded-xl p-8 shadow-precision animate-fade-in">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Limited Time</h3>
              <p className="text-sm text-muted-foreground">
                Special launch pricing valid for 30 days only
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Free Installation</h3>
              <p className="text-sm text-muted-foreground">
                Professional installation included with new arrivals
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                2-year warranty on all new arrival products
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
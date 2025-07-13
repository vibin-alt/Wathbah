import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter, Car } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import productsImage from "@/assets/products-showcase.jpg";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

const mockProducts: Product[] = [
  { id: 1, name: "Brake Pads Set", brand: "BMW", category: "Brakes", price: 299, image: productsImage, inStock: true },
  { id: 2, name: "Oil Filter", brand: "Mercedes", category: "Engine", price: 45, image: productsImage, inStock: true },
  { id: 3, name: "Transmission Mount", brand: "Audi", category: "Transmission", price: 189, image: productsImage, inStock: false },
  { id: 4, name: "Headlight Assembly", brand: "Volkswagen", category: "Electrical", price: 459, image: productsImage, inStock: true },
  { id: 5, name: "Fuel Pump", brand: "BMW", category: "Engine", price: 679, image: productsImage, inStock: true },
  { id: 6, name: "Suspension Strut", brand: "Mercedes", category: "Suspension", price: 389, image: productsImage, inStock: true },
];

const categories = ["All", "Engine", "Brakes", "Transmission", "Electrical", "Suspension"];
const brands = ["All", "BMW", "Mercedes", "Audi", "Volkswagen"];

export const ProductSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image_url: product.image,
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <section id="products" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium German automotive parts for BMW, Mercedes-Benz, Audi, and Volkswagen
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-12 border border-border/50 animate-slide-in">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for parts or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Category:</span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Brand:</span>
                {brands.map((brand) => (
                  <Button
                    key={brand}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-automotive transition-all duration-300 border-border/50 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-gradient-metal">
                    {product.brand}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-2xl font-bold text-primary">
                    AED {product.price}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  className="w-full" 
                  variant={product.inStock ? "automotive" : "outline"}
                  disabled={!product.inStock}
                  onClick={() => product.inStock && handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};
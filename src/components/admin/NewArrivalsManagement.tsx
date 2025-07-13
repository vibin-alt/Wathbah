import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Star } from "lucide-react";

interface NewArrival {
  id: string;
  product_id: string;
  original_price: number;
  sale_price: number;
  discount_percentage: number;
  is_featured: boolean;
  is_best_seller: boolean;
  rating: number;
  arrival_date: string;
  products?: {
    name: string;
    image_url: string;
    brands?: { name: string };
    categories?: { name: string };
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  brands?: { name: string };
  categories?: { name: string };
}

interface NewArrivalsManagementProps {
  onStatsUpdate: () => void;
}

export const NewArrivalsManagement = ({ onStatsUpdate }: NewArrivalsManagementProps) => {
  const [newArrivals, setNewArrivals] = useState<NewArrival[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArrival, setEditingArrival] = useState<NewArrival | null>(null);
  const [formData, setFormData] = useState({
    product_id: "",
    original_price: "",
    sale_price: "",
    discount_percentage: "",
    is_featured: false,
    is_best_seller: false,
    rating: "",
    arrival_date: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [arrivalsResult, productsResult] = await Promise.all([
        supabase
          .from('new_arrivals')
          .select(`
            *,
            products(
              name,
              image_url,
              brands(name),
              categories(name)
            )
          `)
          .order('arrival_date', { ascending: false }),
        supabase
          .from('products')
          .select(`
            id,
            name,
            price,
            brands(name),
            categories(name)
          `)
          .order('name')
      ]);

      if (arrivalsResult.error) throw arrivalsResult.error;
      if (productsResult.error) throw productsResult.error;

      setNewArrivals(arrivalsResult.data || []);
      setProducts(productsResult.data || []);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      product_id: "",
      original_price: "",
      sale_price: "",
      discount_percentage: "",
      is_featured: false,
      is_best_seller: false,
      rating: "",
      arrival_date: new Date().toISOString().split('T')[0]
    });
    setEditingArrival(null);
  };

  const handleEdit = (arrival: NewArrival) => {
    setEditingArrival(arrival);
    setFormData({
      product_id: arrival.product_id,
      original_price: arrival.original_price?.toString() || "",
      sale_price: arrival.sale_price?.toString() || "",
      discount_percentage: arrival.discount_percentage?.toString() || "",
      is_featured: arrival.is_featured,
      is_best_seller: arrival.is_best_seller,
      rating: arrival.rating?.toString() || "",
      arrival_date: arrival.arrival_date.split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const originalPrice = parseFloat(formData.original_price);
      const salePrice = parseFloat(formData.sale_price);
      const discountPercentage = formData.discount_percentage 
        ? parseInt(formData.discount_percentage)
        : calculateDiscount(originalPrice, salePrice);

      const arrivalData = {
        product_id: formData.product_id,
        original_price: originalPrice || null,
        sale_price: salePrice || null,
        discount_percentage: discountPercentage || null,
        is_featured: formData.is_featured,
        is_best_seller: formData.is_best_seller,
        rating: parseFloat(formData.rating) || 0,
        arrival_date: new Date(formData.arrival_date).toISOString()
      };

      if (editingArrival) {
        const { error } = await supabase
          .from('new_arrivals')
          .update(arrivalData)
          .eq('id', editingArrival.id);

        if (error) throw error;

        toast({
          title: "New arrival updated successfully",
          description: "The new arrival has been updated."
        });
      } else {
        const { error } = await supabase
          .from('new_arrivals')
          .insert([arrivalData]);

        if (error) throw error;

        toast({
          title: "New arrival created successfully",
          description: "The new arrival has been added."
        });
      }

      await loadData();
      onStatsUpdate();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving new arrival:', error);
      toast({
        title: "Error saving new arrival",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (arrivalId: string) => {
    if (!confirm('Are you sure you want to remove this from new arrivals?')) return;

    try {
      const { error } = await supabase
        .from('new_arrivals')
        .delete()
        .eq('id', arrivalId);

      if (error) throw error;

      toast({
        title: "New arrival removed successfully",
        description: "The item has been removed from new arrivals."
      });

      await loadData();
      onStatsUpdate();
    } catch (error: any) {
      console.error('Error deleting new arrival:', error);
      toast({
        title: "Error removing new arrival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading && newArrivals.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading new arrivals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">New Arrivals Management</h2>
          <p className="text-muted-foreground">Manage featured new arrival products</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Arrival
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingArrival ? 'Edit New Arrival' : 'Add New Arrival'}
              </DialogTitle>
              <DialogDescription>
                {editingArrival ? 'Update the new arrival details' : 'Add a product to the new arrivals section'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select 
                  value={formData.product_id} 
                  onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.brands?.name} ({product.categories?.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price (AED)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sale_price">Sale Price (AED)</Label>
                  <Input
                    id="sale_price"
                    type="number"
                    step="0.01"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount_percentage">Discount %</Label>
                  <Input
                    id="discount_percentage"
                    type="number"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                    placeholder="Auto-calculated if empty"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="arrival_date">Arrival Date</Label>
                <Input
                  id="arrival_date"
                  type="date"
                  value={formData.arrival_date}
                  onChange={(e) => setFormData({ ...formData, arrival_date: e.target.value })}
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_best_seller"
                    checked={formData.is_best_seller}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_best_seller: checked })}
                  />
                  <Label htmlFor="is_best_seller">Best Seller</Label>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : editingArrival ? 'Update Arrival' : 'Add Arrival'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newArrivals.map((arrival) => (
          <Card key={arrival.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {arrival.products?.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    {arrival.products?.brands && (
                      <Badge variant="secondary">{arrival.products.brands.name}</Badge>
                    )}
                    {arrival.products?.categories && (
                      <Badge variant="outline">{arrival.products.categories.name}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {arrival.is_featured && <Badge className="text-xs">Featured</Badge>}
                  {arrival.is_best_seller && <Badge variant="destructive" className="text-xs">Best Seller</Badge>}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {arrival.products?.image_url && (
                <img 
                  src={arrival.products.image_url} 
                  alt={arrival.products.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {arrival.original_price && (
                      <span className="text-sm line-through text-muted-foreground">
                        AED {arrival.original_price}
                      </span>
                    )}
                    {arrival.sale_price && (
                      <span className="text-lg font-bold text-primary">
                        AED {arrival.sale_price}
                      </span>
                    )}
                  </div>
                  {arrival.discount_percentage && (
                    <Badge variant="destructive">{arrival.discount_percentage}% OFF</Badge>
                  )}
                </div>
                
                {arrival.rating > 0 && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < arrival.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      {arrival.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground">
                  Added: {new Date(arrival.arrival_date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(arrival)}
                  className="flex-1 gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDelete(arrival.id)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {newArrivals.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No new arrivals found</h3>
          <p className="text-muted-foreground mb-4">Start by adding products to the new arrivals section</p>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Arrival
          </Button>
        </div>
      )}
    </div>
  );
};
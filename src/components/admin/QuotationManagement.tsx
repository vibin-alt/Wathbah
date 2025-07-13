import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Eye, Edit, Calendar, DollarSign, User, Building } from "lucide-react";

interface QuotationItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Quotation {
  id: string;
  quotation_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company: string;
  total_amount: number;
  tax_amount: number;
  final_amount: number;
  status: string;
  notes: string;
  valid_until: string;
  created_at: string;
  updated_at: string;
  quotation_items?: QuotationItem[];
}

interface QuotationManagementProps {
  onStatsUpdate: () => void;
}

const statusColors = {
  pending: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  converted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
};

export const QuotationManagement = ({ onStatsUpdate }: QuotationManagementProps) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    try {
      const { data, error } = await supabase
        .from('quotations')
        .select(`
          *,
          quotation_items(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setQuotations(data || []);
    } catch (error: any) {
      console.error('Error loading quotations:', error);
      toast({
        title: "Error loading quotations",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuotationStatus = async (quotationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('quotations')
        .update({ status: newStatus })
        .eq('id', quotationId);

      if (error) throw error;

      toast({
        title: "Status updated successfully",
        description: `Quotation status changed to ${newStatus}.`
      });

      await loadQuotations();
      onStatsUpdate();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const viewQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsViewDialogOpen(true);
  };

  const filteredQuotations = quotations.filter(quotation => 
    statusFilter === "all" || quotation.status === statusFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quotations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Quotation Management</h2>
          <p className="text-muted-foreground">View and manage customer quotations</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredQuotations.map((quotation) => (
          <Card key={quotation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold">
                    {quotation.quotation_number}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {quotation.customer_name}
                    </span>
                    <span>{quotation.customer_email}</span>
                    {quotation.customer_company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {quotation.customer_company}
                      </span>
                    )}
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[quotation.status]}>
                    {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-semibold">AED {quotation.final_amount.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {new Date(quotation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {quotation.valid_until && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Valid Until</p>
                      <p className="font-medium">
                        {new Date(quotation.valid_until).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {quotation.quotation_items && quotation.quotation_items.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Items ({quotation.quotation_items.length})
                  </p>
                  <div className="space-y-1">
                    {quotation.quotation_items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.product_name} (x{item.quantity})</span>
                        <span>AED {item.total_price.toFixed(2)}</span>
                      </div>
                    ))}
                    {quotation.quotation_items.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        +{quotation.quotation_items.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => viewQuotation(quotation)}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                
                {quotation.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => updateQuotationStatus(quotation.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => updateQuotationStatus(quotation.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                
                {quotation.status === 'approved' && (
                  <Button 
                    size="sm" 
                    onClick={() => updateQuotationStatus(quotation.id, 'converted')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Mark as Converted
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotations.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No quotations found</h3>
          <p className="text-muted-foreground">
            {statusFilter === "all" 
              ? "No quotations have been created yet" 
              : `No quotations with status "${statusFilter}" found`}
          </p>
        </div>
      )}

      {/* Quotation Detail Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Quotation Details - {selectedQuotation?.quotation_number}
            </DialogTitle>
            <DialogDescription>
              View complete quotation information and items
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuotation && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {selectedQuotation.customer_name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedQuotation.customer_email}
                    </div>
                    {selectedQuotation.customer_phone && (
                      <div>
                        <span className="font-medium">Phone:</span> {selectedQuotation.customer_phone}
                      </div>
                    )}
                    {selectedQuotation.customer_company && (
                      <div>
                        <span className="font-medium">Company:</span> {selectedQuotation.customer_company}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quotation Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      <Badge className={statusColors[selectedQuotation.status]}>
                        {selectedQuotation.status.charAt(0).toUpperCase() + selectedQuotation.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(selectedQuotation.created_at).toLocaleDateString()}
                    </div>
                    {selectedQuotation.valid_until && (
                      <div>
                        <span className="font-medium">Valid Until:</span>{" "}
                        {new Date(selectedQuotation.valid_until).toLocaleDateString()}
                      </div>
                    )}
                    {selectedQuotation.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>{" "}
                        {selectedQuotation.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Items */}
              {selectedQuotation.quotation_items && selectedQuotation.quotation_items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 font-medium text-sm border-b pb-2">
                        <div>Product</div>
                        <div className="text-center">Quantity</div>
                        <div className="text-right">Unit Price</div>
                        <div className="text-right">Total</div>
                      </div>
                      
                      {selectedQuotation.quotation_items.map((item) => (
                        <div key={item.id} className="grid grid-cols-4 gap-4 text-sm">
                          <div>{item.product_name}</div>
                          <div className="text-center">{item.quantity}</div>
                          <div className="text-right">AED {item.unit_price.toFixed(2)}</div>
                          <div className="text-right font-medium">AED {item.total_price.toFixed(2)}</div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>AED {selectedQuotation.total_amount.toFixed(2)}</span>
                        </div>
                        {selectedQuotation.tax_amount > 0 && (
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>AED {selectedQuotation.tax_amount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>AED {selectedQuotation.final_amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
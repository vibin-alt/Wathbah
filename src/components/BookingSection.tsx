import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { format, addDays, isSameDay } from "date-fns";
import { CalendarIcon, Clock, MapPin, Phone, Mail, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  carModel: string;
  productType: string;
  description: string;
  deliveryDate: Date | undefined;
  timeSlot: string;
}

// Mock booked dates - in real app, this would come from backend
const bookedDates = [
  addDays(new Date(), 1),
  addDays(new Date(), 3),
  addDays(new Date(), 7),
  addDays(new Date(), 10),
];

const timeSlots = [
  "09:00 - 11:00",
  "11:00 - 13:00", 
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00"
];

const carBrands = ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Other"];
const productTypes = [
  "Engine Parts",
  "Brake System", 
  "Transmission",
  "Suspension",
  "Electrical Components",
  "Cooling System",
  "Exhaust System",
  "Other"
];

export const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    productType: "",
    description: "",
    deliveryDate: undefined,
    timeSlot: "",
  });

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(date, bookedDate));
  };

  const isDateDisabled = (date: Date) => {
    return date < new Date() || isDateBooked(date);
  };

  const getNextAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    let count = 0;
    
    while (count < 3) {
      currentDate = addDays(currentDate, 1);
      if (!isDateBooked(currentDate)) {
        dates.push(new Date(currentDate));
        count++;
      }
    }
    return dates;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({ title: "Please enter a valid name", variant: "destructive" });
      return false;
    }
    if (!formData.email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return false;
    }
    if (!formData.carModel) {
      toast({ title: "Please select your car model", variant: "destructive" });
      return false;
    }
    if (!formData.productType) {
      toast({ title: "Please select a product type", variant: "destructive" });
      return false;
    }
    if (!formData.deliveryDate) {
      toast({ title: "Please select a delivery date", variant: "destructive" });
      return false;
    }
    if (!formData.timeSlot) {
      toast({ title: "Please select a time slot", variant: "destructive" });
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Quote Request Submitted!",
        description: `Thank you ${formData.name}! Your parts enquiry has been submitted. Our team will respond with a detailed quote shortly.`,
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        carModel: "",
        productType: "",
        description: "",
        deliveryDate: undefined,
        timeSlot: "",
      });
      setSelectedDate(undefined);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your enquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Parts Enquiry & <span className="bg-gradient-primary bg-clip-text text-transparent">Price Request</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant quotes for genuine German car parts. Our experts will provide competitive pricing and availability.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Booking Form */}
          <Card className="shadow-automotive border-border/50 animate-slide-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Request Quote for Parts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                    <Input 
                      placeholder="+971 50 123 4567" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address *</label>
                  <Input 
                    placeholder="your.email@example.com" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vehicle Brand *</label>
                    <Select value={formData.carModel} onValueChange={(value) => handleInputChange("carModel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your vehicle brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {carBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Part Category *</label>
                    <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select part category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2">Expected Response Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !formData.deliveryDate && "text-muted-foreground"
                          )}
                        >
                          {formData.deliveryDate ? (
                            format(formData.deliveryDate, "PPP")
                          ) : (
                            <span>When do you need this?</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.deliveryDate}
                          onSelect={(date) => {
                            handleInputChange("deliveryDate", date);
                            setSelectedDate(date);
                          }}
                          disabled={isDateDisabled}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {selectedDate && isDateBooked(selectedDate) && (
                      <p className="text-sm text-destructive mt-1">
                        Our team is busy on this date. Try: {getNextAvailableDates().map(date => format(date, "MMM d")).join(", ")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Enquiry Priority</label>
                    <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                        <SelectItem value="high">High (Within 24 hours)</SelectItem>
                        <SelectItem value="normal">Normal (Within 48 hours)</SelectItem>
                        <SelectItem value="low">Low (Within a week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Part Details & Requirements</label>
                  <Textarea 
                    placeholder="Please provide specific part names, part numbers (if known), vehicle model/year, quantity needed, and any other relevant details..."
                    className="resize-none"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    The more details you provide, the more accurate our quote will be.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="hero"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing Quote Request...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4 mr-2" />
                      Request Quote
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Service Information */}
          <div className="space-y-6 animate-fade-in">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgent Enquiries</span>
                  <span className="font-medium">Within 2 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard Quotes</span>
                  <span className="font-medium">Within 24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complex Parts</span>
                  <span className="font-medium">Within 48 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Business Hours</span>
                  <span className="font-medium">9AM - 7PM (Mon-Sat)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Quote Coverage Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>UAE - All Emirates Covered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>GCC - Gulf Region Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>International - On Request</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Express Shipping Available</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contact for Enquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">+971 6 123 4567</p>
                    <p className="text-xs text-muted-foreground">Parts Enquiry Hotline</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">quotes@alwathbaauto.ae</p>
                    <p className="text-xs text-muted-foreground">Email for Quotes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Industrial Area, Sharjah</p>
                    <p className="text-xs text-muted-foreground">Visit Our Showroom</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
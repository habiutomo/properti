import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search } from "lucide-react";

const PropertySearch = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [purpose, setPurpose] = useState("buy");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (searchQuery) searchParams.set("query", searchQuery);
    if (propertyType !== "all") searchParams.set("type", propertyType);
    if (purpose) searchParams.set("purpose", purpose);
    
    setLocation(`/properties?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <form onSubmit={handleSearch}>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  id="search"
                  placeholder="City, neighborhood, or address"
                  className="pl-10 pr-12 py-6 text-sm h-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Property Type</label>
              <Select
                value={propertyType}
                onValueChange={setPropertyType}
              >
                <SelectTrigger id="property-type" className="w-full h-12 mt-1">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="house">Houses</SelectItem>
                  <SelectItem value="apartment">Apartments</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
              <Select
                value={purpose}
                onValueChange={setPurpose}
              >
                <SelectTrigger id="purpose" className="w-full h-12 mt-1">
                  <SelectValue placeholder="Buy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="invest">Invest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <Button type="submit" className="py-2 px-4">
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;

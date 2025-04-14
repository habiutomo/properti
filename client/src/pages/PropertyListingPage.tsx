import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { generateMockProperty } from "@/lib/propertyImages";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySearch from "@/components/properties/PropertySearch";
import PropertyFilter from "@/components/properties/PropertyFilter";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";

const PropertyListingPage = () => {
  const [location] = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Parse URL query parameters
  const queryParams = new URLSearchParams(location.split("?")[1] || "");
  const queryType = queryParams.get("type");
  const queryPurpose = queryParams.get("purpose");
  const searchQuery = queryParams.get("query");
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/properties'],
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    // If we have real data from the API, use it and apply filters
    if (data?.length) {
      let filteredProperties = [...data];
      
      // Apply filters based on URL parameters
      if (queryType) {
        filteredProperties = filteredProperties.filter(p => p.propertyType === queryType);
      }
      
      if (queryPurpose) {
        const purpose = queryPurpose === "buy" ? "sale" : queryPurpose;
        filteredProperties = filteredProperties.filter(p => p.purpose === purpose);
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProperties = filteredProperties.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.city.toLowerCase().includes(query) || 
          p.address.toLowerCase().includes(query)
        );
      }
      
      setProperties(filteredProperties);
    } else {
      // Otherwise, generate some mock properties for display
      const mockProperties = Array.from({ length: 9 }).map((_, index) => 
        generateMockProperty(index + 1)
      );
      
      // Apply any filters to mock data too
      let filteredProperties = [...mockProperties];
      
      if (queryType) {
        filteredProperties = filteredProperties.filter(p => p.propertyType === queryType);
      }
      
      if (queryPurpose) {
        const purpose = queryPurpose === "buy" ? "sale" : queryPurpose;
        filteredProperties = filteredProperties.filter(p => p.purpose === purpose);
      }
      
      setProperties(filteredProperties);
    }
  }, [data, queryType, queryPurpose, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Property</h1>
          <PropertySearch />
        </div>
        
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Filters - desktop */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <PropertyFilter />
          </div>
          
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <>
                  <X className="h-4 w-4" /> Hide Filters
                </>
              ) : (
                <>
                  <SlidersHorizontal className="h-4 w-4" /> Show Filters
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden mb-4">
              <PropertyFilter />
            </div>
          )}
          
          {/* Property listings */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {properties.length} properties found
              </p>
              
              {/* View toggles - desktop only */}
              <div className="hidden md:flex gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden h-96 animate-pulse">
                    <div className="h-56 bg-gray-300 w-full"></div>
                    <div className="p-5">
                      <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
                      <div className="h-6 bg-gray-300 rounded w-4/5 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
                      <div className="flex justify-between pt-3 border-t">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/properties"}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;

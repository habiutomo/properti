import { useEffect, useState } from "react";
import { Link } from "wouter";
import PropertyCard from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Property } from "@shared/schema";
import { generateMockProperty } from "@/lib/propertyImages";
import { useQuery } from "@tanstack/react-query";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/properties'],
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  
  useEffect(() => {
    // If we have real data from the API, use it
    if (data?.length) {
      setProperties(data);
    } else {
      // Otherwise, generate some mock properties for display
      const mockProperties = Array.from({ length: 3 }).map((_, index) => 
        generateMockProperty(index + 1)
      );
      setProperties(mockProperties);
    }
  }, [data]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-1 text-gray-500">Explore our handpicked selection of properties</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              size="icon" 
              className="rounded-full shadow"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/properties">
            <Button variant="outline" className="inline-flex items-center">
              View All Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

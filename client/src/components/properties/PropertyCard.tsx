import { Link } from "wouter";
import { Heart, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t, formatCurrency } = useLanguage();
  
  const formatPrice = (price: string) => {
    if (property.purpose === "rent") {
      return `${formatCurrency(price)}/${t("property.period.month")}`;
    }
    return formatCurrency(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <img 
          src={property.featuredImage} 
          alt={property.title} 
          className="h-56 w-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant={property.purpose === "rent" ? "secondary" : "default"} 
            className="px-2 py-1 text-xs font-semibold"
          >
            {property.purpose === "rent" ? t("property.purpose.rent") : t("property.purpose.sale")}
          </Badge>
        </div>
        <Button 
          size="icon" 
          variant="outline" 
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full h-8 w-8 p-0"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to favorites functionality would go here
          }}
        >
          <Heart className="h-4 w-4 text-gray-400 hover:text-rose-500" />
        </Button>
        {property.hasVirtualTour && (
          <div className="absolute bottom-4 right-4">
            <Button 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-sm font-medium text-gray-700 px-3 py-1.5 h-auto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Virtual tour functionality would go here
              }}
            >
              <Video className="h-4 w-4 mr-1.5" />
              {t("property.virtual")}
            </Button>
          </div>
        )}
      </div>
      <Link href={`/properties/${property.id}`}>
        <div className="p-5 cursor-pointer">
          <div className="mb-3">
            <span className="text-primary font-semibold">{formatPrice(property.price)}</span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{property.title}</h3>
          <p className="text-gray-500 text-sm mb-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 inline mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.country}
          </p>
          <div className="flex justify-between text-gray-500 text-sm pt-3 border-t">
            {property.propertyType !== "land" && (
              <>
                <div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 inline mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {property.bedrooms} {t("property.card.beds")}
                </div>
                <div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 inline mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {property.bathrooms} Bathrooms
                </div>
              </>
            )}
            <div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 inline mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              {property.area} sqft
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;

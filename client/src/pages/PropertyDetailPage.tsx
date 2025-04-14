import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { generateMockProperty, interiorImages, getRandomImage } from "@/lib/propertyImages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Bath, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Home, 
  Maximize, 
  ArrowLeft,
  Heart,
  Share,
  UserCircle,
  Mail,
  Phone
} from "lucide-react";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PropertyDetailPage = ({ params }: { params: { id: string } }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<string[]>([]);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/properties/${params.id}`],
    enabled: !!params.id,
  });
  
  const { data: propertyImages } = useQuery({
    queryKey: [`/api/properties/${params.id}/images`],
    enabled: !!params.id,
  });
  
  useEffect(() => {
    if (data) {
      setProperty(data);
      
      // If we have property images from the API, use them
      if (propertyImages?.length) {
        setImages(propertyImages.map((img: any) => img.imageUrl));
      } else {
        // Otherwise generate some mock images
        const mockImages = [data.featuredImage];
        
        // Add some interior images
        for (let i = 0; i < 4; i++) {
          mockImages.push(interiorImages[i % interiorImages.length]);
        }
        
        setImages(mockImages);
      }
    } else if (!isLoading && !isError) {
      // If no data from API, create a mock property
      const mockProperty = generateMockProperty(parseInt(params.id));
      setProperty(mockProperty);
      
      // Generate mock images
      const mockImages = [mockProperty.featuredImage];
      for (let i = 0; i < 4; i++) {
        mockImages.push(interiorImages[i % interiorImages.length]);
      }
      setImages(mockImages);
    }
  }, [data, propertyImages, params.id, isLoading, isError]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            </div>
            <div>
              <div className="h-64 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !property) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
        <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/properties">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (property.purpose === "rent") {
      return `$${numPrice.toLocaleString()}/month`;
    }
    return `$${numPrice.toLocaleString()}`;
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb and actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4 sm:mb-0">
            <Link href="/">
              <a className="hover:text-gray-800">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/properties">
              <a className="hover:text-gray-800">Properties</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium truncate">{property.title}</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
        
        {/* Property title and basic info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.address}, {property.city}, {property.country}</span>
          </div>
        </div>
        
        {/* Property gallery */}
        <PropertyGallery 
          images={images} 
          hasVirtualTour={property.hasVirtualTour} 
          address={`${property.address}, ${property.city}, ${property.country}`}
        />
        
        {/* Property details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mb-2 px-3 py-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {property.purpose === "rent" ? "For Rent" : "For Sale"}
                    </Badge>
                    <span className="text-sm text-gray-500">Purpose</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mb-2 px-3 py-1">
                      <Home className="h-4 w-4 mr-1" />
                      {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-500">Property Type</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mb-2 px-3 py-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(property.createdAt).getFullYear()}
                    </Badge>
                    <span className="text-sm text-gray-500">Year</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="mb-2 px-3 py-1">
                      <Maximize className="h-4 w-4 mr-1" />
                      {parseFloat(property.area).toLocaleString()} sqft
                    </Badge>
                    <span className="text-sm text-gray-500">Area</span>
                  </div>
                </div>
                
                {property.propertyType !== "land" && (
                  <div className="flex flex-wrap gap-8 mb-6 px-4">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-lg font-medium">{property.bedrooms}</p>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-lg font-medium">{property.bathrooms}</p>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Maximize className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-lg font-medium">{parseFloat(property.area).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Square Feet</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Features and amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {["Air Conditioning", "Heating", "Parking", "Swimming Pool", "Gym", "WiFi", "Security System", "Balcony", "Garden"].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      {property.address}, {property.city}, {property.country}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Interactive map would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                  {property.purpose === "rent" && (
                    <p className="text-gray-500 text-sm">Per Month</p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full">Schedule a Tour</Button>
                  {property.purpose === "sale" && (
                    <Button variant="outline" className="w-full">Get Pre-Approved</Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Contact agent */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <UserCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-medium">John Smith</h4>
                    <p className="text-sm text-gray-500">Property Agent</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">+1 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">agent@propertyhub.com</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <div>
                    <Input placeholder="Your Phone" type="tel" />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Hello, I am interested in this property..." 
                      className="min-h-24"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Similar properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
                <CardDescription>You might also like these properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex space-x-4">
                    <img 
                      src={getRandomImage('property')} 
                      alt="Similar property" 
                      className="h-20 w-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{property.propertyType === "land" ? "Beautiful Land Plot" : "Modern " + property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}</h4>
                      <p className="text-primary text-sm font-medium">{formatPrice(property.price)}</p>
                      <p className="text-gray-500 text-xs">{property.city}, {property.country}</p>
                    </div>
                  </div>
                ))}
                
                <Link href="/properties">
                  <Button variant="link" className="px-0">View More Properties</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

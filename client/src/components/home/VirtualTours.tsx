import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Box, Ruler, Clock, Play } from "lucide-react";
import { getRandomImage } from "@/lib/propertyImages";

const VirtualTours = () => {
  const tourImage = getRandomImage('virtualTour');

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Properties Through Virtual Tours
            </h2>
            <p className="text-xl text-gray-500 mb-6">
              Explore properties from anywhere at any time with our immersive 3D virtual tours.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                  <Box className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Immersive Experience</h4>
                  <p className="mt-1 text-gray-500">View properties in 360° detail as if you were actually there.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                  <Ruler className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Accurate Measurements</h4>
                  <p className="mt-1 text-gray-500">Get precise room dimensions and layout information.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                  <Clock className="text-primary h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Save Time</h4>
                  <p className="mt-1 text-gray-500">Pre-screen properties before scheduling in-person visits.</p>
                </div>
              </div>
            </div>
            
            <Link href="/properties">
              <Button className="px-6 py-3 h-auto text-base">
                Try Virtual Tour Demo <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src={tourImage} 
                alt="Virtual tour preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm h-16 w-16 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Play className="h-8 w-8 text-primary" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-gray-900/70 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex items-center text-white">
                  <Box className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Luxury Villa in Bali - Virtual Tour</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-amber-100 rounded-full -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTours;

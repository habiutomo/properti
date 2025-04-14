import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { dashboardImage } from "@/lib/propertyImages";

const PropertyManagement = () => {
  const features = [
    "Rent collection and payment tracking",
    "Maintenance request management",
    "Financial reports and analytics",
    "Tenant communication tools",
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Manage Your Properties</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Streamline your property management with our all-in-one tools
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 pr-0 md:pr-8 mb-8 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Management Dashboard
                </h3>
                <p className="text-gray-600 mb-6">
                  Track all your property investments, rentals, and management tasks in one unified dashboard.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link href="/manage">
                    <Button>
                      Access Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 relative overflow-hidden">
                  <img 
                    src={dashboardImage} 
                    alt="Property management dashboard" 
                    className="rounded-lg shadow-md w-full"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyManagement;

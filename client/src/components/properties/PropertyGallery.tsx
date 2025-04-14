import { useState } from "react";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Tab } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Video, Grid3X3, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  hasVirtualTour?: boolean;
  address?: string;
}

const PropertyGallery = ({ images, hasVirtualTour = false, address }: PropertyGalleryProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Photos", icon: <Grid3X3 className="h-4 w-4" /> },
    { name: "Map", icon: <MapPin className="h-4 w-4" /> },
    ...(hasVirtualTour ? [{ name: "Virtual Tour", icon: <Video className="h-4 w-4" /> }] : []),
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 border-b p-2">
          {tabs.map((tab, idx) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                cn(
                  "px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  selected
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
            >
              {tab.icon}
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <ImageCarousel images={images} className="px-2 pb-2" />
          </Tab.Panel>
          <Tab.Panel>
            <div className="h-96 bg-gray-200 flex items-center justify-center p-2">
              <div className="text-center">
                <MapPin className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  {address || "Property location would be displayed here"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Interactive map integration would be available in the full version
                </p>
              </div>
            </div>
          </Tab.Panel>
          {hasVirtualTour && (
            <Tab.Panel>
              <div className="h-96 bg-gray-200 flex flex-col items-center justify-center p-2">
                <Video className="h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Virtual Tour Experience
                </h3>
                <p className="text-sm text-gray-500 max-w-md text-center mb-4">
                  Explore this property in an immersive 360° virtual tour experience.
                </p>
                <Button>
                  <Video className="h-4 w-4 mr-2" />
                  Start Virtual Tour
                </Button>
              </div>
            </Tab.Panel>
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PropertyGallery;

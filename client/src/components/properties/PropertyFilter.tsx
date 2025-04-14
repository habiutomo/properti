import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PropertyFilter = () => {
  const [, setLocation] = useLocation();
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [bathrooms, setBathrooms] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<string[]>(['sale']);
  
  const bedroomOptions = ["1", "2", "3", "4", "5+"];
  const bathroomOptions = ["1", "2", "3", "4+"];
  const propertyTypeOptions = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" }
  ];
  const purposeOptions = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" }
  ];

  const handleBedroomChange = (value: string) => {
    setBedrooms(
      bedrooms.includes(value)
        ? bedrooms.filter(item => item !== value)
        : [...bedrooms, value]
    );
  };

  const handleBathroomChange = (value: string) => {
    setBathrooms(
      bathrooms.includes(value)
        ? bathrooms.filter(item => item !== value)
        : [...bathrooms, value]
    );
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyTypes(
      propertyTypes.includes(value)
        ? propertyTypes.filter(item => item !== value)
        : [...propertyTypes, value]
    );
  };

  const handlePurposeChange = (value: string) => {
    setPurpose(
      purpose.includes(value)
        ? purpose.filter(item => item !== value)
        : [...purpose, value]
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} sqft`;
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);
    
    if (priceRange[0] > 0) searchParams.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 2000000) searchParams.set("maxPrice", priceRange[1].toString());
    
    if (areaRange[0] > 0) searchParams.set("minArea", areaRange[0].toString());
    if (areaRange[1] < 5000) searchParams.set("maxArea", areaRange[1].toString());
    
    if (bedrooms.length > 0) searchParams.set("bedrooms", bedrooms.join(","));
    if (bathrooms.length > 0) searchParams.set("bathrooms", bathrooms.join(","));
    if (propertyTypes.length > 0) searchParams.set("propertyTypes", propertyTypes.join(","));
    if (purpose.length > 0) searchParams.set("purpose", purpose.join(","));
    
    setLocation(`/properties?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    setPriceRange([0, 2000000]);
    setAreaRange([0, 5000]);
    setBedrooms([]);
    setBathrooms([]);
    setPropertyTypes([]);
    setPurpose(['sale']);
    
    setLocation("/properties");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
      
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              <Slider
                defaultValue={[0, 2000000]}
                max={2000000}
                step={5000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="area">
          <AccordionTrigger>Area</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
                value={areaRange}
                onValueChange={setAreaRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatArea(areaRange[0])}</span>
                <span>{formatArea(areaRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="bedrooms">
          <AccordionTrigger>Bedrooms</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {bedroomOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`bedroom-${option}`}
                    checked={bedrooms.includes(option)}
                    onCheckedChange={() => handleBedroomChange(option)}
                  />
                  <Label htmlFor={`bedroom-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="bathrooms">
          <AccordionTrigger>Bathrooms</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {bathroomOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`bathroom-${option}`}
                    checked={bathrooms.includes(option)}
                    onCheckedChange={() => handleBathroomChange(option)}
                  />
                  <Label htmlFor={`bathroom-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="propertyType">
          <AccordionTrigger>Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 mt-2">
              {propertyTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${option.value}`}
                    checked={propertyTypes.includes(option.value)}
                    onCheckedChange={() => handlePropertyTypeChange(option.value)}
                  />
                  <Label htmlFor={`type-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="purpose">
          <AccordionTrigger>Purpose</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 mt-2">
              {purposeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`purpose-${option.value}`}
                    checked={purpose.includes(option.value)}
                    onCheckedChange={() => handlePurposeChange(option.value)}
                  />
                  <Label htmlFor={`purpose-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 flex flex-col space-y-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default PropertyFilter;

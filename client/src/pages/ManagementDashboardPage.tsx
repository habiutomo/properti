import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import PropertyStats from "@/components/management/PropertyStats";
import { 
  Home, 
  User, 
  MoreVertical, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Filter,
  ChevronDown
} from "lucide-react";
import { generateMockProperty } from "@/lib/propertyImages";

const ManagementDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();
  
  // Generate some mock properties for display
  const mockProperties = Array.from({ length: 5 }).map((_, index) => 
    generateMockProperty(index + 1)
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Management Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your properties, tenants, and maintenance requests in one place</p>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter Properties</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Properties</DropdownMenuItem>
                  <DropdownMenuItem>Residential</DropdownMenuItem>
                  <DropdownMenuItem>Commercial</DropdownMenuItem>
                  <DropdownMenuItem>Occupied Only</DropdownMenuItem>
                  <DropdownMenuItem>Vacant Only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {activeTab === "properties" && (
                <Button size="sm" onClick={() => window.location.href = "/manage/properties"} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                  {t("management.property.cms")}
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <PropertyStats />
          </TabsContent>
          
          <TabsContent value="properties" className="mt-0">
            <div className="mb-6">
              <Button variant="outline" onClick={() => window.location.href = "/manage/properties"} className="flex items-center">
                <span>{t("management.property.cms")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={property.featuredImage} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit Property</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Add Tenant</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Remove Property</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className={property.status === "available" ? "bg-green-500" : property.status === "rented" ? "bg-blue-500" : "bg-gray-500"}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <Home className="h-3.5 w-3.5 mr-1" />
                      {property.address}, {property.city}
                    </p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Monthly Rent</p>
                        <p className="font-semibold">${parseFloat(property.price).toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Occupancy</p>
                        <p className="font-semibold">{property.status === "rented" ? "Occupied" : "Vacant"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add new property card */}
              <Card className="border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center h-full min-h-[20rem]">
                <CardContent className="flex flex-col items-center justify-center h-full py-10">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-700">Add New Property</h3>
                  <p className="text-gray-500 text-sm text-center mt-2">
                    Click to add a new property to your management portfolio
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tenants" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map((index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>
                          {["JD", "AS", "MK", "BR", "CN"][index - 1]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{["John Doe", "Alice Smith", "Mark Kim", "Bob Roberts", "Chris Nolan"][index - 1]}</h3>
                        <p className="text-sm text-gray-500">{mockProperties[Math.min(index - 1, mockProperties.length - 1)].title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{`tenant${index}@example.com`}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{`(555) 123-${1000 + index}`}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Lease ends: {`${["Jan", "Feb", "Mar", "Apr", "May"][index - 1]} 15, 2024`}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Rent: ${(1000 + index * 200).toLocaleString()}/month</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Badge variant={index % 3 === 0 ? "destructive" : "outline"}>
                        {index % 3 === 0 ? "Payment Due" : "Paid"}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Contact Tenant</DropdownMenuItem>
                          <DropdownMenuItem>View Lease</DropdownMenuItem>
                          <DropdownMenuItem>Record Payment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">End Lease</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-0">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Manage repair and maintenance issues for your properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {[
                      {
                        title: "Leaking Roof",
                        property: "Modern Villa with Pool",
                        tenant: "John Doe",
                        date: "Oct 12, 2023",
                        status: "urgent",
                        description: "Water coming through ceiling in master bedroom after heavy rain."
                      },
                      {
                        title: "AC Not Working",
                        property: "Waterfront Luxury Villa",
                        tenant: "Alice Smith",
                        date: "Oct 10, 2023",
                        status: "pending",
                        description: "Air conditioning not cooling properly in living room area."
                      },
                      {
                        title: "Broken Dishwasher",
                        property: "Modern Apartment with City View",
                        tenant: "Mark Kim",
                        date: "Oct 5, 2023",
                        status: "scheduled",
                        description: "Dishwasher not draining properly and making loud noise."
                      },
                      {
                        title: "Garage Door Stuck",
                        property: "Modern Villa with Pool",
                        tenant: "John Doe",
                        date: "Sep 28, 2023",
                        status: "completed",
                        description: "Garage door won't open or close automatically. Remote not working."
                      },
                      {
                        title: "Bathroom Faucet Dripping",
                        property: "Waterfront Luxury Villa",
                        tenant: "Alice Smith",
                        date: "Sep 20, 2023",
                        status: "completed",
                        description: "Constant dripping from bathroom sink faucet."
                      }
                    ].map((request, index) => (
                      <div key={index} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              request.status === "urgent" ? "bg-red-100 text-red-600" : 
                              request.status === "pending" ? "bg-amber-100 text-amber-600" :
                              request.status === "scheduled" ? "bg-blue-100 text-blue-600" :
                              "bg-green-100 text-green-600"
                            }`}>
                              {request.status === "urgent" ? <AlertTriangle className="h-3.5 w-3.5" /> : 
                               request.status === "completed" ? <CheckCircle className="h-3.5 w-3.5" /> :
                               <Clock className="h-3.5 w-3.5" />}
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900">{request.title}</h4>
                                <Badge 
                                  variant={
                                    request.status === "urgent" ? "destructive" : 
                                    request.status === "pending" ? "outline" :
                                    request.status === "scheduled" ? "secondary" :
                                    "success"
                                  }
                                  className="ml-2 capitalize"
                                >
                                  {request.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{request.property} - {request.tenant}</p>
                              <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>Reported: {request.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Assign Contractor</DropdownMenuItem>
                              <DropdownMenuItem>Schedule Repair</DropdownMenuItem>
                              <DropdownMenuItem>Contact Tenant</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>{request.status === "completed" ? "Reopen Issue" : "Mark as Completed"}</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Open Requests</span>
                        <span className="text-sm">8 total</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="grid grid-cols-3 text-xs text-gray-500">
                        <div>
                          <span className="text-red-500 font-medium">2</span> Urgent
                        </div>
                        <div>
                          <span className="text-amber-500 font-medium">3</span> Pending
                        </div>
                        <div>
                          <span className="text-blue-500 font-medium">3</span> Scheduled
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Average Resolution Time</span>
                      </div>
                      <div className="text-2xl font-bold">3.2 days</div>
                      <div className="text-xs text-green-600">↓ 12% from last month</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Maintenance Budget</span>
                      </div>
                      <div className="flex items-end">
                        <div className="text-2xl font-bold">$4,850</div>
                        <div className="text-sm text-gray-500 ml-2 mb-0.5">/ $12,000</div>
                      </div>
                      <Progress value={40} className="h-2" />
                      <div className="text-xs text-gray-500">40% of annual budget used</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagementDashboardPage;

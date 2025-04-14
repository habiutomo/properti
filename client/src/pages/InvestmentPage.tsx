import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestmentProject } from "@shared/schema";
import { generateMockInvestmentProject } from "@/lib/propertyImages";
import InvestmentCard from "@/components/investments/InvestmentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

const InvestmentPage = () => {
  const [projects, setProjects] = useState<InvestmentProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<InvestmentProject[]>([]);
  const [projectType, setProjectType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minInvestment, setMinInvestment] = useState([0]);
  const [roiRange, setRoiRange] = useState([0, 20]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/investment-projects'],
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    // If we have real data from the API, use it
    if (data?.length) {
      setProjects(data);
    } else {
      // Otherwise, generate some mock projects for display
      const mockProjects = Array.from({ length: 9 }).map((_, index) => 
        generateMockInvestmentProject(index + 1)
      );
      setProjects(mockProjects);
    }
  }, [data]);
  
  useEffect(() => {
    if (projects.length) {
      let filtered = [...projects];
      
      // Filter by project type
      if (projectType !== "all") {
        filtered = filtered.filter(p => p.projectType === projectType);
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.location.toLowerCase().includes(query)
        );
      }
      
      // Filter by min investment
      if (minInvestment[0] > 0) {
        filtered = filtered.filter(p => parseFloat(p.minInvestment) >= minInvestment[0]);
      }
      
      // Filter by ROI range
      filtered = filtered.filter(p => {
        const roi = parseFloat(p.roi);
        return roi >= roiRange[0] && roi <= roiRange[1];
      });
      
      setFilteredProjects(filtered);
    }
  }, [projects, projectType, searchQuery, minInvestment, roiRange]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Opportunities</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Discover high-return real estate investment opportunities and grow your portfolio with our carefully selected projects.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Projects</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Project name or location"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Project Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Project Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Investment</label>
              <div className="pt-2 px-2">
                <Slider
                  defaultValue={[0]}
                  max={25000}
                  step={1000}
                  value={minInvestment}
                  onValueChange={setMinInvestment}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Min: ${minInvestment[0].toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected ROI Range</label>
            <div className="pt-2 px-2">
              <Slider
                defaultValue={[0, 20]}
                max={20}
                step={0.5}
                value={roiRange}
                onValueChange={setRoiRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{roiRange[0]}%</span>
                <span>{roiRange[1]}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setProjectType("all");
                setSearchQuery("");
                setMinInvestment([0]);
                setRoiRange([0, 20]);
              }}
            >
              Reset Filters
            </Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
        
        {/* Projects tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse Investment Projects</h2>
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="closing-soon">Closing Soon</TabsTrigger>
              <TabsTrigger value="new">Newly Added</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-96 animate-pulse">
                    <div className="h-48 bg-gray-300 w-full"></div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full"></div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="h-12 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-12 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-12 bg-gray-300 rounded w-1/4"></div>
                      </div>
                      <div className="mt-5 h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <InvestmentCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No investment projects found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setProjectType("all");
                    setSearchQuery("");
                    setMinInvestment([0]);
                    setRoiRange([0, 20]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects
                .sort((a, b) => parseFloat(b.roi) - parseFloat(a.roi))
                .slice(0, 3)
                .map((project) => (
                  <InvestmentCard key={project.id} project={project} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="closing-soon" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects
                .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
                .slice(0, 3)
                .map((project) => (
                  <InvestmentCard key={project.id} project={project} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
                .map((project) => (
                  <InvestmentCard key={project.id} project={project} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Investment guide */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-16">
          <div className="lg:flex">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Invest in Real Estate Projects</h2>
              <p className="text-gray-600 mb-6">
                Investing in real estate projects can be a lucrative addition to your portfolio. Follow these steps to get started.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Browse Projects</h3>
                    <p className="mt-1 text-gray-500">Explore available investment opportunities and review project details.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Select Investment Amount</h3>
                    <p className="mt-1 text-gray-500">Choose how much you want to invest, starting from the minimum investment amount.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Complete Investment</h3>
                    <p className="mt-1 text-gray-500">Review terms, sign documents electronically, and complete your investment.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Track Returns</h3>
                    <p className="mt-1 text-gray-500">Monitor your investments and receive returns based on project performance.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="px-6 py-3 h-auto">Start Investing Today</Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1426&q=80" 
                  alt="Real estate investment" 
                  className="rounded-lg shadow-lg max-h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;

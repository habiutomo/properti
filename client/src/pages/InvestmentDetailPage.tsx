import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestmentProject } from "@shared/schema";
import { generateMockInvestmentProject, getRandomImage } from "@/lib/propertyImages";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  CalendarDays, 
  DollarSign, 
  TrendingUp, 
  User, 
  Users, 
  Building, 
  CheckCircle,
  Share,
  FileText,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { differenceInDays } from "date-fns";

const InvestmentDetailPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<InvestmentProject | null>(null);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/investment-projects/${params.id}`],
    enabled: !!params.id,
  });
  
  useEffect(() => {
    if (data) {
      setProject(data);
    } else if (!isLoading && !isError) {
      // If no data from API, create a mock project
      const mockProject = generateMockInvestmentProject(parseInt(params.id));
      setProject(mockProject);
    }
  }, [data, params.id, isLoading, isError]);

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
  
  if (isError || !project) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-500 mb-6">The investment project you're looking for doesn't exist or has been removed.</p>
        <Link href="/invest">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Investments
          </Button>
        </Link>
      </div>
    );
  }

  const percentFunded = Math.round((parseFloat(project.currentAmount) / parseFloat(project.targetAmount)) * 100);
  const daysLeft = differenceInDays(new Date(project.endDate), new Date());
  
  const getBadgeClass = (type: string) => {
    switch (type) {
      case "commercial":
        return "bg-amber-500";
      case "residential":
        return "bg-primary";
      case "mixed-use":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Mock data for charts
  const cashFlowData = [
    { month: 'Year 1', revenue: 120000, expenses: 45000, profit: 75000 },
    { month: 'Year 2', revenue: 150000, expenses: 50000, profit: 100000 },
    { month: 'Year 3', revenue: 180000, expenses: 55000, profit: 125000 }
  ];
  
  const roiProjectionData = [
    { name: 'Initial', value: 100 },
    { name: 'Year 1', value: 112 },
    { name: 'Year 2', value: 126 },
    { name: 'Year 3', value: 142 }
  ];
  
  const investmentAllocationData = [
    { name: 'Land', value: 35 },
    { name: 'Construction', value: 40 },
    { name: 'Design', value: 10 },
    { name: 'Legal', value: 5 },
    { name: 'Other', value: 10 }
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'];

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
            <Link href="/invest">
              <a className="hover:text-gray-800">Investments</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium truncate">{project.title}</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" /> Download Info
            </Button>
          </div>
        </div>
        
        {/* Hero section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img 
            src={project.featuredImage} 
            alt={project.title} 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-8">
            <Badge 
              className={`mb-4 text-white ${getBadgeClass(project.projectType)}`}
            >
              {project.projectType.toUpperCase()}
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
            <div className="flex items-center text-white">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
        
        {/* Investment details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investment overview */}
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line mb-6">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-gray-500">Expected ROI</span>
                    </div>
                    <span className="text-xl font-bold">{parseFloat(project.roi).toFixed(1)}%</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CalendarDays className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-gray-500">Duration</span>
                    </div>
                    <span className="text-xl font-bold">{project.duration} months</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-gray-500">Project Type</span>
                    </div>
                    <span className="text-xl font-bold capitalize">{project.projectType}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-gray-500">Investors</span>
                    </div>
                    <span className="text-xl font-bold">{Math.floor(Math.random() * 40) + 10}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Financial details */}
            <Tabs defaultValue="cashflow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Financial Projections</h2>
                <TabsList>
                  <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                  <TabsTrigger value="roi">ROI Projection</TabsTrigger>
                  <TabsTrigger value="allocation">Fund Allocation</TabsTrigger>
                </TabsList>
              </div>
              
              <Card>
                <TabsContent value="cashflow" className="mt-0">
                  <CardHeader>
                    <CardTitle>Projected Cash Flow</CardTitle>
                    <CardDescription>Estimated revenue, expenses, and profit over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={cashFlowData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" />
                          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                          <Bar dataKey="profit" name="Profit" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="roi" className="mt-0">
                  <CardHeader>
                    <CardTitle>Return on Investment Projection</CardTitle>
                    <CardDescription>Expected investment value growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={roiProjectionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, 'Investment Value']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            name="Investment Value (%)" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="allocation" className="mt-0">
                  <CardHeader>
                    <CardTitle>Investment Fund Allocation</CardTitle>
                    <CardDescription>How your investment will be utilized</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-80 w-full max-w-md">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={investmentAllocationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {investmentAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </TabsContent>
              </Card>
            </Tabs>
            
            {/* Project details */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="strategy">
                    <AccordionTrigger>Investment Strategy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mb-4">
                        This project follows a value-add strategy where we acquire an underperforming property, implement strategic renovations and operational improvements, and enhance its market value.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600">Property acquisition at below-market value</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600">Strategic renovations to improve property condition and amenities</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600">Operational improvements to increase efficiency</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600">Target exit through property sale once value has been maximized</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="benefits">
                    <AccordionTrigger>Investor Benefits</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Passive Income</h4>
                          <p className="text-gray-600">Receive regular quarterly distributions from rental income.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Capital Appreciation</h4>
                          <p className="text-gray-600">Benefit from property value increase at project exit.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Tax Benefits</h4>
                          <p className="text-gray-600">Potential tax advantages including depreciation deductions.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Portfolio Diversification</h4>
                          <p className="text-gray-600">Add real estate to your investment portfolio for diversification.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="timeline">
                    <AccordionTrigger>Project Timeline</AccordionTrigger>
                    <AccordionContent>
                      <div className="relative border-l-2 border-gray-200 pl-6 py-2 space-y-6">
                        <div className="relative">
                          <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Q3 2023</h4>
                            <p className="text-gray-600">Acquisition and fundraising</p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Q4 2023</h4>
                            <p className="text-gray-600">Renovation planning and permitting</p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Q1-Q3 2024</h4>
                            <p className="text-gray-600">Construction and improvements</p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Q4 2024 - Q3 2026</h4>
                            <p className="text-gray-600">Property operation and stabilization</p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Q4 2026</h4>
                            <p className="text-gray-600">Property exit and investor distribution</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="risks">
                    <AccordionTrigger>Risk Factors</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mb-4">
                        All investments carry risks. Here are the key risk factors for this project:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5">!</div>
                          <p className="text-gray-600">Market risk: Real estate values may fluctuate due to economic conditions</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5">!</div>
                          <p className="text-gray-600">Operational risk: Property management challenges may impact performance</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5">!</div>
                          <p className="text-gray-600">Liquidity risk: Real estate investments are generally illiquid</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5">!</div>
                          <p className="text-gray-600">Development risk: Construction delays or cost overruns may occur</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                      {project.location}
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
            {/* Investment card */}
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">Target: ${parseFloat(project.targetAmount).toLocaleString()}</span>
                    <span className="text-sm font-medium text-green-600">{percentFunded}% Funded</span>
                  </div>
                  <Progress value={percentFunded} className="h-2.5" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Min. Investment</p>
                    <p className="text-lg font-semibold text-primary">${parseFloat(project.minInvestment).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Expected ROI</p>
                    <p className="text-lg font-semibold text-primary">{parseFloat(project.roi).toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {daysLeft > 0 ? `${daysLeft} days left to invest` : "Investment deadline passed"}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {daysLeft > 0 ? (
                    <>
                      <Button className="w-full">Invest Now</Button>
                      <Button variant="outline" className="w-full">Schedule a Call</Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full">Project Closed</Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Project sponsor */}
            <Card>
              <CardHeader>
                <CardTitle>Project Sponsor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">PropertyHub Investments</h4>
                    <p className="text-sm text-gray-500">Real Estate Developer</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  PropertyHub Investments has successfully completed over 20 real estate projects with a total value exceeding $50 million.
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Track Record</span>
                      <span className="text-xs font-medium">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Experience</span>
                      <span className="text-xs font-medium">15+ Years</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-5">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Investor Returns</span>
                      <span className="text-xs font-medium">Above Average</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Sponsor Profile
                </Button>
              </CardContent>
            </Card>
            
            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div className="text-sm">
                        <p className="font-medium">Project Prospectus</p>
                        <p className="text-gray-500">PDF, 2.4 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div className="text-sm">
                        <p className="font-medium">Financial Projections</p>
                        <p className="text-gray-500">XLSX, 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div className="text-sm">
                        <p className="font-medium">Legal Documents</p>
                        <p className="text-gray-500">PDF, 3.8 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetailPage;

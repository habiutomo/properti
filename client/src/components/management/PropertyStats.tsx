import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Home, DollarSign, TrendingUp, Users } from "lucide-react";

const occupancyData = [
  { name: 'Jan', occupancy: 85 },
  { name: 'Feb', occupancy: 88 },
  { name: 'Mar', occupancy: 92 },
  { name: 'Apr', occupancy: 90 },
  { name: 'May', occupancy: 93 },
  { name: 'Jun', occupancy: 91 },
  { name: 'Jul', occupancy: 95 },
];

const rentalIncomeData = [
  { name: 'Jan', income: 12500 },
  { name: 'Feb', income: 12500 },
  { name: 'Mar', income: 13200 },
  { name: 'Apr', income: 13000 },
  { name: 'May', income: 13500 },
  { name: 'Jun', income: 14000 },
  { name: 'Jul', income: 14200 },
];

const maintenanceData = [
  { name: 'Jan', expenses: 1200 },
  { name: 'Feb', expenses: 800 },
  { name: 'Mar', expenses: 2100 },
  { name: 'Apr', expenses: 950 },
  { name: 'May', expenses: 1500 },
  { name: 'Jun', expenses: 750 },
  { name: 'Jul', expenses: 1300 },
];

const propertyTypeData = [
  { name: 'Apartments', value: 45 },
  { name: 'Houses', value: 30 },
  { name: 'Commercial', value: 15 },
  { name: 'Land', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const PropertyStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-2xl font-bold">$14,200</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tenants</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="occupancy">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Performance Analytics</h2>
          <TabsList>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
        </div>
        
        <Card>
          <TabsContent value="occupancy" className="mt-0">
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>The percentage of your properties that are occupied over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
                    <Line type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="income" className="mt-0">
            <CardHeader>
              <CardTitle>Rental Income</CardTitle>
              <CardDescription>Monthly income generated from your properties.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rentalIncomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Income']} />
                    <Bar dataKey="income" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <CardHeader>
              <CardTitle>Maintenance Expenses</CardTitle>
              <CardDescription>Monthly expenses for property maintenance and repairs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Expenses']} />
                    <Bar dataKey="expenses" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="overview" className="mt-0">
            <CardHeader>
              <CardTitle>Property Portfolio</CardTitle>
              <CardDescription>Breakdown of your property portfolio by type.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-80 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default PropertyStats;

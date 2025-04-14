import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import InvestmentCard from "@/components/investments/InvestmentCard";
import { InvestmentProject } from "@shared/schema";
import { generateMockInvestmentProject } from "@/lib/propertyImages";
import { useQuery } from "@tanstack/react-query";

const InvestmentOpportunities = () => {
  const [projects, setProjects] = useState<InvestmentProject[]>([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/investment-projects'],
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  
  useEffect(() => {
    // If we have real data from the API, use it
    if (data?.length) {
      setProjects(data);
    } else {
      // Otherwise, generate some mock projects for display
      const mockProjects = Array.from({ length: 3 }).map((_, index) => 
        generateMockInvestmentProject(index + 1)
      );
      setProjects(mockProjects);
    }
  }, [data]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Investment Opportunities</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Fund development projects and earn returns on your investment
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <InvestmentCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/invest">
            <Button className="px-6 py-3 h-auto text-base">
              Explore All Investment Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;

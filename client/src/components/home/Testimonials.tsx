import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Star } from "lucide-react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    // If we have real data from the API, use it
    if (data?.length) {
      setTestimonials(data);
    } else {
      // Otherwise, use the predefined sample testimonials
      setTestimonials([
        {
          id: 1,
          name: "Siti Badriah",
          role: "Property Developer",
          content: "PropertyHub helped me find investors for my development project in just 3 weeks. The platform is intuitive and the support team is exceptional. Highly recommend!",
          rating: 5
        },
        {
          id: 2,
          name: "Joko Widodo",
          role: "Real Estate Investor",
          content: "As an investor, I've used many platforms, but PropertyHub offers the most comprehensive information and due diligence reports. I've invested in 3 projects so far with excellent returns.",
          rating: 5
        },
        {
          id: 3,
          name: "Dewi Pratiwi",
          role: "Property Owner",
          content: "Managing my rental properties has become so much easier with PropertyHub. The payment tracking, maintenance requests, and tenant communication features save me hours every week.",
          rating: 4
        }
      ]);
    }
  }, [data]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? "text-amber-500 fill-amber-500" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Hear from property owners, investors, and tenants who use PropertyHub
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="h-24 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {testimonial.name.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

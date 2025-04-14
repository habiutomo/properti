import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-12 bg-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to transform your real estate experience?
        </h2>
        <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
          Join thousands of property owners, investors, and tenants on PropertyHub.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-0">
          <div className="sm:inline-flex sm:rounded-md sm:shadow">
            <Link href="/properties">
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto px-5 py-3 h-auto text-base font-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
          <div className="sm:ml-3 sm:inline-flex">
            <Link href="/invest">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto px-5 py-3 h-auto text-base font-medium text-white border-white hover:bg-primary-800"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

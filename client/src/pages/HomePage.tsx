import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import InvestmentOpportunities from "@/components/home/InvestmentOpportunities";
import PropertyManagement from "@/components/home/PropertyManagement";
import VirtualTours from "@/components/home/VirtualTours";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const HomePage = () => {
  return (
    <>
      <Hero />
      <QuickLinks />
      <FeaturedProperties />
      <InvestmentOpportunities />
      <PropertyManagement />
      <VirtualTours />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;

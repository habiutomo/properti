import PropertySearch from "@/components/properties/PropertySearch";
import { useLanguage } from "@/hooks/use-language";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80" 
          alt="Modern luxury home exterior"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t("home.hero.title")}
        </h1>
        <p className="mt-6 text-xl text-gray-100 max-w-3xl">
          {t("home.hero.subtitle")}
        </p>
        
        <div className="mt-10 max-w-4xl">
          <PropertySearch />
        </div>
      </div>
    </div>
  );
};

export default Hero;

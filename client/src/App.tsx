import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/hooks/use-language";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import HomePage from "@/pages/HomePage";
import PropertyListingPage from "@/pages/PropertyListingPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import InvestmentPage from "@/pages/InvestmentPage";
import InvestmentDetailPage from "@/pages/InvestmentDetailPage";
import ManagementDashboardPage from "@/pages/ManagementDashboardPage";
import AddPropertyPage from "@/pages/AddPropertyPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/properties" component={PropertyListingPage} />
      <Route path="/properties/:id" component={PropertyDetailPage} />
      <Route path="/invest" component={InvestmentPage} />
      <Route path="/invest/:id" component={InvestmentDetailPage} />
      <Route path="/manage" component={ManagementDashboardPage} />
      <Route path="/add-property" component={AddPropertyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

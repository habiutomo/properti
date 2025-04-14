import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Menu } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const Navbar = () => {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navigationLinks = [
    { name: t("nav.properties"), href: "/properties", current: location === "/properties" },
    { name: t("nav.investments"), href: "/invest", current: location === "/invest" },
    { name: t("nav.management"), href: "/manage", current: location === "/manage" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary font-bold text-xl cursor-pointer">PropertyHub</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      item.current
                        ? "border-primary text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LanguageSwitcher />

            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="sr-only">View notifications</span>
            </Button>

            <div className="ml-3 relative">
              <div>
                <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">JP</div>
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6 text-gray-400" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationLinks.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`${
                          item.current
                            ? "text-primary font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        } px-1 py-2 text-base`}
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="mb-4">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { Link } from "wouter";
import { Home, Key, Coins, ClipboardList } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      icon: <Home className="text-primary text-xl" />,
      label: "Buy Property",
      href: "/properties?purpose=buy",
      bgColor: "bg-primary-100",
    },
    {
      icon: <Key className="text-green-600 text-xl" />,
      label: "Rent Property",
      href: "/properties?purpose=rent",
      bgColor: "bg-green-100",
    },
    {
      icon: <Coins className="text-amber-600 text-xl" />,
      label: "Invest in Projects",
      href: "/invest",
      bgColor: "bg-amber-100",
    },
    {
      icon: <ClipboardList className="text-gray-600 text-xl" />,
      label: "Manage Properties",
      href: "/manage",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="bg-white py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <a className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50">
                <div className={`${link.bgColor} p-3 rounded-full`}>
                  {link.icon}
                </div>
                <span className="mt-2 text-sm font-medium">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;

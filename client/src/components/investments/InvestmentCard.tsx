import { Link } from "wouter";
import { InvestmentProject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { differenceInDays } from "date-fns";
import { useLanguage } from "@/hooks/use-language";

interface InvestmentCardProps {
  project: InvestmentProject;
}

const InvestmentCard = ({ project }: InvestmentCardProps) => {
  const { t, formatCurrency } = useLanguage();
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={project.featuredImage} 
          alt={project.title} 
          className="h-48 w-full object-cover" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-4">
          <div>
            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getBadgeClass(project.projectType)}`}>
              {project.projectType.toUpperCase()}
            </span>
            <h3 className="text-white text-lg font-semibold mt-2">{project.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-500">
            {t("investment.target")}: {formatCurrency(project.targetAmount)}
          </span>
          <span className="text-sm font-medium text-green-600">
            {percentFunded}% {t("investment.funded")}
          </span>
        </div>
        <Progress value={percentFunded} className="h-2.5" />
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{t("investment.roi.expected")}</p>
            <p className="text-lg font-semibold text-primary-700">
              {parseFloat(project.roi).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t("investment.duration")}</p>
            <p className="text-lg font-semibold text-primary-700">
              {project.duration} {t("property.period.months")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t("investment.min")}</p>
            <p className="text-lg font-semibold text-primary-700">
              {formatCurrency(project.minInvestment)}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Link href={`/invest/${project.id}`}>
            <Button className="w-full">
              {t("investment.view_opportunity")}
            </Button>
          </Link>
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {daysLeft > 0 
              ? t("investment.days_left", { days: daysLeft }) 
              : t("investment.deadline_passed")
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;

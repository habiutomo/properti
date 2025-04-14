import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MoreHorizontal, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

const ManagePropertiesPage = () => {
  const { t, formatCurrency } = useLanguage();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);

  // Fetch properties
  const { 
    data: properties, 
    isLoading, 
    isError,
    error 
  } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    refetchOnWindowFocus: false,
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: t("general.success"),
        description: t("management.property.deleted"),
      });
      setShowDeleteDialog(null);
    },
    onError: (error) => {
      toast({
        title: t("general.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter properties based on search query
  const filteredProperties = properties?.filter((property) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.address.toLowerCase().includes(searchLower) ||
      property.city.toLowerCase().includes(searchLower) ||
      property.country.toLowerCase().includes(searchLower) ||
      property.propertyType.toLowerCase().includes(searchLower) ||
      property.purpose.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteProperty = (id: number) => {
    deletePropertyMutation.mutate(id);
  };

  const getPurposeLabel = (purpose: string) => {
    return purpose === "sale" ? t("property.purpose.sale") : t("property.purpose.rent");
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "house":
        return t("property.type.house");
      case "apartment":
        return t("property.type.apartment");
      case "land":
        return t("property.type.land");
      case "commercial":
        return t("property.type.commercial");
      default:
        return type;
    }
  };

  const getStatusBadgeClass = (status: string | null) => {
    if (!status) return "bg-gray-200 text-gray-800";
    
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "rented":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">{t("general.loading")}</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">{t("general.error")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error instanceof Error ? error.message : String(error)}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/properties"] })}>
              {t("general.retry")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("management.properties")}</h1>
          <p className="mt-2 text-gray-600">
            {t("management.property.manage_description")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate("/add-property")} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            {t("management.add")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("management.property.list")}</CardTitle>
          <CardDescription>
            {properties?.length
              ? t("management.property.count", { count: properties.length })
              : t("management.property.empty")}
          </CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("property.search.placeholder")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProperties?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500">{t("management.property.no_results")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("property.detail.title")}</TableHead>
                    <TableHead>{t("property.filter.type")}</TableHead>
                    <TableHead>{t("property.filter.purpose")}</TableHead>
                    <TableHead>{t("property.filter.price")}</TableHead>
                    <TableHead>{t("property.filter.status")}</TableHead>
                    <TableHead className="text-right">{t("management.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties?.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="h-10 w-10 mr-3 overflow-hidden rounded-md bg-gray-100">
                            <img 
                              src={property.featuredImage} 
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="truncate max-w-[200px]">{property.title}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{property.address}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getPropertyTypeLabel(property.propertyType)}</TableCell>
                      <TableCell>{getPurposeLabel(property.purpose)}</TableCell>
                      <TableCell>{formatCurrency(property.price)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(property.status)}`}>
                          {property.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t("management.open_menu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("management.actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/properties/${property.id}`)}>
                              {t("property.card.viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/edit-property/${property.id}`)}>
                              {t("management.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteDialog(property.id)}>
                              {t("management.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog !== null} onOpenChange={(open) => !open && setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("management.property.delete_confirm_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("management.property.delete_confirm_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("management.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => showDeleteDialog && handleDeleteProperty(showDeleteDialog)}
              disabled={deletePropertyMutation.isPending}
            >
              {deletePropertyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("general.loading")}
                </>
              ) : (
                t("management.delete")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManagePropertiesPage;
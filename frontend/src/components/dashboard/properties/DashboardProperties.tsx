import { fetchMyProperties } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { CirclePlus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardProperty from "./DashboardProperty";
import DashboardPropertySkeleton from "./DashboardPropertySkeleton";
import type { Property } from "@/types/global";

const DashboardProperties = () => {
    // Get the user token
    const { getToken } = useAuth();

    // Fetch all properties of the current user
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["my-properties"],
        queryFn: async () => {
            const token = await getToken();
            return fetchMyProperties(token ?? "");
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <DashboardPropertySkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-6 rounded-xl border border-error/20 bg-error/5 p-4 text-error text-sm font-medium">
                {error.message || "Failed to load properties. Please try again."}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-xs mt-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Building className="size-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-text">No properties listed</h3>
                <p className="mt-2 max-w-sm text-sm text-text-secondary">
                    You haven't listed any properties yet. Start listing your properties to reach potential buyers and renters.
                </p>
                <Link to="/dashboard/add-property" className="mt-6">
                    <Button variant="secondary">
                        <CirclePlus className="size-4 mr-1" />
                        Add Property
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            {data.map((property: Property) => (
                <DashboardProperty
                    key={property._id}
                    property={property}
                />
            ))}
        </div>
    );
};

export default DashboardProperties;
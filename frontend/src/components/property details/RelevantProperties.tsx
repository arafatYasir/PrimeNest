import { useQuery } from "@tanstack/react-query";
import { fetchAllProperties } from "@/lib/apiCalls";
import PropertyCard from "../PropertyCard";
import type { Property } from "@/types/global";
import PropertyCardSkeleton from "../PropertyCardSkeleton";

interface RelevantPropertiesProps {
    propertyType: string;
    currentPropertyId: string;
}

const RelevantProperties = ({ propertyType, currentPropertyId }: RelevantPropertiesProps) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["relevantProperties", propertyType, currentPropertyId],
        queryFn: () =>
            fetchAllProperties({
                propertyType,
                propertyStatus: "Available",
                excludeId: currentPropertyId,
                limit: 4,
            }),
        enabled: !!propertyType && !!currentPropertyId,
    });

    if (isError) {
        console.error(error.message);

        return (
            <div className="mt-10 border-t border-border pt-10 text-center text-error font-semibold">
                Failed to load relevant properties.
            </div>
        );
    }

    const properties = data?.data || [];

    if (properties.length === 0) {
        return null;
    }

    return (
        <div className="mt-10 border-t border-border pt-10">
            <h3 className="font-heading text-xl xs:text-2xl font-bold tracking-tight text-text mb-6">
                Relevant Properties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <PropertyCardSkeleton key={i} />
                        ))
                    ) : (
                        properties.map((property: Property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default RelevantProperties;

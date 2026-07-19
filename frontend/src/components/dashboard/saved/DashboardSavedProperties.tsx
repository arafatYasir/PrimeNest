import { fetchSavedProperties } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import type { Property } from "@/types/global";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sortOptions } from "@/lib/data";
import { Link } from "react-router";

const DashboardSavedProperties = () => {
    // States
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("None");

    // Get the user token
    const { getToken } = useAuth();

    // Fetch saved properties of the current user
    const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
        queryKey: ["saved-properties", page, sortBy],
        queryFn: async () => {
            const token = await getToken();
            return fetchSavedProperties(token ?? "", page, sortBy);
        },
        placeholderData: keepPreviousData
    });

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [page]);

    if (isError) {
        return (
            <div className="mt-6 rounded-xl border border-error/20 bg-error/5 p-4 text-error text-sm font-medium">
                {error.message}
            </div>
        );
    }

    if (!isLoading && data?.properties.length === 0 && sortBy === "None") {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-xs mt-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Heart className="size-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-text">No saved properties</h3>
                <p className="mt-2 max-w-sm text-sm text-text-secondary">
                    You haven't saved any properties yet. Browse listings and save the ones you love to find them here later.
                </p>
                <Link to="/properties" className="mt-6">
                    <Button variant="secondary">
                        Browse Properties
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* ---- Sort Dropdown ---- */}
            <div className="flex justify-start mt-6">
                <div className="w-full xs:w-56">
                    <label className="text-xs font-sans font-bold text-text uppercase tracking-wider mb-2 block">
                        Sort By
                    </label>
                    <Select
                        value={sortBy}
                        onValueChange={(value) => {
                            setSortBy(value ?? "None");
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text font-sans bg-card">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="font-sans"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
                {
                    isLoading ? (
                        Array.from({ length: 8 }).map((_, i: number) => (
                            <PropertyCardSkeleton key={i} />
                        ))
                    ) : (
                        data?.properties.map((property: Property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))
                    )
                }
            </div>

            {/* ---- Pagination ---- */}
            {
                data && data?.pagination?.totalPages > 0 && (
                    <div className="mt-10 flex items-center justify-center gap-5">
                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage <= 1 || isPlaceholderData}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm font-medium text-text">
                            Page {data.pagination.currentPage} of {data.pagination.totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage >= data.pagination.totalPages || isPlaceholderData}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default DashboardSavedProperties;

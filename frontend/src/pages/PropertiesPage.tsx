import Container from "@/components/Container";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3x3, MapPin } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllProperties } from "@/lib/apiCalls";
import PropertiesPageSkeleton from "@/components/properties/PropertiesPageSkeleton";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types/global";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sortOptions } from "@/lib/data";
import PropertiesMapView from "@/components/properties/PropertiesMapView";

const PropertiesPage = () => {
    // States
    const [currentTab, setCurrentTab] = useState<"properties" | "map">("properties");
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

    // Data fetching
    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: ["properties", page],
        queryFn: async () => fetchAllProperties(page),
        placeholderData: keepPreviousData
    });

    // Functions
    const goToPage = (page: number) => {
        setSearchParams({ page: String(page) });
        window.scrollTo({ top: 0 });
    }

    // Scrolling to the top of the page on first load
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    // Handling if user manually sets a page number in the url search params which doesn't exist
    useEffect(() => {
        if (data?.pagination && data.pagination.totalPages > 0 && page > data.pagination.totalPages) {
            goToPage(data.pagination.totalPages);
        }
    }, [data, page]);

    return (
        <main>
            <Container className="py-8 sm:py-12">
                {/* ---- Header Section ---- */}
                <div className="mb-8 sm:mb-10">
                    <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-text-secondary tracking-wide uppercase">
                        <a href="/" className="hover:text-text transition-colors">Home</a>
                        <span className="text-text">/</span>
                        <span className="text-text">Properties</span>
                    </nav>

                    <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text">
                        Browse Properties
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
                        Find your prime nest from our curated selection of properties.
                    </p>
                </div>

                {/* ---- Main Content Layout ---- */}
                {
                    isLoading ? (
                        <PropertiesPageSkeleton />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* ---- Filters Sidebar ---- */}
                            <div className="lg:col-span-1">
                                <PropertiesFilter />
                            </div>

                            {/* ---- Property Cards / Map ---- */}
                            <div className="lg:col-span-3">
                                {/* ---- Tabs / Sort ---- */}
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                    <div>
                                        <div>
                                            <h3 className="text-lg font-semibold font-sans text-text">Found Properties: {data.pagination.totalProperties}</h3>
                                        </div>
                                        <div className="mt-5">
                                            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "properties" | "map")}>
                                                <TabsList>
                                                    <TabsTrigger value="properties">
                                                        <Grid3x3 className="size-4" />
                                                        Grid View
                                                    </TabsTrigger>
                                                    <TabsTrigger value="map">
                                                        <MapPin className="size-4" />
                                                        Map View
                                                    </TabsTrigger>
                                                </TabsList>
                                            </Tabs>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-56">
                                        <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                                            Sort By
                                        </label>
                                        <Select
                                            defaultValue="None"
                                        >
                                            <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                                                <SelectValue placeholder="Sort By" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sortOptions.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>

                                {
                                    currentTab === "properties" ? (
                                        <>
                                            <div className="grid grid-cols-3 gap-6 mt-10">
                                                {data.data.map((property: Property) => (
                                                    <PropertyCard key={property._id} property={property} />
                                                ))}
                                            </div>

                                            {/* ---- Pagination ---- */}
                                            <div className="mt-10 flex items-center justify-center gap-5">
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    disabled={data.pagination.currentPage <= 1 || isPlaceholderData}
                                                    onClick={() => goToPage(page - 1)}
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
                                                    onClick={() => goToPage(page + 1)}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <PropertiesMapView properties={data.data} />
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </Container>
        </main>
    );
};

export default PropertiesPage;

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
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "None");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "Any");
    const [propertyStatus, setPropertyStatus] = useState(searchParams.get("propertyStatus") || "Available");
    const [listingType, setListingType] = useState(searchParams.get("listingType") || "Any");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [beds, setBeds] = useState(searchParams.get("beds") || "Any");
    const [baths, setBaths] = useState(searchParams.get("baths") || "Any");

    // Search Params
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const sortByParams = searchParams.get("sortBy") || "None";
    const locationParams = searchParams.get("location") || "";
    const propertyTypeParams = searchParams.get("propertyType") || "Any";
    const propertyStatusParams = searchParams.get("propertyStatus") || "Available";
    const listingTypeParams = searchParams.get("listingType") || "Any";
    const minPriceParams = searchParams.get("minPrice") || "";
    const maxPriceParams = searchParams.get("maxPrice") || "";
    const bedsParams = searchParams.get("beds") || "Any";
    const bathsParams = searchParams.get("baths") || "Any";

    // Data fetching
    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: [
            "properties",
            page,
            sortByParams,
            locationParams,
            propertyTypeParams,
            propertyStatusParams,
            listingTypeParams,
            minPriceParams,
            maxPriceParams,
            bedsParams,
            bathsParams
        ],
        queryFn: async () => fetchAllProperties(page, sortByParams),
        placeholderData: keepPreviousData
    });

    // Functions
    const goToPage = (page: number) => {
        setSearchParams({ page: String(page) });
        window.scrollTo({ top: 0 });
    }

    const applySort = (value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("sortBy", value);
            next.set("page", "1");
            return next;
        });
    }

    const applyFilters = () => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            // Location
            if (location.trim()) {
                next.set("location", location.trim());
            }
            else next.delete("location");

            // Property Type
            if (propertyType.trim()) {
                next.set("propertyType", propertyType.trim());
            }
            else next.delete("propertyType");

            // Property Status
            if (propertyStatus.trim()) {
                next.set("propertyStatus", propertyStatus.trim());
            }
            else next.delete("propertyStatus");

            // Listing Type
            if (listingType.trim()) {
                next.set("listingType", listingType.trim());
            }
            else next.delete("listingType");

            // Min Price
            if (!isNaN(parseInt(minPrice))) {
                next.set("minPrice", minPrice);
            }
            else next.delete("minPrice");

            // Max Price
            if (!isNaN(parseInt(maxPrice))) {
                next.set("maxPrice", maxPrice);
            }
            else next.delete("maxPrice");

            // Beds
            if (beds.trim()) {
                next.set("beds", beds.trim());
            }
            else next.delete("beds");

            // Baths
            if (baths.trim()) {
                next.set("baths", baths.trim());
            }
            else next.delete("baths");

            next.set("page", "1");

            return next;
        })
    }

    const resetFilters = () => {
        // Reset States
        setLocation("");
        setPropertyType("Any");
        setPropertyStatus("Available");
        setListingType("Any");
        setMinPrice("");
        setMaxPrice("");
        setBeds("Any");
        setBaths("Any");

        // Reset search params
        setSearchParams({});
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

    // Syncing the states with the search params
    useEffect(() => {
        setSortBy(searchParams.get("sortBy") || "None");
        setLocation(searchParams.get("location") || "");
        setPropertyType(searchParams.get("propertyType") || "Any");
        setPropertyStatus(searchParams.get("propertyStatus") || "Available");
        setListingType(searchParams.get("listingType") || "Any");
        setMinPrice(searchParams.get("minPrice") || "");
        setMaxPrice(searchParams.get("maxPrice") || "");
        setBeds(searchParams.get("beds") || "Any");
        setBaths(searchParams.get("baths") || "Any");
    }, [searchParams]);

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
                                <PropertiesFilter
                                    location={location}
                                    setLocation={setLocation}
                                    propertyType={propertyType}
                                    setPropertyType={setPropertyType}
                                    propertyStatus={propertyStatus}
                                    setPropertyStatus={setPropertyStatus}
                                    listingType={listingType}
                                    setListingType={setListingType}
                                    minPrice={minPrice}
                                    setMinPrice={setMinPrice}
                                    maxPrice={maxPrice}
                                    setMaxPrice={setMaxPrice}
                                    beds={beds}
                                    setBeds={setBeds}
                                    baths={baths}
                                    setBaths={setBaths}
                                    applyFilters={applyFilters}
                                    resetFilters={resetFilters}
                                />
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
                                                <TabsList className="gap-1">
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
                                            value={sortBy}
                                            onValueChange={(value) => {
                                                setSortBy(value ?? "None");
                                                applySort(value ?? "None");
                                            }}
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

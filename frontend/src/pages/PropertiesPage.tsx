import Container from "@/components/Container";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3x3, MapPin, SearchX } from "lucide-react";
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
import PropertiesFilterSidebar from "@/components/properties/PropertiesFilterSidebar";

const PropertiesPage = () => {
    // States
    const [currentTab, setCurrentTab] = useState<"properties" | "map">("properties");
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "None");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "Any");
    const [propertyStatus, setPropertyStatus] = useState(searchParams.get("propertyStatus") || "Any");
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
    const propertyStatusParams = searchParams.get("propertyStatus") || "Any";
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
        queryFn: async () => fetchAllProperties({
            page,
            sortBy: sortByParams,
            location: locationParams,
            propertyType: propertyTypeParams,
            propertyStatus: propertyStatusParams,
            listingType: listingTypeParams,
            minPrice: minPriceParams,
            maxPrice: maxPriceParams,
            beds: bedsParams,
            baths: bathsParams
        }),
        placeholderData: keepPreviousData
    });

    // Functions
    const goToPage = (page: number) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", String(page));
            return next;
        });
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
        setPropertyStatus("Any");
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
    }, [searchParams]);

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
        setPropertyStatus(searchParams.get("propertyStatus") || "Any");
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
                        <a href="/" className="hover:text-text active:text-text transition-colors">Home</a>
                        <span className="text-text">/</span>
                        <span className="text-text">Properties</span>
                    </nav>

                    <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text">
                        Browse Properties
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-text-secondary">
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
                            <div className="hidden lg:block lg:col-span-1">
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
                                <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-y-8">
                                    <div>
                                        <div>
                                            <h3 className="text-base xs:text-lg font-semibold font-sans text-text">Found Properties: {data?.pagination.totalProperties ?? 0}</h3>
                                        </div>
                                        <div className="mt-5 font-sans">
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

                                    <div className="w-full xs:w-56">
                                        <label className="text-xs font-sans font-bold text-text uppercase tracking-wider mb-2 block">
                                            Sort By
                                        </label>
                                        <Select
                                            value={sortBy}
                                            onValueChange={(value) => {
                                                setSortBy(value ?? "None");
                                                applySort(value ?? "None");
                                            }}
                                        >
                                            <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text font-sans">
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

                                {
                                    currentTab === "properties" ? (
                                        <>
                                            {data?.data.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-4 xs:px-6 py-10 xs:py-16 text-center mt-10">
                                                    <div className="flex size-12 xs:size-14 items-center justify-center rounded-full bg-error/10">
                                                        <SearchX className="size-6 xs:size-7 text-error" strokeWidth={1.75} />
                                                    </div>
                                                    <h3 className="mt-4 text-lg font-semibold text-text">No properties found</h3>
                                                    <p className="mt-1.5 max-w-sm text-sm text-text-secondary">
                                                        We couldn't find any properties matching your filters. Try adjusting your search criteria.
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        onClick={resetFilters}
                                                        className="mt-5"
                                                    >
                                                        Reset Filters
                                                    </Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-10">
                                                        {data?.data.map((property: Property) => (
                                                            <PropertyCard key={property._id} property={property} />
                                                        ))}
                                                    </div>

                                                    {/* ---- Pagination ---- */}
                                                    {data && data.pagination.totalPages > 0 && (
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
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <PropertiesMapView properties={data?.data ?? []} />
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </Container>

            {/* ---- Filter Sidebar For Smaller Devices ---- */}
            <PropertiesFilterSidebar
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
        </main>
    );
};

export default PropertiesPage;
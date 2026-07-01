import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bedsAndBathsFilterItems, propertyTypes } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type React from "react";

interface PropertiesFilterProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    propertyType: string;
    setPropertyType: React.Dispatch<React.SetStateAction<string>>;
    propertyStatus: string;
    setPropertyStatus: React.Dispatch<React.SetStateAction<string>>;
    listingType: string;
    setListingType: React.Dispatch<React.SetStateAction<string>>;
    minPrice: string;
    setMinPrice: React.Dispatch<React.SetStateAction<string>>;
    maxPrice: string;
    setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
    beds: string;
    setBeds: React.Dispatch<React.SetStateAction<string>>;
    baths: string;
    setBaths: React.Dispatch<React.SetStateAction<string>>;
    applyFilters: () => void;
    resetFilters: () => void;
}

const PropertiesFilter = ({
    location,
    setLocation,
    propertyType,
    setPropertyType,
    propertyStatus,
    setPropertyStatus,
    listingType,
    setListingType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    beds,
    setBeds,
    baths,
    setBaths,
    applyFilters,
    resetFilters
}: PropertiesFilterProps) => {
    // Functions
    const handlePriceChange = (value: string, setter: (v: string) => void) => {
        // Strip anything that isn't a digit
        let cleaned = value.replace(/[^0-9]/g, "");

        // Strip leading zeros (but allow a single "0")
        cleaned = cleaned.replace(/^0+(?=\d)/, "");

        setter(cleaned);
    };
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            {/* Filter Title */}
            <div className="flex items-center gap-2 text-base font-bold text-text border-b border-border pb-4 mb-5">
                <SlidersHorizontal className="size-4.5 text-secondary" />
                <span>Filters</span>
            </div>

            {/* Location Filter */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Location
                </label>
                <Input
                    type="text"
                    placeholder="City or ZIP code..."
                    className="w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            {/* Property Type Filter */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Property Type
                </label>
                <Select value={propertyType} onValueChange={(value) => setPropertyType(value ?? "Any")}>
                    <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        {propertyTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Property Status */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Property Status
                </label>
                <Select value={propertyStatus} onValueChange={(value) => setPropertyStatus(value ?? "Available")}>
                    <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                        <SelectValue placeholder="Available" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Listing Type */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Listing Type
                </label>
                <Select value={listingType} onValueChange={(value) => setListingType(value ?? "Any")}>
                    <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Any">Any</SelectItem>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Price Range
                </label>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="Min"
                            className="w-full"
                            value={minPrice}
                            onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
                        />
                    </div>
                    <span className="text-text-secondary font-medium">-</span>
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="Max"
                            className="w-full"
                            value={maxPrice}
                            onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
                        />
                    </div>
                </div>
            </div>

            {/* Bedrooms & Bathrooms Filter */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                        Bedrooms
                    </label>
                    <Select value={beds} onValueChange={(value) => setBeds(value ?? "Any")}>
                        <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            {bedsAndBathsFilterItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                        Bathrooms
                    </label>
                    <Select value={baths} onValueChange={(value) => setBaths(value ?? "Any")}>
                        <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            {bedsAndBathsFilterItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ---- Buttons ---- */}
            <div className="space-y-2">
                <Button
                    size="lg"
                    className="w-full"
                    onClick={applyFilters}
                >
                    <Search className="size-4" />
                    Apply Filters
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="w-full group"
                    onClick={resetFilters}
                >
                    <RotateCcw className="size-4 group-hover:-rotate-180 transition-transform duration-250 ease-in-out" />
                    Reset Filters
                </Button>
            </div>
        </div>
    )
}

export default PropertiesFilter
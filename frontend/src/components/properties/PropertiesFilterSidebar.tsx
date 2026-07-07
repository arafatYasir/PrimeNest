import { useState } from "react";
import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bedsAndBathsFilterItems, listingTypes, propertyStatuses, propertyTypes } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetHeader,
} from "@/components/ui/sheet";
import type React from "react";

interface PropertiesFilterSidebarProps {
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

const PropertiesFilterSidebar = ({
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
}: PropertiesFilterSidebarProps) => {
    // States
    const [open, setOpen] = useState(false);

    // Functions
    const handlePriceChange = (value: string, setter: (v: string) => void) => {
        let cleaned = value.replace(/[^0-9]/g, "");
        cleaned = cleaned.replace(/^0+(?=\d)/, "");
        setter(cleaned);
    };

    const handleApply = () => {
        applyFilters();
        setOpen(false);
    };

    const handleReset = () => {
        resetFilters();
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button size="icon-lg" className="fixed bottom-10 right-10 z-999 lg:hidden rounded-full size-11 shadow-lg">
                    <SlidersHorizontal className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full xs:max-w-[340px] sm:max-w-md p-0 z-999 flex flex-col h-full bg-card">
                <SheetHeader className="border-b border-border p-5 shrink-0">
                    <SheetTitle className="flex items-center gap-2 text-base font-bold text-text">
                        <SlidersHorizontal className="size-4.5 text-secondary" />
                        <span>Filters</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {/* Location Filter */}
                    <div>
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
                    <div>
                        <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                            Property Type
                        </label>
                        <Select value={propertyType} onValueChange={(value) => setPropertyType(value ?? "Any")}>
                            <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text">
                                <SelectValue placeholder={propertyType} />
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
                    <div>
                        <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                            Property Status
                        </label>
                        <Select value={propertyStatus} onValueChange={(value) => setPropertyStatus(value ?? "Any")}>
                            <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text">
                                <SelectValue placeholder={propertyStatus} />
                            </SelectTrigger>
                            <SelectContent>
                                {propertyStatuses.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Listing Type */}
                    <div>
                        <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                            Listing Type
                        </label>
                        <Select value={listingType} onValueChange={(value) => setListingType(value ?? "Any")}>
                            <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text">
                                <SelectValue placeholder={listingType} />
                            </SelectTrigger>
                            <SelectContent>
                                {listingTypes.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                                Bedrooms
                            </label>
                            <Select value={beds} onValueChange={(value) => setBeds(value ?? "Any")}>
                                <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text">
                                    <SelectValue placeholder={beds} />
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
                                <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text">
                                    <SelectValue placeholder={baths} />
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
                </div>

                {/* ---- Buttons ---- */}
                <div className="p-5 border-t border-border space-y-2 shrink-0 bg-card">
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={handleApply}
                    >
                        <Search className="size-4" />
                        Apply Filters
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full group"
                        onClick={handleReset}
                    >
                        <RotateCcw className="size-4 group-hover:-rotate-180 transition-transform duration-250 ease-in-out" />
                        Reset Filters
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default PropertiesFilterSidebar;
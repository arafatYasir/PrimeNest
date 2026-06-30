import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bedsAndBathsFilterItems, propertyTypes } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PropertiesFilter = () => {
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
                />
            </div>

            {/* Property Type Filter */}
            <div className="mb-5">
                <label className="text-xs font-bold text-text uppercase tracking-wider mb-2 block">
                    Property Type
                </label>
                <Select defaultValue="Any">
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
                <Select defaultValue="Available">
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
                <Select defaultValue="For Sale">
                    <SelectTrigger className="w-full h-10! rounded-xl border-border px-3.5 text-sm! text-text">
                        <SelectValue placeholder="For Sale" />
                    </SelectTrigger>
                    <SelectContent>
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
                            placeholder="Min"
                            className="w-full"
                        />
                    </div>
                    <span className="text-text-secondary font-medium">-</span>
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Max"
                            className="w-full"
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
                    <Select defaultValue="Any">
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
                    <Select defaultValue="Any">
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
                >
                    <Search className="size-4" />
                    Apply Filters
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="w-full group"
                >
                    <RotateCcw className="size-4 group-hover:-rotate-180 transition-transform duration-250 ease-in-out" />
                    Reset Filters
                </Button>
            </div>
        </div>
    )
}

export default PropertiesFilter
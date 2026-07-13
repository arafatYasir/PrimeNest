import type { Property } from "@/types/global";
import { Bed, Bath, Maximize, MapPin, Calendar, Home, NotebookText } from "lucide-react";

export default function PropertySummary({ property }: { property: Property }) {
    const {
        title,
        description,
        propertyType,
        listingType,
        status,
        price,
        area,
        beds,
        baths,
        location,
        yearBuilt,
        createdAt,
        updatedAt,
    } = property;

    // Formatter helpers
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateInput: Date | string) => {
        const date = new Date(dateInput);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    const statusColors = {
        Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
        Sold: "bg-gray-50 text-gray-700 border-gray-200",
        Pending: "bg-amber-50 text-amber-700 border-amber-200",
    }[status] || "bg-blue-50 text-blue-700 border-blue-200";

    return (
        <div className="space-y-6 xs:space-y-8">
            {/* ---- Top Header Section: Title, Price, Status ---- */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 border-b border-border">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold border ${statusColors}`}>
                            {status}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-primary/5 text-text border border-border px-2.5 py-0.5 text-xs font-semibold">
                            {listingType}
                        </span>
                    </div>
                    <h1 className="font-heading text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text leading-tight">
                        {title}
                    </h1>
                    <p className="flex items-start gap-1.5 text-xs xs:text-sm text-text-secondary">
                        <MapPin className="size-3.5 xs:size-4 shrink-0 xs:mt-0.5 text-secondary" />
                        <span>{location.fullAddress}</span>
                    </p>
                </div>

                <p className="font-heading text-2xl xs:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                    {formatCurrency(price)}

                    {listingType === "For Rent" && <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-text">/mo</span>}
                </p>
            </div>

            {/* ---- Quick Key Stats ---- */}
            <div className="grid grid-cols-3 divide-x divide-border bg-section/50 rounded-xl py-4 xs:px-4 border border-border/50 text-center">
                <div className="flex flex-col items-center justify-center xs:p-2">
                    <div className="flex items-center gap-2">
                        <Bed className="size-4 xs:size-5 text-secondary" />
                        <span className="text-base xs:text-lg md:text-xl font-bold text-text">{beds ?? "—"}</span>
                    </div>
                    <span className="text-[10px] xs:text-xs font-medium text-text-secondary mt-1">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center xs:p-2">
                    <div className="flex items-center gap-2">
                        <Bath className="size-4 xs:size-5 text-secondary" />
                        <span className="text-base xs:text-lg md:text-xl font-bold text-text">{baths ?? "—"}</span>
                    </div>
                    <span className="text-[10px] xs:text-xs font-medium text-text-secondary mt-1">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center xs:p-2">
                    <div className="flex items-center gap-2">
                        <Maximize className="size-4 xs:size-5 text-secondary" />
                        <span className="text-base xs:text-lg md:text-xl font-bold text-text">{area.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] xs:text-xs font-medium text-text-secondary mt-1">Square Feet</span>
                </div>
            </div>

            {/* ---- Detailed Property Summary Grid ---- */}
            <div>
                <h2 className="font-heading text-base xs:text-lg font-bold text-text mb-4 flex items-center gap-2 border-b border-border pb-2">
                    <Home className="size-4.5 xs:size-5 text-secondary" />
                    Property Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-xs xs:text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-text-secondary font-medium">Property Type</span>
                        <span className="text-text font-semibold">{propertyType}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-text-secondary font-medium">Year Built</span>
                        <span className="text-text font-semibold">{yearBuilt}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-text-secondary font-medium">Area Size</span>
                        <span className="text-text font-semibold">{area.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-text-secondary font-medium">Listing Date</span>
                        <span className="text-text font-semibold flex items-center gap-1">
                            <Calendar className="size-3 xs:size-3.5 text-text-secondary/70" />
                            {formatDate(createdAt)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/40">
                        <span className="text-text-secondary font-medium">Last Updated</span>
                        <span className="text-text font-semibold flex items-center gap-1">
                            <Calendar className="size-3 xs:size-3.5 text-text-secondary/70" />
                            {formatDate(updatedAt)}
                        </span>
                    </div>
                </div>
            </div>

            {/* ---- Property Description ---- */}
            <div>
                <h2 className="font-heading text-base xs:text-lg font-bold text-text mb-4 flex items-center gap-2 border-b border-border pb-2">
                    <NotebookText className="size-4.5 xs:size-5 text-secondary" />
                    Description
                </h2>
                <p className="text-text-secondary leading-relaxed text-sm xs:text-base whitespace-pre-line">
                    {description}
                </p>
            </div>
        </div>
    );
}

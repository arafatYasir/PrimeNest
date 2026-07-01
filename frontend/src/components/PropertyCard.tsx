import type { Property } from "@/types/global";
import { Bath, Bed, MapPin, Maximize, type LucideIcon } from "lucide-react";

interface StatItemTypes {
    icon: LucideIcon;
    value: number;
    unit: string;
}

const STATUS_STYLES = {
    Available: {
        dot: "bg-emerald-500",
        text: "text-emerald-600",
        bg: "bg-card",
    },
    Sold: {
        dot: "bg-gray-400",
        text: "text-gray-500",
        bg: "bg-card",
    },
    Pending: {
        dot: "bg-amber-500",
        text: "text-amber-600",
        bg: "bg-card",
    },
};

const formatPrice = (price: number, listingType: string) =>
    `$${price.toLocaleString()}${listingType === "For Rent" ? "/mo" : ""}`;

function StatItem({ icon: Icon, value, unit }: StatItemTypes) {
    return (
        <div className="flex items-center gap-1.5">
            <Icon className="h-[18px] w-[18px] text-text-secondary/70" strokeWidth={1.5} />
            <span className="text-sm font-medium text-text">{value ?? "—"}</span>
            <span className="text-xs text-text-secondary">{unit}</span>
        </div>
    );
}

function PropertyCard({ property }: { property: Property }) {
    const {
        _id,
        title,
        propertyType,
        listingType,
        status,
        images,
        price,
        area,
        beds,
        baths,
        location,
    } = property;

    const coverImage = images?.[0];
    const cityLine = [location?.city, location?.country]
        .filter(Boolean)
        .join(", ");
    const statusStyle = STATUS_STYLES[status];

    return (
        <a
            href={`/properties/${_id ?? ""}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border/60
                 transition-all duration-300 ease-out
                 hover:shadow-lg hover:shadow-black/6 hover:border-border
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            {/* ---- Image ---- */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-section">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out
                       group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">
                        No image available
                    </div>
                )}

                {/* Overlay gradient for better badge readability */}
                <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/20 to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
                    <span
                        className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1
                       text-xs font-semibold tracking-wide text-gray-800 shadow-sm"
                    >
                        {propertyType}
                    </span>

                    <span
                        className={`flex items-center gap-1.5 rounded-lg backdrop-blur-sm px-2.5 py-1
                          text-xs font-semibold shadow-sm ${statusStyle.bg} ${statusStyle.text}`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                        {status}
                    </span>

                </div>
            </div>

            {/* ---- Body ---- */}
            <div className="flex flex-1 flex-col p-5">
                {/* Price */}
                <span className="font-heading text-[22px] font-bold tracking-tight text-text leading-tight">
                    {formatPrice(price, listingType)}
                </span>

                {/* Title */}
                <h3 className="mt-2 line-clamp-1 text-[15px] font-semibold text-text/90 leading-snug">
                    {title}
                </h3>

                {/* Location */}
                <p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
                    <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                    <span className="line-clamp-1">{cityLine}</span>
                </p>

                {/* Divider + Stats */}
                <div className="mt-auto pt-4">
                    <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                        {
                            beds && (
                                <StatItem icon={Bed} value={beds} unit={beds > 1 ? "Beds" : "Bed"} />
                            )
                        }

                        {
                            baths && (
                                <StatItem icon={Bath} value={baths} unit={baths > 1 ? "Baths" : "Bath"} />
                            )
                        }

                        <StatItem
                            icon={Maximize}
                            value={area}
                            unit="sqft"
                        />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default PropertyCard;
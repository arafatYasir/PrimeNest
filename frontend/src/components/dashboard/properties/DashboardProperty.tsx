import type { Property } from "@/types/global";
import { Bath, Bed, MapPin, Maximize, MoreVertical, Eye, Edit3, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardPropertyProps {
  property: Property;
  onDelete?: (id: string) => void;
}

const STATUS_STYLES = {
  Available: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  Sold: {
    dot: "bg-gray-400",
    text: "text-gray-500",
    bg: "bg-gray-100",
  },
  Pending: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-500/10",
  },
};

const formatPrice = (price: number, listingType: string) =>
  `$${price.toLocaleString()}${listingType === "For Rent" ? "/mo" : ""}`;

export default function DashboardProperty({ property, onDelete }: DashboardPropertyProps) {
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
  // const locationString = [location?.city, location?.country].filter(Boolean).join(", ");
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.Available;

  return (
    <div
      className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/5"
    >
      {/* ---- Thumbnail Image ---- */}
      <div className="relative aspect-video w-full md:w-36 md:h-24 shrink-0 overflow-hidden rounded-lg bg-section">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-text-secondary">
            No image
          </div>
        )}
        
        {/* Mobile Status Badge Overlay */}
        <div className="absolute top-2 left-2 md:hidden">
          <span
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}
          >
            <span className={`h-1 w-1 rounded-full ${statusStyle.dot}`} />
            {status}
          </span>
        </div>
      </div>

      {/* ---- Main Info Column ---- */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {propertyType}
          </span>
          <span className="inline-flex items-center rounded-md bg-secondary/5 px-2 py-0.5 text-[10px] font-semibold text-secondary">
            {listingType}
          </span>
          {/* Desktop Status Badge */}
          <span
            className={`hidden md:inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}
          >
            <span className={`h-1 w-1 rounded-full ${statusStyle.dot}`} />
            {status}
          </span>
        </div>

        <h3 className="mt-2 font-heading text-base font-bold tracking-tight text-text truncate">
          {title}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-text-secondary/70" strokeWidth={1.5} />
          <span className="truncate">{location.fullAddress}</span>
        </p>
      </div>

      {/* ---- Stats & Price Section ---- */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-border/50 pt-3 md:pt-0 shrink-0">
        {/* Specs (Beds/Baths/Sqft) */}
        <div className="flex items-center gap-3 text-xs text-text-secondary font-medium">
          {beds && (
            <div className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-text-secondary/60" strokeWidth={1.5} />
              <span>{beds} <span className="text-[10px] text-text-secondary/70">Beds</span></span>
            </div>
          )}
          {baths && (
            <div className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-text-secondary/60" strokeWidth={1.5} />
              <span>{baths} <span className="text-[10px] text-text-secondary/70">Baths</span></span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5 text-text-secondary/60" strokeWidth={1.5} />
            <span>{area.toLocaleString()} <span className="text-[10px] text-text-secondary/70">sqft</span></span>
          </div>
        </div>

        {/* Price */}
        <span className="font-heading text-lg font-extrabold text-text leading-none md:mt-2">
          {formatPrice(price, listingType)}
        </span>
      </div>

      {/* ---- Actions Dropdown Menu ---- */}
      <div className="absolute top-4 right-4 md:relative md:top-auto md:right-auto shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-text-secondary/70 hover:text-text rounded-lg border border-transparent hover:border-border/60 hover:bg-card shadow-none">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          } />
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem render={<a href={`/properties/${_id}`} />}>
              <Eye className="mr-2 h-3.5 w-3.5 text-text-secondary" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<a href={`/dashboard/edit-property/${_id}`} />}>
              <Edit3 className="mr-2 h-3.5 w-3.5 text-text-secondary" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-error hover:bg-error/5 focus:bg-error/5 focus:text-error!"
              onClick={() => onDelete?.(_id)}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5 text-error/80" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

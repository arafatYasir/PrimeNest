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
import { Link } from "react-router";

interface DashboardPropertyProps {
  property: Property;
  onDelete: (id: string) => void;
}

const STATUS_STYLES = {
  Available: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    bg: "bg-card md:bg-emerald-50",
  },
  Sold: {
    dot: "bg-gray-400",
    text: "text-gray-500",
    bg: "bg-card md:bg-gray-100",
  },
  Pending: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    bg: "bg-card md:bg-amber-50",
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
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.Available;

  return (
    <div
      className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-sm"
    >
      {/* ---- Thumbnail Image ---- */}
      <div className="relative aspect-video w-full md:w-36 md:h-24 shrink-0 overflow-hidden rounded-lg bg-section">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-text-secondary">
            No image
          </div>
        )}

        {/* ---- Mobile Status Badge Overlay ---- */}
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
          <span className="rounded-md bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {propertyType}
          </span>
          <span className="rounded-md bg-secondary/5 px-2 py-0.5 text-[10px] font-semibold text-secondary">
            {listingType}
          </span>

          {/* ---- Desktop Status Badge ---- */}
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
          <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
          <span className="truncate font-medium">{location.fullAddress}</span>
        </p>
      </div>

      {/* ---- Stats & Price Section ---- */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-border/50 pt-3 md:pt-0 shrink-0">
        {/* ---- Specs (Beds/Baths/Sqft) ---- */}
        <div className="flex items-center gap-3 text-xs text-text-secondary font-medium">
          {beds && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Bed className="size-4" strokeWidth={1.5} />
              <span>{beds} <span className="text-xs">Beds</span></span>
            </div>
          )}
          {baths && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Bath className="size-4" strokeWidth={1.5} />
              <span>{baths} <span className="text-xs">Baths</span></span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Maximize className="size-4" strokeWidth={1.5} />
            <span>{area.toLocaleString()} <span className="text-xs">sqft</span></span>
          </div>
        </div>

        {/*  ---- Price ---- */}
        <span className="font-heading text-lg font-extrabold text-text leading-none md:mt-2">
          {formatPrice(price, listingType)}
        </span>
      </div>

      {/* ---- Actions Dropdown Menu ---- */}
      <div className="absolute top-4 right-4 md:relative md:top-auto md:right-auto shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-lg">
              <MoreVertical className="size-4" />
            </Button>
          } />

          <DropdownMenuContent align="end" sideOffset={2}>
            <DropdownMenuItem render={<Link to={`/properties/${_id}`} />}>
              <Eye className="mr-2 h-3.5 w-3.5 text-text" />
              <span className="text-text">View</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Edit3 className="mr-2 h-3.5 w-3.5 text-text" />
              <span className="text-text">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-error group focus:bg-error/5 cursor-pointer"
              onClick={() => onDelete(_id)}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5 text-error group-hover:text-error!" />
              <span className="group-hover:text-error!">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

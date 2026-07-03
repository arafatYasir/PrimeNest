import type { Property } from "@/types/global";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon paths for bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const formatPrice = (price: number, listingType: string) =>
    `$${price.toLocaleString()}${listingType === "For Rent" ? "/mo" : ""}`;

const PropertiesMapView = ({ properties }: { properties: Property[] }) => {
    const OuterBounds: [[number, number], [number, number]] = [
  [24.396308, -125.0],
  [70.0, -66.93457]
];

    return (
        <MapContainer
            className="w-full h-[550px] mt-10 rounded-xl"
            center={[39.8283, -98.5795]}
            zoom={4}
            minZoom={3}
            scrollWheelZoom={true}
            maxBounds={OuterBounds}
            maxBoundsViscosity={1.0}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {properties.map((property) => (
                <Marker position={[property.location.lat, property.location.lon]}>
                    <Popup className="property-popup" closeButton={false} maxWidth={260} minWidth={260}>
                        <div className="w-[260px] overflow-hidden bg-card font-sans">
                            {/* ---- Image ---- */}
                            <div className="relative h-30 w-full">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[11px] font-semibold text-white">
                                    {property.listingType}
                                </span>
                                <span
                                    className={`absolute right-2 top-2 rounded px-2 py-0.5 text-[11px] font-semibold text-white ${property.status === "Available"
                                        ? "bg-success"
                                        : property.status === "Pending"
                                            ? "bg-warning"
                                            : "bg-text"
                                        }`}
                                >
                                    {property.status}
                                </span>
                            </div>

                            {/* ---- Body ---- */}
                            <div className="space-y-2 mt-1">
                                <p className="font-heading text-lg font-bold text-primary m-0! mb-1!">
                                    {formatPrice(property.price, property.listingType)}
                                </p>

                                <h3 className="truncate text-sm font-semibold text-text">
                                    {property.title}
                                </h3>

                                <div className="flex items-center gap-1 text-text-secondary">
                                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate text-xs">
                                        {property.location.city}, {property.location.country}
                                    </span>
                                </div>

                                {/* ---- Specifications ---- */}
                                <div className="flex items-center gap-3 border-t border-border pt-2 text-xs text-text">
                                    {property.beds != null && (
                                        <span className="flex items-center gap-1">
                                            <BedDouble className="h-3.5 w-3.5 text-text-secondary" />
                                            {property.beds}
                                        </span>
                                    )}
                                    {property.baths != null && (
                                        <span className="flex items-center gap-1">
                                            <Bath className="h-3.5 w-3.5 text-text-secondary" />
                                            {property.baths}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Maximize className="h-3.5 w-3.5 text-text-secondary" />
                                        {property.area.toLocaleString()} sqft
                                    </span>
                                </div>

                                {/* ---- Button ---- */}
                                <Link
                                    to={`/properties/${property._id}`}

                                >
                                    <Button size="lg" className="w-full">View details</Button>
                                </Link>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default PropertiesMapView
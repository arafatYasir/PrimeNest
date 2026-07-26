import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "@/components/ui/button";

// Fix standard Leaflet marker icon issue in Webpack/Vite setups
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

interface PropertyLocationMapProps {
    lat?: number;
    lon?: number;
    onLocationSelect: (lat: number, lon: number) => void;
    onClearLocation: () => void;
}

const MapClickHandler = ({ onSelect }: { onSelect: (lat: number, lon: number) => void }) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

export const PropertyLocationMap = ({
    lat,
    lon,
    onLocationSelect,
    onClearLocation,
}: PropertyLocationMapProps) => {
    const hasSelection = typeof lat === "number" && typeof lon === "number" && lat !== 0 && lon !== 0;

    const defaultCenter: [number, number] = hasSelection ? [lat, lon] : [34.0522, -118.2437]; // Los Angeles default center
    const outerBounds: [[number, number], [number, number]] = [
        [24.396308, -125.000000],
        [49.384358, -66.934570],
    ]

    return (
        <div className="space-y-2.5">
            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-border bg-section shadow-xs">
                <MapContainer
                    center={defaultCenter}
                    zoom={10}
                    maxBounds={outerBounds}
                    maxBoundsViscosity={1.0}
                    minZoom={4}
                    className="w-full h-full z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onSelect={onLocationSelect} />
                    {hasSelection && <Marker position={[lat, lon]} />}
                </MapContainer>
            </div>

            <div className="flex items-center justify-between text-xs font-medium px-1">
                <span className={hasSelection ? "text-text" : "text-text-secondary"}>
                    {hasSelection ? "Location selected." : "No location selected."}
                </span>

                {hasSelection && (
                    <Button
                        onClick={onClearLocation}
                        variant="destructive"
                    >
                        Clear selection
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PropertyLocationMap;

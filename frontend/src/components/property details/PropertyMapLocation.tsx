import { MapContainer, Marker, TileLayer } from "react-leaflet"
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

interface PropertyMapLocationProps {
    lat: number;
    lon: number;
}

const PropertyMapLocation = ({ lat, lon }: PropertyMapLocationProps) => {
    const outerBounds: [[number, number], [number, number]] = [
        [lat - 1, lon - 1],
        [lat + 1, lon + 1]
    ];

    return (
        <MapContainer
            className="w-full h-[300px] mt-8 rounded-xl"
            center={[lat, lon]}
            zoom={19}
            minZoom={7}
            scrollWheelZoom={true}
            maxBounds={outerBounds}
            maxBoundsViscosity={1.0}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                updateWhenZooming={false}
                updateWhenIdle={true}
                keepBuffer={4}
                maxNativeZoom={19}
                maxZoom={19}
            />

            {/* ---- Property Marker ---- */}
            <Marker position={[lat, lon]} />
        </MapContainer>
    )
}

export default PropertyMapLocation
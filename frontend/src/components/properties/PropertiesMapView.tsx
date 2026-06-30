import { MapContainer, TileLayer } from "react-leaflet";

const PropertiesMapView = () => {
    const usOuterBounds: [[number, number], [number, number]] = [
        [24.396308, -125.0],
        [49.384358, -66.93457]
    ];

    return (
        <MapContainer
            className="w-full h-[550px] mt-10 rounded-xl"
            center={[39.8283, -98.5795]}
            zoom={4}
            scrollWheelZoom={true}
            maxBounds={usOuterBounds}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default PropertiesMapView
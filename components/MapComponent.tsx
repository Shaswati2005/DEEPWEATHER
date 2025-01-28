import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Fix for Leaflet's broken icons due to Webpack/Next.js config
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center?: [number, number];
    zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ center = [51.505, -0.09], zoom = 13 }) => {
    const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    console.log(mapInstance);

    useEffect(() => {
        if (mapRef.current) {
            setMapInstance(mapRef.current);
        }
    }, [])

    const LocationMarker = () => {
        const map = useMap()
        useEffect(() => {
            map.locate().on("locationfound", function (e) {
                map.flyTo(e.latlng, map.getZoom())
                const radius = e.accuracy / 2;
                L.circle(e.latlng, radius).addTo(map)
            })
        }, [map])
        return null;
    }

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }} ref={mapRef}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>
                    A simple Popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <LocationMarker/>
        </MapContainer>
    );
};

export default MapComponent;
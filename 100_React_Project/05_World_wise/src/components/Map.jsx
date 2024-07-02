import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import useCities from "../hooks/useCities";

const Map = () => {
	const [searchQuery] = useSearchParams();
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([38.727881642324164, -9.140900099907554]);

	const lat = searchQuery.get("lat");
	const lng = searchQuery.get("lng");

	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	return (
		<div className={styles.mapContainer}>
			<MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>{city.cityName}</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
			</MapContainer>
		</div>
	);
};
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function onMaplocation() {
	useMapEvents({
		click,
	});
}

export default Map;

import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import useCities from "../hooks/useCities";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

const Map = () => {
	const [searchQuery] = useSearchParams();
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([38.727881642324164, -9.140900099907554]);
	const { isLoading: geoLoading, position: geoPosition, getPosition } = useGeolocation();

	const lat = searchQuery.get("lat");
	const lng = searchQuery.get("lng");

	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	useEffect(
		function () {
			if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
		},
		[geoPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geoPosition && (
				<Button type="position" onclick={getPosition}>
					{geoLoading ? "Loading.." : "Get My Location"}
				</Button>
			)}
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
				<OnMaplocation />
			</MapContainer>
		</div>
	);
};
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function OnMaplocation() {
	const navigate = useNavigate();

	useMapEvents({
		click: function (e) {
			console.log(e);
			navigate(`form?lat${e.latlng.lat}&${e.latlng.lng}`);
		},
	});
}

export default Map;

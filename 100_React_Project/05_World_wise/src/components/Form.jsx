// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
	const [cityName, setCityName] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [lat, lng] = useUrlPosition();
	const [positionData, setPositionData] = useState({
		loading: false,
		city: "",
		countryCode: "",
		locality: "",
		emoji: "",
		error: "",
	});

	useEffect(() => {
		async function fetchCityData() {
			try {
				setPositionData((prevState) => ({ ...prevState, loading: true }));
				setPositionData((prevState) => ({ ...prevState, error: "" }));
				const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
				const cityData = await res.json();
				if (!cityData.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😚");
				console.log(cityData);
				setPositionData((prevState) => ({
					...prevState,
					city: cityData.city,
					countryCode: cityData.countryCode,
					locality: cityData.locality,
					loading: false,
					emoji: convertToEmoji(cityData.countryCode),
				}));
			} catch (error) {
				setPositionData((prevState) => ({ ...prevState, error: error.message }));
			} finally {
				setPositionData((prevState) => ({ ...prevState, loading: false }));
			}
		}
		fetchCityData();
	}, [lat, lng]);
	if (positionData.error) return <Message message={positionData.error} />;
	if (positionData.loading) return <Spinner />;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={positionData.locality || positionData.city || ""} />
				<span className={styles.flag}>{positionData.emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<input id="date" onChange={(e) => setDate(e.target.value)} value={date} />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;

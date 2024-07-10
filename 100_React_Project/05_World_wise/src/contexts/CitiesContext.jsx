import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isloading, setIsloading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchData() {
			try {
				setIsloading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCities(data);
			} catch (error) {
				console.log(error.message);
			} finally {
				setIsloading(false);
			}
		}

		fetchData();
	}, []);

	async function fetchCityData(id) {
		try {
			setIsloading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			setCurrentCity(data);
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsloading(false);
		}
	}
	async function createCity(newCity) {
		try {
			setIsloading(true);
			const response = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setCities((cities) => [...cities, data]);
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsloading(false);
		}
	}
	async function deleteCity(id) {
		try {
			setIsloading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsloading(false);
		}
	}
	return (
		<CitiesContext.Provider value={{ cities, isloading, currentCity, fetchCityData, createCity, deleteCity }}>{children}</CitiesContext.Provider>
	);
}

export { CitiesProvider, CitiesContext };

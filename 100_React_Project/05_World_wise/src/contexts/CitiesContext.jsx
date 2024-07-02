import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
	return <CitiesContext.Provider value={{ cities, isloading, currentCity, fetchCityData }}>{children}</CitiesContext.Provider>;
}
CitiesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export { CitiesProvider, CitiesContext };

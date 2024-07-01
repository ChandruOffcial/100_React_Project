import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
const BASE_URL = "http://localhost:8000";

const App = () => {
	const [cities, setCities] = useState([]);
	const [isloading, setIsloading] = useState(false);

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

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<CityList cities={cities} isloading={isloading} />} />
					<Route path="cities" element={<CityList cities={cities} isloading={isloading} />} />
					<Route path="countries" element={<CountryList cities={cities} isloading={isloading} />} />
					<Route path="form" element={<p>form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

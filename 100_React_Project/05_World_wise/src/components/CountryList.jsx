import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import PropTypes from "prop-types";

const CountryList = ({ cities, isloading }) => {
	if (isloading) return <Spinner />;
	if (!cities.length) return <Message message="Add Your first Country by clicking on the map" />;

	const countries = cities.reduce((arr, cur) => {
		if (!arr.map((item) => item.country).includes(cur.country)) {
			return [...arr, { country: cur.country, emoji: cur.emoji }];
		} else {
			return arr;
		}
	}, []);
	console.log(countries);

	return (
		<ul className={styles.countryList}>
			{countries.map((country, i) => (
				<CountryItem key={i} country={country} />
			))}
		</ul>
	);
};

CountryList.propTypes = {
	cities: PropTypes.arrayOf(PropTypes.object).isRequired,
	isloading: PropTypes.bool.isRequired,
};

export default CountryList;

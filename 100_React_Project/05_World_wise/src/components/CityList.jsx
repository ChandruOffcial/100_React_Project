import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import PropTypes from "prop-types";

const CityList = ({ cities, isloading }) => {
	if (isloading) return <Spinner />;
	if (!cities.length) return <Message message="Add Your first city by clicking on the map" />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
};

CityList.propTypes = {
	cities: PropTypes.arrayOf(PropTypes.object).isRequired,
	isloading: PropTypes.bool.isRequired,
};

export default CityList;

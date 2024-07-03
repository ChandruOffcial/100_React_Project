import { useSearchParams } from "react-router-dom";

const useUrlPosition = () => {
	const [searchQuery] = useSearchParams();
	const lat = searchQuery.get("lat");
	const lng = searchQuery.get("lng");

	return [lat, lng];
};

export default useUrlPosition;

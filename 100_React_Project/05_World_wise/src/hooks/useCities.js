import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export default function useCities() {
	const useCities = useContext(CitiesContext);
	if (useCities === undefined) throw new Error("Cities Context was used Outsie The CitiesProvider");
	return useCities;
}

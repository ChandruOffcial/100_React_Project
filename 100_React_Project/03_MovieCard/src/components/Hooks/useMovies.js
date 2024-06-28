import { useEffect, useState } from "react";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			const controller = new AbortController();
			async function dataFetch() {
				try {
					setError("");
					setIsloading(true);

					const request = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=6de2aa48&s=${query}`, { signal: controller.signal });
					if (!request.ok) {
						throw new Error("Somethink In wrong in Fetch Data ");
					}
					const res = await request.json();
					if (res.Response === "False") {
						throw new Error("Movie Not Found");
					}
					const data = res.Search;
					setMovies(data);
				} catch (error) {
					if (error.name !== "AbortError") {
						setError(error.message);
					}
				} finally {
					setIsloading(false);
				}
			}
			if (query.length === 0) {
				setError("");
				setMovies([]);
				return;
			}
			dataFetch();
			return function () {
				controller.abort();
			};
		},
		[query]
	);
	return { error, isLoading, movies };
}

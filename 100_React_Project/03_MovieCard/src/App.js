import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { Logo } from "./components/navbar/Navbar";
import { Search } from "./components/navbar/Navbar";
import { Result } from "./components/navbar/Navbar";
import Box from "./components/main/ListBox";
import MovieList from "./components/main/MovieList";
import CardMovie from "./components/main/CardMovie";
import Summary from "./components/main/Summary";
import MovieDetails from "./components/main/MovieDetails";
import { ErrorMessage, Loader } from "./components/main/Helper";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("Bad ");
	const [selectedID, setSelectedID] = useState(null);

	useEffect(
		function () {
			async function dataFetch() {
				try {
					setError("");
					setIsloading(true);

					const request = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=6de2aa48&s=${query}`);
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
					setError(error.message);
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
		},
		[query]
	);

	function handelSelected(id) {
		setSelectedID(() => (id === selectedID ? null : id));
	}
	function handleCloseMovie() {
		setSelectedID(null);
	}

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<Result movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && <MovieList movies={movies} setSelectedID={handelSelected} />}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedID ? (
						<MovieDetails id={selectedID} handleCloseMovie={handleCloseMovie} />
					) : (
						<>
							<Summary watched={watched} />
							<CardMovie watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

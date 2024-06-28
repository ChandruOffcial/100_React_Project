import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { Logo, Search, Result } from "./components/navbar/Navbar";
import Box from "./components/main/ListBox";
import MovieList from "./components/main/MovieList";
import CardMovie from "./components/main/CardMovie";
import Summary from "./components/main/Summary";
import MovieDetails from "./components/main/MovieDetails";
import { ErrorMessage, Loader } from "./components/main/Helper";
import { useMovies } from "./components/Hooks/useMovies";
import { useLocalStorageState } from "./components/Hooks/useLocalStorageState";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedID, setSelectedID] = useState(null);
	const { movies, error, isLoading } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], "watched");

	function handleRemoveWatchList(id) {
		setWatched((watched) => watched.filter((item) => item.imdbID !== id));
	}

	function handleWatched(newMovie) {
		setWatched((watched) => [...watched, newMovie]);
	}

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
						<MovieDetails id={selectedID} handleCloseMovie={handleCloseMovie} watchedMovie={handleWatched} watched={watched} />
					) : (
						<>
							<Summary watched={watched} />
							<CardMovie watched={watched} handleRemoveWatchList={handleRemoveWatchList} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

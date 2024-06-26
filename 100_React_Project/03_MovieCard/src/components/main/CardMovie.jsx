import WatchedMovieList from "./WatchedMovieList";

export default function CardMovie({ watched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovieList key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
}

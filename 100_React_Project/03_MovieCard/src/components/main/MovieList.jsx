import Movie from "./Movie";

export default function MovieList({ movies, setSelectedID }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie key={movie.imdbID} movie={movie} setSelectedID={setSelectedID} />
			))}
		</ul>
	);
}

import { Loader, ErrorMessage } from "./Helper";
import { useEffect, useState } from "react";
import StartRating from "./Start";

export default function MovieDetails({ id, handleCloseMovie }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			async function getMovieDetails() {
				try {
					setIsLoading(true);
					setError("");
					const request = await fetch(`http://www.omdbapi.com/?apikey=6de2aa48&i=${id}`);
					if (!request.ok) {
						throw new Error("Somethink In wrong in Fetch Data ");
					}
					const res = await request.json();

					setMovieDetails(res);
				} catch (error) {
					setError(error.message);
				} finally {
					setIsLoading(false);
				}
			}

			getMovieDetails();
		},
		[id]
	);

	function Details({ handleCloseMovie }) {
		const {
			Title: title,
			Year: year,
			Poster: poster,
			Runtime: runtime,
			imdbRating,
			Plot: plot,
			Released: released,
			Actors: actors,
			Director: director,
			Genre: genre,
		} = movieDetails;
		return (
			<>
				<div className="details">
					<header>
						<button className="btn-back" onClick={handleCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movieDetails} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							<StartRating color="gold" size={25} maxRating={10} />
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</div>
			</>
		);
	}
	return <>{isLoading === "true" ? <Loader /> : error.length !== 0 ? <ErrorMessage message={error} /> : <Details />}</>;
}

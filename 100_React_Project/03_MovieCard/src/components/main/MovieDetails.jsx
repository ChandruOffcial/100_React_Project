import { Loader } from "./Helper";
import { useEffect, useState } from "react";
import StartRating from "./Start";

export default function MovieDetails({ id, handleCloseMovie, watchedMovie, watched }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [userRating, setUserRating] = useState("");

	const alreadyWatched = watched.some((item) => item.imdbID === id);
	const watchedRating = watched.find((movie) => movie.imdbID === id)?.userRating;

	const {
		imdbID,
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

	useEffect(
		function () {
			async function getMovieDetails() {
				try {
					setIsLoading(true);
					const request = await fetch(`http://www.omdbapi.com/?apikey=6de2aa48&i=${id}`);
					if (!request.ok) {
						throw new Error("Somethink In wrong in Fetch Data ");
					}

					const res = await request.json();

					setMovieDetails(res);
					setIsLoading(false);
				} catch (error) {
					console.log(error.message);
				}
			}

			getMovieDetails();
		},
		[id]
	);

	useEffect(
		function () {
			function cb(e) {
				if (e.code === "Escape") {
					handleCloseMovie();
				}
			}
			document.addEventListener("keydown", cb);

			return function () {
				document.removeEventListener("keydown", cb);
			};
		},
		[handleCloseMovie]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = `Use Popcorn`;
			};
		},
		[title]
	);

	function addWatched() {
		const newMovie = {
			poster,
			imdbID,
			year,
			userRating,
			title,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
		};

		watchedMovie(newMovie);
		handleCloseMovie();
	}

	return (
		<>
			{isLoading === "true" ? (
				<Loader />
			) : (
				<>
					<div className="details">
						<header>
							<button className="btn-back" onClick={() => handleCloseMovie()}>
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
								{!alreadyWatched ? (
									<>
										<StartRating color="gold" size={25} maxRating={10} onSetRating={setUserRating} />
										{userRating > 0 && (
											<button className="btn-add" onClick={addWatched}>
												+ Add Watchlist
											</button>
										)}
									</>
								) : (
									<p>You Rated With Movie {watchedRating}🌟</p>
								)}
							</div>
							<p>
								<em>{plot}</em>
							</p>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</section>
					</div>
				</>
			)}
		</>
	);
}

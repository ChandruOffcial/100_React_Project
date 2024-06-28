import React, { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
	const inputEl = useRef(null);

	useEffect(
		function () {
			function callback(e) {
				if (document.activeElement === inputEl.current) {
					return;
				}
				if (e.code === "Enter") {
					inputEl.current.focus();
					setQuery("");
				}
			}

			document.addEventListener("keydown", callback);

			return function () {
				document.removeEventListener("keydown", callback);
			};
		},
		[setQuery]
	);

	return (
		<input className="search" ref={inputEl} type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />
	);
}

export function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

export function Result({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies?.length}</strong> results
		</p>
	);
}

const Navbar = ({ children }) => {
	return <nav className="nav-bar">{children}</nav>;
};

export default Navbar;

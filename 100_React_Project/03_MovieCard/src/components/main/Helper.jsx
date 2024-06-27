export function Loader() {
	return <p className="loader">loading..</p>;
}

export function ErrorMessage({ message }) {
	return <p className="error">⛔{message}</p>;
}

import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import Start from "./components/main/Start";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<Start
			maxRating={5}
			color={"green"}
			size={20}
			message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
			defaultrating={1}
			setrating={setRating}
		/>
	</React.StrictMode>
);

function setRating(rat) {
	console.log(rat);
}

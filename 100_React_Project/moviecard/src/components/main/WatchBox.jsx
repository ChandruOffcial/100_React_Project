import { useState } from "react";
import Summary from "./Summary";
import CardMovie from "./CardMovie";

export default function WatchBox({ watched }) {
	const [isOpen2, setIsOpen2] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
				{isOpen2 ? "–" : "+"}
			</button>
			{isOpen2 && (
				<>
					<Summary watched={watched} />
					<CardMovie watched={watched} />
				</>
			)}
		</div>
	);
}

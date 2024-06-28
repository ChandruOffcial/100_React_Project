import React from "react";

const Progress = ({ i, num, points, maxiumPoints }) => {
	return (
		<header className="progress">
			<progress max={num} value={i} />
			<p>
				Question <strong>{i + 1}</strong>/ {num}
			</p>
			<p>
				<strong>{points}</strong>/{maxiumPoints}
			</p>
		</header>
	);
};

export default Progress;

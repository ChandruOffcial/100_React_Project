import React from "react";

const FinishScreen = ({ ponits, maxiumPoints, highScore }) => {
	const percentage = (ponits / maxiumPoints) * 100;

	let emoji;
	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🎉";
	if (percentage >= 50 && percentage < 80) emoji = "🙃";
	if (percentage >= 0 && percentage < 50) emoji = "🤨";
	if (percentage === 0) emoji = "🤦‍♂️";
	return (
		<>
			<p className="result">
				<span>{emoji}</span> You scroed <strong>{ponits}</strong> out of {maxiumPoints} ({Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highScore} points)</p>
		</>
	);
};

export default FinishScreen;

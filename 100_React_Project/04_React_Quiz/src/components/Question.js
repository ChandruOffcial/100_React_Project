import React from "react";

const Question = ({ questions, dispatch, answer }) => {
	const hasAnswered = answer !== null;
	const { question, options, correctOption } = questions;
	return (
		<div>
			<h4>{question}</h4>
			<div className="options">
				{options.map((option, i) => (
					<button
						className={`btn btn-option ${hasAnswered ? (i === correctOption ? "correct" : "wrong") : ""} ${i === answer ? "answer" : ""}`}
						key={i}
						disabled={hasAnswered}
						onClick={() => dispatch({ type: "newAnswer", payload: i })}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default Question;

import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
	const { count, step } = state;
	const { type, payload } = action;

	switch (type) {
		case "inc":
			return { ...state, count: count + step };

		case "dec":
			return { ...state, count: count - step };

		case "count":
			return { ...state, count: payload };

		case "step":
			return { ...state, step: payload };
		case "reset":
			return initialState;
		default:
			throw new Error("Unknow Action");
	}
}

function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { step, count } = state;

	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + count);

	const dec = function () {
		dispatch({ type: "dec" });
	};

	const inc = function () {
		dispatch({ type: "inc" });
	};

	const defineCount = function (e) {
		dispatch({ type: "count", payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		dispatch({ type: "step", payload: Number(e.target.value) });
	};

	const reset = function () {
		dispatch({ type: "reset" });
	};

	return (
		<div className="counter">
			<div>
				<input type="range" min="0" max="10" value={step} onChange={defineStep} />
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";

const initialState = {
	questions: [],

	// status : 'loading', 'error', 'ready', 'active', 'finshed'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const currentQuestion = state.questions[state.index];
			return {
				...state,
				answer: action.payload,
				points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		default:
			throw new Error("Unknow Action Type Recived");
	}
}

const App = () => {
	const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);
	const numQuestion = questions.length;
	const maxiumPoints = questions.reduce((previous, current) => previous + current.points, 0);

	useEffect(function () {
		async function data() {
			try {
				const response = await fetch("http://localhost:8000/questions");
				const data = await response.json();
				dispatch({ type: "dataRecived", payload: data });
			} catch (error) {
				dispatch({ type: "dataFailed" });
			}
		}
		data();
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen num={numQuestion} dispatch={dispatch} />}
				{status === "active" && (
					<>
						<Progress i={index} num={numQuestion} points={points} maxiumPoints={maxiumPoints} />
						<Question questions={questions[index]} dispatch={dispatch} answer={answer} />
						<NextQuestion answer={answer} dispatch={dispatch} />
					</>
				)}
			</Main>
		</div>
	);
};

export default App;

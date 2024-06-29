import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import ResetQuiz from "./components/ResetQuiz";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
	questions: [],

	// status : 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	reMainingTime: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active", reMainingTime: state.questions.length * SEC_PER_QUESTION };
		case "newAnswer":
			const currentQuestion = state.questions[state.index];
			return {
				...state,
				answer: action.payload,
				points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return { ...state, status: "finished", highScore: state.points > action.highScore ? state.points : action.highScore };
		case "restart":
			return { ...initialState, questions: state.questions, status: "ready" };
		case "tick":
			return { ...state, reMainingTime: state.reMainingTime - 1, status: state.reMainingTime === 0 ? "finished" : state.status };
		default:
			throw new Error("Unknow Action Type Recived");
	}
}

const App = () => {
	const [{ questions, status, index, answer, points, highScore, reMainingTime }, dispatch] = useReducer(reducer, initialState);
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
						<Footer>
							<Timer dispatch={dispatch} time={reMainingTime} />
							<NextQuestion answer={answer} dispatch={dispatch} index={index} numQuestion={numQuestion} />
						</Footer>
					</>
				)}

				{status === "finished" && (
					<>
						<FinishScreen ponits={points} maxiumPoints={maxiumPoints} highScore={highScore} />
						<ResetQuiz dispatch={dispatch} />
					</>
				)}
			</Main>
		</div>
	);
};

export default App;

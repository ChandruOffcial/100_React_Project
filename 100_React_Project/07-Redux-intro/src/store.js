const initiaState = {
	loan: 0,
	blance: 0,
	loanReson: "",
};

function reducer(state = initiaState, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, blance: state.blance + action.payload };
		case "account/withdraw":
			return { ...state, blance: state.blance - action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return state;
			return { ...state, loan: action.payload };
		case "account/payLoan":
			return { ...state, loan: 0, loanReson: "" };
		default:
			return state;
	}
}

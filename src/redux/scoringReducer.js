//ACTION CREATORS:
export function toggleJudgeDropdown() {
  return {
    type: "TOGGLE_JUDGE_DROPDOWN"
  };
}

// EVENTS PAGE LOGIC

const initialState = {
  data: []
};

export default function scoringReducer(scoringState = initialState, action) {
  switch (action.type) {
    case "TOGGLE_JUDGE_DROPDOWN":
      return { ...scoringState };
    case "SET_SELECTED_EVENT":
      return { ...scoringState };
    default:
      return scoringState;
  }
}

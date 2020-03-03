//ACTION CREATORS:
export function addScore() {
  return {
    type: "ADD_SCORE"
  };
}

export function minusScore() {
  return {
    type: "MINUS_SCORE"
  };
}

export function editNotes(notes) {
  return {
    type: "EDIT_NOTES",
    notes
  };
}

const initialState = {
  score: 100,
  notes: "",
  familyFriendly: false,
  iChoreographed: false
};

export default function scoringBreakdownReducer(
  scoringBreakdownState = initialState,
  action
) {
  switch (action.type) {
    case "ADD_SCORE":
      return {
        ...scoringBreakdownState,
        score: scoringBreakdownState.score + 1
      };
    case "MINUS_SCORE":
      return {
        ...scoringBreakdownState,
        score: scoringBreakdownState.score - 1
      };
    case "EDIT_NOTES":
      return {
        ...scoringBreakdownState,
        notes: action.notes
      };
    default:
      return scoringBreakdownState;
  }
}

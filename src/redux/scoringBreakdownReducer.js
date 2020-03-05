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

export function editNotes(note) {
  return {
    type: "EDIT_NOTE",
    note
  };
}

export function toggleCheckbox(event) {
  return event.target.name === "family-friendly"
    ? { type: "TOGGLE_FAMILY_FRIENDLY" }
    : { type: "TOGGLE_I_CHOREOGRAPHED" };
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
    case "EDIT_NOTE":
      return {
        ...scoringBreakdownState,
        notes: action.note
      };
    case "TOGGLE_FAMILY_FRIENDLY":
      return {
        ...scoringBreakdownState,
        familyFriendly: !scoringBreakdownState.familyFriendly
      };
    case "TOGGLE_I_CHOREOGRAPHED":
      return {
        ...scoringBreakdownState,
        iChoreographed: !scoringBreakdownState.iChoreographed
      };
    default:
      return scoringBreakdownState;
  }
}

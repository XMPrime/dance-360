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

export function setStrongestLevel1Id(level_1_id, ratio) {
  return {
    type: "SET_STRONGEST_LEVEL_1_ID",
    level_1_id,
    ratio
  };
}

export function setWeakestLevel1Id(level_1_id, ratio) {
  return {
    type: "SET_WEAKEST_LEVEL_1_ID",
    level_1_id,
    ratio
  };
}

export function toggleScoringBreakdownModal() {
  return {
    type: "TOGGLE_SCORING_BREAKDOWN_MODAL"
  };
}

const initialState = {
  score: 100,
  note: "",
  familyFriendly: false,
  iChoreographed: false,
  strongestRatio: -1,
  strongestId: "",
  weakestRatio: 2,
  weakestId: "",
  modal: false
};

export default function scoringBreakdownReducer(
  scoringBreakdownState = initialState,
  action
) {
  switch (action.type) {
    case "ADD_SCORE":
      return {
        ...scoringBreakdownState,
        score: Math.min(
          Math.max(parseInt(scoringBreakdownState.score + 1), 0),
          100
        )
      };
    case "MINUS_SCORE":
      return {
        ...scoringBreakdownState,
        score: Math.min(
          Math.max(parseInt(scoringBreakdownState.score - 1), 0),
          100
        )
      };
    case "EDIT_NOTE":
      return {
        ...scoringBreakdownState,
        note: action.note
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
    case "SET_STRONGEST_LEVEL_1_ID":
      return {
        ...scoringBreakdownState,
        strongestRatio: action.ratio,
        strongestId: action.level_1_id
      };
    case "SET_WEAKEST_LEVEL_1_ID":
      return {
        ...scoringBreakdownState,
        weakestRatio: action.ratio,
        weakestId: action.level_1_id
      };
    case "TOGGLE_SCORING_BREAKDOWN_MODAL":
      console.log("click");
      return {
        ...scoringBreakdownState,
        modal: !scoringBreakdownState.modal
      };
    default:
      return scoringBreakdownState;
  }
}

// return action.ratio > scoringBreakdownState.strongestRatio
//         ? {
//             ...scoringBreakdownState,
//             strongestRatio: action.ratio,
//             strongestId: action.level_1_id
//           }
//         : { ...scoringBreakdownState };

//         return action.ratio < scoringBreakdownState.weakestRatio
//         ? {
//             ...scoringBreakdownState,
//             weakestRatio: action.ratio,
//             weakestId: action.level_1_id
//           }
//         : { ...scoringBreakdownState };

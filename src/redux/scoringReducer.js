//ACTION CREATORS:
export function toggleSideMenu() {
  return {
    type: "TOGGLE_SIDE_MENU"
  };
}

export function setButtonsData(data) {
  return {
    type: "SET_BUTTONS_DATA",
    data
  };
}

export function setRoutinesData(data) {
  return {
    type: "SET_ROUTINES_DATA",
    data
  };
}

export function setScoringBreakdownData(data) {
  return {
    type: "SET_SCORING_BREAKDOWN_DATA",
    data
  };
}

// Scoring PAGE LOGIC
function objectMap(obj, fn) {
  Object.fromEntries(
    Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)])
  );
}

const initialState = {
  routinesData: [],
  buttonsData: null,
  scoringBreakdownData: [],
  displaySideMenu: false
};

export default function scoringReducer(scoringState = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDE_MENU":
      return {
        ...scoringState,
        displaySideMenu: !scoringState.displaySideMenu
      };
    case "SET_BUTTONS_DATA":
      return {
        ...scoringState,
        buttonsData: action.data
      };
    case "SET_ROUTINES_DATA":
      return {
        ...scoringState,
        routinesData: action.data
      };
    case "SET_SCORING_BREAKDOWN_DATA":
      return {
        ...scoringState,
        scoringBreakdownData: action.data
      };
    default:
      return scoringState;
  }
}

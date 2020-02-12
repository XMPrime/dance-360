//ACTION CREATORS:
export function toggleSideMenu() {
  return {
    type: "TOGGLE_SIDE_MENU"
  };
}

// EVENTS PAGE LOGIC

const initialState = {
  data: [],
  displaySideMenu: false
};

export default function scoringReducer(scoringState = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDE_MENU":
      return {
        ...scoringState,
        displaySideMenu: !scoringState.displaySideMenu
      };
    case "SET_SELECTED_EVENT":
      return { ...scoringState };
    default:
      return scoringState;
  }
}

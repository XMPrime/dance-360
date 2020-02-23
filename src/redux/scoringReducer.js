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

export function trackScrollPos(scrollPos) {
  return {
    type: "TRACK_SCROLL_POS",
    scrollPos
  };
}

export function setDivisionId(id) {
  console.log(id);
  return {
    type: "SET_DIVISION_ID",
    id
  };
}

export function setTargetRoutine(
  divisionId,
  routineNumber,
  routineName,
  studioCode,
  ageDivision,
  performanceDivision,
  routineCategory
) {
  return {
    type: "SET_TARGET_ROUTINE",
    divisionId,
    routineNumber,
    routineName,
    studioCode,
    ageDivision,
    performanceDivision,
    routineCategory
  };
}

const initialState = {
  routinesData: [],
  buttonsData: null,
  scoringBreakdownData: [],
  scrollPos: 0,
  topButtons: true,
  displaySideMenu: false,
  divisionId: null,
  routineNumber: "",
  routineName: "",
  studioCode: "",
  ageDivision: "",
  performanceDivision: "",
  routineCategory: ""
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
    case "SET_DIVISION_ID":
      return {
        ...scoringState,
        divisionId: action.id
      };
    case "SET_TARGET_ROUTINE":
      return {
        ...scoringState,
        divisionId: action.divisionId,
        routineNumber: action.routineNumber,
        routineName: action.routineName,
        studioCode: action.studioCode,
        ageDivision: action.ageDivision,
        performanceDivision: action.performanceDivision,
        routineCategory: action.routineCategory
      };
    default:
      return scoringState;
  }
}

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
  return {
    type: "SET_DIVISION_ID",
    id
  };
}

export function setTargetRoutine(
  divisionId,
  routineId,
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
    routineId,
    routineNumber,
    routineName,
    studioCode,
    ageDivision,
    performanceDivision,
    routineCategory
  };
}

export function setButtonGrades(grades) {
  return {
    type: "SET_BUTTON_GRADES",
    grades
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
  routineId: "",
  routineNumber: "",
  routineName: "",
  studioCode: "",
  ageDivision: "",
  performanceDivision: "",
  routineCategory: "",
  buttonGrades: []
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
    // case "SET_DIVISION_ID":
    //   return {
    //     ...scoringState,
    //     divisionId: action.id
    //   };
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
    case "SET_BUTTON_GRADES":
      return {
        ...scoringState,
        buttonGrades: action.grades
      };
    default:
      return scoringState;
  }
}

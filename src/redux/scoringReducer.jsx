/* eslint-disable no-console */
// ACTION CREATORS:
const axios = require('axios');

export function toggleSideMenu() {
  return {
    type: 'TOGGLE_SIDE_MENU',
  };
}

export function setButtonsData(data) {
  return {
    type: 'SET_BUTTONS_DATA',
    data,
  };
}

export function setRoutinesData(data) {
  return {
    type: 'SET_ROUTINES_DATA',
    data,
  };
}

export function setScoringBreakdownData(data) {
  return {
    type: 'SET_SCORING_BREAKDOWN_DATA',
    data,
  };
}

export function getButtonsData() {
  return async (dispatch) => {
    const url = 'https://api.d360test.com/api/coda/buttons';
    try {
      await axios.get(url).then((response) => {
        dispatch(setButtonsData(response.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getScoringBreakdownData(selectedEvent) {
  return async (dispatch) => {
    const url = 'https://api.d360test.com/api/coda/scoring-breakdown';
    try {
      await axios
        .get(url, {
          params: {
            event_id: selectedEvent.id,
          },
        })
        .then((response) => {
          dispatch(setScoringBreakdownData(response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function trackScrollPos(scrollPos) {
  return {
    type: 'TRACK_SCROLL_POS',
    scrollPos,
  };
}

export function setDivisionId(id) {
  return {
    type: 'SET_DIVISION_ID',
    id,
  };
}

export function setTargetRoutine(targetRoutine, i = 0) {
  return {
    type: 'SET_TARGET_ROUTINE',
    targetRoutine,
    targetRoutineIndex: i,
  };
}

export function getRoutinesData(tourDateId, judgeGroupId, judgePosition) {
  return async (dispatch) => {
    const url = 'https://api.d360test.com/api/coda/routines';
    try {
      await axios
        .get(url, {
          params: {
            tour_date_id: tourDateId,
            competition_group_id: judgeGroupId,
            position: judgePosition,
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            let initialRoutine = response.data[0];
            let initialRoutineIndex = 0;
            for (let i = 0; i < response.data.length; i += 1) {
              if (response.data[i].score === null) {
                initialRoutine = response.data[i];
                initialRoutineIndex = i;
                dispatch(setRoutinesData(response.data));
                dispatch(setTargetRoutine(initialRoutine, initialRoutineIndex));
                break;
              }
            }
            dispatch(setRoutinesData(response.data));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setButtonGrades(grades) {
  return {
    type: 'SET_BUTTON_GRADES',
    grades,
  };
}

export function toggleScoringModal() {
  return {
    type: 'TOGGLE_SCORING_MODAL',
  };
}

export function submitScore(postData, nextRoutine, nextRoutineIndex) {
  return async (dispatch) => {
    const scoreUrl = 'https://api.d360test.com/api/coda/score';
    const socketUrl = 'https://api.d360test.com/api/socket-scoring';

    try {
      await axios.post(scoreUrl, postData).then((response) => {
        if (response.status === 200) {
          axios
            .post(socketUrl, {
              tour_date_id: postData.tour_date_id,
              coda: true,
              data: {
                competition_group_id: postData.competition_group_id,
                date_routine_id: postData.date_routine_id,
              },
            })
            .then(() => {
              dispatch(setTargetRoutine(nextRoutine, nextRoutineIndex));
              window.scrollTo(0, 0);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addButtonGrade(rectangle) {
  return {
    type: 'ADD_BUTTON_GRADE',
    rectangle,
  };
}
export function changeButtonGrade() {
  return {
    type: 'CHANGE_BUTTON_GRADE',
  };
}

const initialState = {
  routinesData: false,
  targetRoutine: {},
  targetRoutineIndex: 0,
  buttonsData: false,
  scoringBreakdownData: [],
  scrollPos: 0,
  topButtons: true,
  displaySideMenu: false,
  buttonGrades: [],
  rectangles: [],
  modal: false,
};

export default function scoringReducer(scoringState = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU':
      return {
        ...scoringState,
        displaySideMenu: !scoringState.displaySideMenu,
      };
    case 'SET_BUTTONS_DATA':
      return {
        ...scoringState,
        buttonsData: action.data,
      };
    case 'SET_ROUTINES_DATA':
      return {
        ...scoringState,
        routinesData: action.data,
      };
    case 'SET_SCORING_BREAKDOWN_DATA':
      return {
        ...scoringState,
        scoringBreakdownData: action.data,
      };
    case 'SET_TARGET_ROUTINE':
      return {
        ...scoringState,
        targetRoutine: action.targetRoutine,
        targetRoutineIndex: action.targetRoutineIndex,
      };
    case 'SET_BUTTON_GRADES':
      return {
        ...scoringState,
        buttonGrades: action.grades,
      };
    case 'TOGGLE_SCORING_MODAL':
      return {
        ...scoringState,
        modal: !scoringState.modal,
      };
    case 'ADD_BUTTON_GRADE': {
      const index = scoringState.buttonGrades.findIndex((grade) => {
        return grade.level_4_id === action.rectangle.level_4_id;
      });
      if (index === -1) {
        return {
          ...scoringState,
          buttonGrades: [...scoringState.buttonGrades, action.rectangle],
        };
      }
      scoringState.buttonGrades.splice(index, 1, action.rectangle);
      return {
        ...scoringState,
        buttonGrades: scoringState.buttonGrades,
      };
    }
    default:
      return scoringState;
  }
}

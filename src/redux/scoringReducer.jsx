/* eslint-disable camelcase */
/* eslint-disable no-console */

import CONST from '../utils/constants';
import { ScorePostData } from '../utils/models';

// ACTION CREATORS:
const axios = require('axios');

export function toggleSideMenu() {
  return { type: 'TOGGLE_SIDE_MENU' };
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

export function setButtons(data) {
  return { type: 'SET_BUTTONS', data };
}

// TODO create a constnats file and put in the main URL to it (https://api.d360test.com/api)

export function getButtonsData() {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/buttons`;
    try {
      const response = await axios.get(url);
      console.log(response);
      dispatch(setButtonsData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getScoringBreakdownData(selectedEvent) {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/scoring-breakdown`;
    try {
      const response = await axios.get(url, {
        params: {
          event_id: selectedEvent.id,
        },
      });
      dispatch(setScoringBreakdownData(response.data));
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
    const url = `${CONST.API}/coda/routines`;
    try {
      const response = await axios.get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeGroupId,
          position: judgePosition,
        },
      });

      if (response.data.length !== 0) {
        let initialRoutine = response.data[0];
        let initialRoutineIndex = 0;
        for (let i = 0; i < response.data.length; i += 1) {
          if (response.data[i].score === null) {
            initialRoutine = response.data[i];
            initialRoutineIndex = i;
            break;
          }
        }
        dispatch(setRoutinesData(response.data));
        dispatch(setTargetRoutine(initialRoutine, initialRoutineIndex));
      }
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

export function submitScore() {
  return async (dispatch, getState) => {
    const scoreUrl = `${CONST.API}/coda/score`;
    const socketUrl = `${CONST.API}/socket-scoring`;

    const {
      login,
      events,
      tourDates,
      judgeInfo,
      scoring,
      scoringBreakdown,
    } = getState();

    const scorePostData = new ScorePostData({
      isTabulator: login.isTabulator,
      competition_group_id: judgeInfo.judgeGroupId,
      date_routine_id: scoring.targetRoutine.date_routine_id,
      event_id: events.selectedEvent.id,
      tour_date_id: tourDates.tourDateId,
      online_scoring_id: scoring.targetRoutine.online_scoring_id,
      staff_id: judgeInfo.judgeId,
      note: scoringBreakdown.note,
      score: scoringBreakdown.score,
      not_friendly: scoringBreakdown.familyFriendly,
      i_choreographed: scoringBreakdown.iChoreographed,
      position: judgeInfo.judgePosition,
      teacher_critique: judgeInfo.judgeIsTeacher,
      is_coda: true,
      buttons: scoring.buttonGrades.filter((button) => button.good !== null),
      strongest_level_1_id: scoringBreakdown.strongestId,
      weakest_level_1_id: scoringBreakdown.weakestId,
    });

    const { routinesData, targetRoutineIndex } = scoring;
    const {
      tour_date_id,
      competition_group_id,
      date_routine_id,
    } = scorePostData;

    try {
      const response = await axios.post(scoreUrl, scorePostData);
      if (response.status === 200) {
        await axios.post(socketUrl, {
          tour_date_id,
          coda: true,
          data: {
            competition_group_id,
            date_routine_id,
          },
        });
        dispatch(
          setTargetRoutine(
            routinesData[targetRoutineIndex + 1],
            targetRoutineIndex + 1,
          ),
        );
        window.scrollTo(0, 0);
      }
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
  buttons: false,
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
    case 'SET_BUTTONS':
      return {
        ...scoringState,
        buttons: action.data,
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
    case 'UPDATE_SCORE_POST_DATA':
      return {
        ...scoringState,
        scorePostData: new ScorePostData(action.scorePostData),
      };
    default:
      return scoringState;
  }
}

/* eslint-disable no-console */
import CONST from '../utils/constants';

const axios = require('axios');

export function setJudgesData(data) {
  return {
    type: 'SET_JUDGES_DATA',
    data,
  };
}

export function setCompetitionGroupsData(data) {
  return {
    type: 'SET_COMPETITION_GROUPS_DATA',
    data,
  };
}

export function getJudgesData() {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/judges`;
    try {
      const response = await axios.get(url);
      dispatch(setJudgesData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCompetitionGroupsData() {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/competition-groups`;
    try {
      const response = await axios.get(url);
      dispatch(setCompetitionGroupsData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

// TODO refactor all actions to use redux thunk
// export function setJudgeInfo(infoObj) {
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_JUDGE_INFO',
//       infoObj,
//     });
//   };
// }

export const setJudgeInfo = (infoObj) => (dispatch) => {
  dispatch({
    type: 'SET_JUDGE_INFO',
    infoObj,
  });
};

export function toggleJudgeInfoModal(judgeName) {
  return {
    type: 'TOGGLE_JUDGE_INFO_MODAL',
    judgeName,
  };
}

export function getModalJudgeName(fname, lname) {
  return {
    type: 'GET_MODAL_JUDGE_NAME',
    fname,
    lname,
  };
}

const initialState = {
  judgesData: [],
  competitionGroupsData: [],
  judgeId: '',
  judgeFullName: 'Anonymous',
  judgePosition: null,
  judgeIsTeacher: false,
  judgeGroupName: null,
  judgeGroupId: null,
  judgeHeadshot: null,
  modalFName: '',
  modalLName: '',
};

export default function judgeInfoReducer(
  judgeInfoState = initialState,
  action,
) {
  switch (action.type) {
    case 'SET_JUDGES_DATA':
      return {
        ...judgeInfoState,
        judgesData: action.data,
      };
    case 'SET_COMPETITION_GROUPS_DATA':
      return {
        ...judgeInfoState,
        competitionGroupsData: action.data,
      };
    case 'SET_JUDGE_INFO':
      console.log(judgeInfoState);
      return { ...judgeInfoState, ...action.infoObj };
    case 'TOGGLE_JUDGE_INFO_MODAL':
      return {
        ...judgeInfoState,
        modal: !judgeInfoState.modal,
      };
    case 'GET_MODAL_JUDGE_NAME':
      return {
        ...judgeInfoState,
        modalFName: action.fname,
        modalLName: action.lname,
      };
    default:
      return judgeInfoState;
  }
}

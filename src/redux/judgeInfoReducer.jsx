/* eslint-disable no-console */
// ACTION CREATORS:
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
    const url = 'https://api.d360test.com/api/coda/judges';
    try {
      await axios.get(url).then((response) => {
        dispatch(setJudgesData(response.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCompetitionGroupsData() {
  return async (dispatch) => {
    const url = 'https://api.d360test.com/api/coda/competition-groups';
    try {
      await axios.get(url).then((response) => {
        dispatch(setCompetitionGroupsData(response.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setJudgeInfo(key, info) {
  if (typeof info !== 'number') {
    return {
      type: 'SET_JUDGE_INFO',
      key,
      info,
    };
  }

  return {
    type: 'SET_JUDGE_INFO',
    key,
    info: Number(info),
  };
}

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
  judgePosition: 1,
  judgeIsTeacher: true,
  judgeGroupName: null,
  judgeGroupId: null,
  judgeHeadshot: null,
  modal: false,
  modalState: { fname: '', lname: '' },
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
        judgeId: action.data[0].id,
        judgeFullName: `${action.data[0].fname} ${action.data[0].lname}`,
      };
    case 'SET_COMPETITION_GROUPS_DATA':
      return {
        ...judgeInfoState,
        competitionGroupsData: action.data,
        judgeGroupId: action.data[0].id,
        judgeGroupName: action.data[0].name,
      };
    case 'SET_JUDGE_INFO':
      return { ...judgeInfoState, [action.key]: action.info };
    case 'TOGGLE_JUDGE_INFO_MODAL':
      return {
        ...judgeInfoState,
        modal: !judgeInfoState.modal,
      };
    case 'GET_MODAL_JUDGE_NAME':
      return {
        ...judgeInfoState,
        modalState: {
          fname: action.fname,
          lname: action.lname,
        },
      };
    default:
      return judgeInfoState;
  }
}

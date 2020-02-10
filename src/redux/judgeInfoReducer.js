//ACTION CREATORS:
export function setJudgesData(data) {
  return {
    type: "SET_JUDGES_DATA",
    data
  };
}

export function setCompetitionGroupsData(data) {
  return {
    type: "SET_COMPETITION_GROUPS_DATA",
    data
  };
}

export function setJudgeFullName(value) {
  return {
    type: "SET_JUDGE_FULL_NAME",
    value
  };
}
export function setJudgePosition(value) {
  return {
    type: "SET_JUDGE_POSITION",
    value
  };
}
export function setJudgeIsTeacher(value) {
  return {
    type: "SET_JUDGE_IS_TEACHER",
    value: value === "Yes" ? true : false
  };
}
export function setJudgeGroupName(value) {
  return {
    type: "SET_JUDGE_GROUP_NAME",
    value
  };
}
export function setJudgeGroupId(id) {
  return {
    type: "SET_JUDGE_GROUP_ID",
    id
  };
}

export function toggleJudgeInfoModal(judgeName) {
  console.log(judgeName);
  return {
    type: "TOGGLE_JUDGE_INFO_MODAL",
    judgeName
  };
}

export function getModalJudgeName(judgeName) {
  return {
    type: "GET_MODAL_JUDGE_NAME",
    judgeName
  };
}

const initialState = {
  judgesData: [],
  competitionGroupsData: [],
  judgeFullName: "Anonymous",
  judgePosition: null,
  judgeIsTeacher: null,
  judgeGroupName: null,
  judgeGroupId: null,
  modal: false,
  modalState: { fname: "", lname: "" }
};

export default function judgeInfoReducer(
  judgeInfoState = initialState,
  action
) {
  switch (action.type) {
    case "SET_JUDGES_DATA":
      return { ...judgeInfoState, judgesData: action.data };
    case "SET_COMPETITION_GROUPS_DATA":
      return { ...judgeInfoState, competitionGroupsData: action.data };
    case "SET_JUDGE_FULL_NAME":
      return { ...judgeInfoState, judgeFullName: action.value };
    case "SET_JUDGE_POSITION":
      return { ...judgeInfoState, judgePosition: Number(action.value) };
    case "SET_JUDGE_IS_TEACHER":
      return { ...judgeInfoState, judgeIsTeacher: action.value };
    case "SET_JUDGE_GROUP_NAME":
      return { ...judgeInfoState, judgeGroupName: action.value };
    case "SET_JUDGE_GROUP_ID":
      return { ...judgeInfoState, judgeGroupId: Number(action.id) };
    case "TOGGLE_JUDGE_INFO_MODAL":
      return {
        ...judgeInfoState,
        modal: !judgeInfoState.modal
      };
    case "GET_MODAL_JUDGE_NAME":
      return {
        ...judgeInfoState,
        modalState: {
          fname: action.judgeName.fname,
          lname: action.judgeName.lname
        }
      };
    default:
      return judgeInfoState;
  }
}

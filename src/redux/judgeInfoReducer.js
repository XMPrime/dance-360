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

export function setJudgeId(id) {
  return {
    type: "SET_JUDGE_ID",
    id
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
export function setJudgeHeadshot(img) {
  return {
    type: "SET_JUDGE_HEADSHOT",
    img
  };
}

export function toggleJudgeInfoModal(judgeName) {
  return {
    type: "TOGGLE_JUDGE_INFO_MODAL",
    judgeName
  };
}

export function getModalJudgeName(fname, lname) {
  return {
    type: "GET_MODAL_JUDGE_NAME",
    fname,
    lname
  };
}

const initialState = {
  judgesData: [],
  competitionGroupsData: [],
  judgeId: "",
  judgeFullName: "Anonymous",
  judgePosition: 1,
  judgeIsTeacher: true,
  judgeGroupName: null,
  judgeGroupId: null,
  judgeHeadshot: null,
  modal: false,
  modalState: { fname: "", lname: "" }
};

export default function judgeInfoReducer(
  judgeInfoState = initialState,
  action
) {
  switch (action.type) {
    case "SET_JUDGES_DATA":
      const judgesData = action.data;
      return {
        ...judgeInfoState,
        judgesData,
        judgeFullName: `${judgesData[0].fname} ${judgesData[0].lname}`
      };
    case "SET_COMPETITION_GROUPS_DATA":
      const competitionGroupsData = action.data;
      return {
        ...judgeInfoState,
        competitionGroupsData,
        judgeGroupId: competitionGroupsData[0].id,
        judgeGroupName: competitionGroupsData[0].name
      };
    case "SET_JUDGE_ID":
      return { ...judgeInfoState, judgeId: action.id };
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
    case "SET_JUDGE_HEADSHOT":
      return { ...judgeInfoState, judgeHeadshot: action.img };
    case "TOGGLE_JUDGE_INFO_MODAL":
      return {
        ...judgeInfoState,
        modal: !judgeInfoState.modal
      };
    case "GET_MODAL_JUDGE_NAME":
      return {
        ...judgeInfoState,
        modalState: {
          fname: action.fname,
          lname: action.lname
        }
      };
    default:
      return judgeInfoState;
  }
}

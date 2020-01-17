import history from "../history";
import { useSelector, useDispatch } from "react-redux";

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

const initialState = {
  judgesData: [],
  competitionGroupsData: [],
  judgeFullName: "Anonymous",
  judgePosition: "",
  judgeIsTeacher: "",
  judgeGroupName: ""
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
      return { ...judgeInfoState, judgePosition: action.value };
    case "SET_JUDGE_IS_TEACHER":
      return { ...judgeInfoState, judgeIsTeacher: action.value };
    case "SET_JUDGE_GROUP_NAME":
      return { ...judgeInfoState, judgeGroupName: action.value };
    default:
      return judgeInfoState;
  }
}

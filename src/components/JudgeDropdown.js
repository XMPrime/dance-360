import React, { useContext, useState } from "react";
import profilePic from "../imgs/default_profile_pic.png";
// import { JudgeContext } from "../JudgeContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/loginReducer";
import { toggleJudgeDropdown } from "../redux/judgeDropdownReducer";
import JudgeDropdownMenu from "./JudgeDropdownMenu";

export default function JudgeDropdown() {
  // const {
  //   judgeDropdownIsOpen,
  //   toggleJudgeDropdown,
  //   judgeFullName,
  //   judgePosition
  // } = useContext(JudgeContext);
  const dispatch = useDispatch();
  const { judgePosition, judgeFullName } = useSelector(
    state => state.judgeInfo
  );
  const judgeDropdownIsOpen = useSelector(state => state.judgeDropdown.isOpen);
  return (
    <div
      className="judge-dropdown"
      onClick={() => dispatch(toggleJudgeDropdown())}
    >
      <div className="judge-id-name">
        {judgePosition
          ? `#${judgePosition} ${judgeFullName}`
          : `${judgeFullName}`}
      </div>
      <img className="profile-pic" src={profilePic} alt="your profile pic" />
      <i className="fas fa-caret-down"></i>
      {judgeDropdownIsOpen ? <JudgeDropdownMenu /> : null}
    </div>
  );
}

import React, { useContext } from "react";
import profilePic from "../imgs/IMG_5719.JPG";
import { JudgeContext } from "../JudgeContext";
import JudgeDropdownMenu from "./JudgeDropdownMenu";

export default function JudgeDropdown() {
  const { judgeDropdownIsOpen, toggleJudgeDropdown, judgeData } = useContext(
    JudgeContext
  );

  return (
    <div className="judge-dropdown" onClick={toggleJudgeDropdown}>
      <div className="judge-id-name">#1 Anthony Morigerato</div>
      <img className="profile-pic" src={profilePic} alt="your profile pic" />
      <i className="fas fa-caret-down"></i>
      {judgeDropdownIsOpen ? <JudgeDropdownMenu /> : null}
    </div>
  );
}

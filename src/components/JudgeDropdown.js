import React from "react";
import profilePic from "../imgs/IMG_5719.JPG";

export default function JudgeDropdown() {
  return (
    <div className="judge-dropdown">
      <div className="judge-id-name">#1 Anthony Morigerato</div>
      <img className="profile-pic" src={profilePic} />
      <i class="fas fa-caret-down"></i>
    </div>
  );
}

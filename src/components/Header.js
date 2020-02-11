import React from "react";
import JudgeDropdown from "./JudgeDropdown";

export default function Header(props) {
  return (
    <header>
      <div className="header-text">{props.title}</div>
      <div className="inner-header">
        {props.barIcon === true ? <i className="fas fa-bars"></i> : <div></div>}
        <JudgeDropdown />
      </div>
    </header>
  );
}

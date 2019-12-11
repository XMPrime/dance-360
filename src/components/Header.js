import React from "react";
import JudgeDropdown from "./JudgeDropdown";

export default function Header() {
  return (
    <header>
      <div className="header-text">CHOOSE YOUR EVENT:</div>
      <div className="inner-header">
        <i className="fas fa-bars"></i>
        <JudgeDropdown />
      </div>
    </header>
  );
}

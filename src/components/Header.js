import React from "react";
import JudgeDropdown from "./JudgeDropdown";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideMenu } from "../redux/scoringReducer";

export default function Header(props) {
  const barsIcon = "fas fa-bars";
  const crossIcon = "fas fa-times";
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector(state => state.scoring);
  return (
    <header>
      <div className="header-text">{props.title}</div>
      <div className="inner-header">
        <div
          className="header-left-icon"
          onClick={() => dispatch(toggleSideMenu())}
        >
          {props.barIcon === true ? (
            <i className={displaySideMenu ? crossIcon : barsIcon}></i>
          ) : (
            <div></div>
          )}
        </div>
        <JudgeDropdown />
      </div>
    </header>
  );
}

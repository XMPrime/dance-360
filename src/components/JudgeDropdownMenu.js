import React, { useContext } from "react";
// import { JudgeContext } from "../JudgeContext";
import { useDispatch } from "react-redux";
import { logout } from "../redux/loginReducer";
import history from "../history";

export default function JudgeDropdownMenu() {
  // const { logout } = useContext(JudgeContext);
  const dispatch = useDispatch();
  return (
    <div className="judge-dropdown-menu">
      <div
        className="judge-dropdown-menu-rectangle"
        onClick={() => history.push("/judge-info")}
      >
        CHANGE JUDGE INFO
      </div>
      <div
        className="judge-dropdown-menu-rectangle"
        onClick={() => dispatch(logout())}
      >
        SIGN OUT
      </div>
    </div>
  );
}

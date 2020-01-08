import React, { useContext } from "react";
import { JudgeContext } from "../JudgeContext";

export default function JudgeDropdownMenu() {
  const { logout } = useContext(JudgeContext);
  return (
    <div className="judge-dropdown-menu">
      <div className="judge-dropdown-menu-rectangle">CHANGE JUDGE INFO</div>
      <div className="judge-dropdown-menu-rectangle" onClick={logout}>
        SIGN OUT
      </div>
    </div>
  );
}

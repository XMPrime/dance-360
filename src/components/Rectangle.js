import React from "react";

export default function Rectangle() {
  return (
    <div>
      <div className="rectangle first-level">Technique</div>
      <div className="rectangle second-level">General</div>
      <div className="rectangle third-level">Overall Control</div>
      <div className="rectangle third-level">
        <div className="great-job"></div>
        <span className="rectangle fourth-level">Foot Work</span>
      </div>
      <div className="rectangle third-level">
        <span className="needs-work"></span>
        <span className="rectangle fourth-level">Balance</span>
      </div>
    </div>
  );
}

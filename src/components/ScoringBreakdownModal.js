import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleScoringBreakdownModal } from "../redux/scoringBreakdownReducer";

export default function ScoringBreakdownModal() {
  const dispatch = useDispatch();
  const scoringBreakdownData = useSelector(
    state => state.scoring.scoringBreakdownData
  );
  const scoringBreakdown = scoringBreakdownData.map(breakdown => {
    return (
      <div className="scoring-breakdown-modal--breakdown" key={breakdown.id}>
        <div className="award">{breakdown.award}</div>
        <div className="score">{`${breakdown.lowest}-${breakdown.highest}`}</div>
      </div>
    );
  });

  return (
    <div className="scoring-breakdown-modal">
      <div className="scoring-breakdown-modal--header">SCORING BREAKDOWN</div>
      <div className="scoring-breakdown-modal--subheader">
        <div>AWARD</div>
        <div>SCORE</div>
      </div>
      {scoringBreakdown}
      <div className="scoring-breakdown-modal--divider"></div>
    </div>
  );
}

// <div
//         className="scoring-breakdown-modal--background"
//         onClick={() => dispatch(toggleScoringBreakdownModal())}
//       ></div>

import React from 'react';
import { useSelector } from 'react-redux';

export default function PopUp() {
  const scoringBreakdownData = useSelector(
    (state) => state.scoring.scoringBreakdownData,
  );
  const scoringBreakdown = scoringBreakdownData.map((breakdown) => (
    <div className="scoring-breakdown-pop-up--breakdown" key={breakdown.id}>
      <div className="award">{breakdown.award}</div>
      <div className="score">{`${breakdown.lowest}-${breakdown.highest}`}</div>
    </div>
  ));

  return (
    <div className="scoring-breakdown-pop-up">
      <div className="scoring-breakdown-pop-up--header">SCORING BREAKDOWN</div>
      <div className="scoring-breakdown-pop-up--subheader">
        <div>AWARD</div>
        <div>SCORE</div>
      </div>
      {scoringBreakdown}
    </div>
  );
}

import React from "react";

export default function ScoringBreakdown() {
  return (
    <div className="scoring-breakdown-container">
      <form>
        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">
            Scoring Breakdown
          </span>{" "}
          <i class="fas fa-info-circle"></i>
        </div>
        <div>
          <span className="minus">-</span>
          <span>100</span>
          <span className="plus">+</span>
        </div>

        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">Add Notes</span>
        </div>
        <textarea className="textarea-notes"></textarea>
        <div>
          <input
            className="checkbox-style"
            type="checkbox"
            name="family-friendly"
          />
          <label className="checkbox-label-style" for="family-friendly">
            Routine is not family-friendly
          </label>
          <input
            className="checkbox-style"
            type="checkbox"
            name="i-choreographed"
          />
          <label className="checkbox-label-style" for="i-choreographed">
            I choreographed this routine
          </label>
        </div>

        <button className="btn btn-submit">SUBMIT</button>
      </form>
    </div>
  );
}

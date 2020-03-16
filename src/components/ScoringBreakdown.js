import React from "react";
import store from "../redux/index";
import { useSelector, useDispatch } from "react-redux";
import { toggleScoringModal, setButtonGrades } from "../redux/scoringReducer";
import {
  addScore,
  minusScore,
  editNotes,
  toggleCheckbox,
  setStrongestLevel1Id,
  setWeakestLevel1Id
} from "../redux/scoringBreakdownReducer";

export default function ScoringBreakdown() {
  const dispatch = useDispatch();
  const { score, note, familyFriendly, iChoreographed } = useSelector(
    state => state.scoringBreakdown
  );

  function handleChange(e) {
    const { value } = e.target;
    dispatch(editNotes(value));
  }

  // scoreTabultor needs to be able to access STATE while in its forEach loop via "store"
  function scoreTabultor(e, store) {
    e.preventDefault();
    let rectangles = document.querySelectorAll("div.rectangle.level_4");
    let buttonGrades = [];
    let gradesObj = {};
    rectangles.forEach((rectangle, i) => {
      let grade = rectangle.attributes.grade.value;
      let level_1_id = rectangle.attributes.level_1_id.value;

      const {
        strongestRatio,
        weakestRatio
      } = store.getState().scoringBreakdown;

      // Creates "buttons" array for POST to score
      buttonGrades.push({
        level_4_id: Number(rectangle.attributes.level_4_id.value),
        level_1_id: Number(rectangle.attributes.level_1_id.value),
        good: grade === "good" ? true : grade === "bad" ? false : null
      });

      // Counts number of "good", "bad", and "neutral" buttons under each level 1 Header
      if (!gradesObj.hasOwnProperty(level_1_id)) {
        gradesObj[`${level_1_id}`] = {
          good: 0,
          bad: 0,
          neutral: 0,
          ratio: 0
        };
      }
      gradesObj[`${level_1_id}`][`${grade}`] += 1;

      //Calculates the good/bad ratio for each level 1 header category and determines which is strongest & weakest
      if (
        i === rectangles.length - 1 ||
        level_1_id !== rectangles[i + 1].attributes.level_1_id.value
      ) {
        let ratio =
          gradesObj[`${level_1_id}`].good /
          (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);

        if (isNaN(ratio)) {
          ratio = 0;
        }
        if (ratio > strongestRatio) {
          dispatch(setStrongestLevel1Id(Number(level_1_id), ratio));
        }
        if (ratio < weakestRatio) {
          dispatch(setWeakestLevel1Id(Number(level_1_id), ratio));
        }
      }
    });

    return buttonGrades.filter(button => button.good !== null);
  }

  return (
    <div className="scoring-breakdown-container">
      <form
        onSubmit={e => {
          dispatch(toggleScoringModal());
          dispatch(setButtonGrades(scoreTabultor(e, store)));
        }}
      >
        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">
            Scoring Breakdown
          </span>{" "}
          <i className="fas fa-info-circle"></i>
        </div>
        <div className="score-container">
          <i
            className="fas fa-minus minus"
            onClick={() => dispatch(minusScore())}
          ></i>
          <span className="score">{score}</span>
          <i
            className="fas fa-plus plus"
            onClick={() => dispatch(addScore())}
          ></i>
        </div>

        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">Add Notes</span>
        </div>
        <textarea
          className="textarea-notes"
          onChange={handleChange}
          value={note}
        ></textarea>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="family-friendly"
            onClick={e => dispatch(toggleCheckbox(e))}
            value={familyFriendly}
          />
          <label className="checkbox-label-style" htmlFor="family-friendly">
            Routine is not family-friendly
          </label>
        </div>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="i-choreographed"
            onClick={e => dispatch(toggleCheckbox(e))}
            value={iChoreographed}
          />
          <label className="checkbox-label-style" htmlFor="i-choreographed">
            I choreographed this routine
          </label>
        </div>

        <button className="btn btn-submit" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/index';
import { toggleScoringModal, setButtonGrades } from '../redux/scoringReducer';
import {
  addScore,
  minusScore,
  editNotes,
  toggleCheckbox,
  setStrongestLevel1Id,
  setWeakestLevel1Id,
  toggleScoringBreakdownPopUp,
} from '../redux/scoringBreakdownReducer';
import ScoringBreakdownPopUp from './ScoringBreakdownPopUp';

export default function ScoringBreakdown() {
  const dispatch = useDispatch();
  const { score, note, familyFriendly, iChoreographed } = useSelector(
    (state) => state.scoringBreakdown,
  );
  const scoringBreakdownPopUp = useSelector(
    (state) => state.scoringBreakdown.popUp,
  );

  function handleChange(e) {
    const { value } = e.target;
    dispatch(editNotes(value));
  }

  // scoreTabultor needs to be able to access STATE while in its forEach loop via "store"
  function scoreTabultor(e, reduxStore) {
    e.preventDefault();
    const rectangles = document.querySelectorAll('div.rectangle.level_4');
    const buttonGrades = [];
    const gradesObj = {};
    rectangles.forEach((rectangle, i) => {
      const grade = rectangle.attributes.grade.value;
      const level_1_id = rectangle.attributes.level_1_id.value;

      const {
        strongestRatio,
        weakestRatio,
      } = reduxStore.getState().scoringBreakdown;

      // Creates "buttons" array for POST to score
      buttonGrades.push({
        level_4_id: Number(rectangle.attributes.level_4_id.value),
        level_1_id: Number(rectangle.attributes.level_1_id.value),
        good: grade === 'good' ? true : grade === 'bad' ? false : null,
      });

      // Counts number of "good", "bad", and "neutral" buttons under each level 1 Header
      if (!Object.prototype.hasOwnProperty.call(gradesObj, level_1_id)) {
        gradesObj[`${level_1_id}`] = {
          good: 0,
          bad: 0,
          neutral: 0,
          ratio: 0,
        };
      }
      gradesObj[`${level_1_id}`][`${grade}`] += 1;

      // Calculates the good/bad ratio for each level 1 header category and determines which is strongest & weakest
      if (
        i === rectangles.length - 1 ||
        level_1_id !== rectangles[i + 1].attributes.level_1_id.value
      ) {
        let ratio =
          gradesObj[`${level_1_id}`].good /
          (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);

        // eslint-disable-next-line no-restricted-globals
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

    return buttonGrades.filter((button) => button.good !== null);
  }

  return (
    <div className="scoring-breakdown-container">
      {scoringBreakdownPopUp ? <ScoringBreakdownPopUp /> : null}
      {scoringBreakdownPopUp ? (
        <div className="scoring-breakdown-pop-up--divider" />
      ) : null}
      <form
        onSubmit={(e) => {
          dispatch(toggleScoringModal());
          dispatch(setButtonGrades(scoreTabultor(e, store)));
        }}
      >
        <div className="scoring-breakdown-header">
          <div className="scoring-breakdown-header-text">Scoring Breakdown</div>
          <button
            onClick={() => dispatch(toggleScoringBreakdownPopUp())}
            type="button"
          >
            <i className="fas fa-info-circle" />
          </button>
        </div>
        <div className="score-container">
          <button onClick={() => dispatch(minusScore())} type="button">
            <i className="fas fa-minus minus" />
          </button>
          <span className="score">{score}</span>
          <button onClick={() => dispatch(addScore())} type="button">
            <i className="fas fa-plus plus" />
          </button>
        </div>

        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">Add Notes</span>
        </div>
        <textarea
          className="textarea-notes"
          onChange={handleChange}
          value={note}
        />
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="family-friendly"
            onClick={(e) => dispatch(toggleCheckbox(e))}
            value={familyFriendly}
          />
          <div className="checkbox-label-style">
            Routine is not family-friendly
          </div>
        </div>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="i-choreographed"
            onClick={(e) => dispatch(toggleCheckbox(e))}
            value={iChoreographed}
          />
          <div className="checkbox-label-style">
            I choreographed this routine
          </div>
        </div>

        <button className="btn btn-submit" type="submit">
          SUBMIT
        </button>
      </form>
      {scoringBreakdownPopUp ? (
        <div
          className="modal-background transparent"
          onClick={() => dispatch(toggleScoringBreakdownPopUp())}
          role="alertdialog"
        />
      ) : null}
    </div>
  );
}

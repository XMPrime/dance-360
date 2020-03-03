import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addScore,
  minusScore,
  editNotes
} from "../redux/scoringBreakdownReducer";

export default function ScoringBreakdown() {
  const dispatch = useDispatch();
  const { score, notes } = useSelector(state => state.scoringBreakdown);

  function handleChange(e) {
    const { value } = e.target;
    dispatch(editNotes(value));
  }

  function submitScore(e) {
    // MAKE A FAKE SUBMIT THAT CONSOLES CURRENT STATE OF BUTTON GRADES
    if (e.code === "Enter") {
      let rectangles = document.querySelectorAll("div.rectangle.level_4");
      let buttonsArray = [];
      rectangles.forEach(rectangle => {
        buttonsArray.push({
          level_4_id: Number(rectangle.attributes.level_4_id.value),
          level_1_id: Number(rectangle.attributes.level_1_id.value),
          good: rectangle.attributes.good.value === "true" ? true : false
        });
      });
    }

    // return (dispatch, getState) => {
    //   const url = "https://api.d360test.com/api/coda/score";
    //   const axios = require("axios");
    //   const event_id = getState().events.selectedEvent.id;
    //   const tour_date_id = getState().tourDates.tourDateId;
    //   const {judgeGroupId, judgeId, judgePosition, judgeIsTeacher} = getState().judgeInfo.judgeGroupId;
    //   const {routineId, } = getState().scoring;

    // axios
    //   .post(url, {
    //     isTabulator: BOOLEAN,
    //     competition_group_id: judgeGroupId,
    //     date_routine_id: INT,
    //     event_id,
    //     tour_date_id,
    //     data: {
    //       online_scoring_id: INT,
    //       staff_id: judgeId,
    //       note: STRING,
    //       score: INT,
    //       not_friendly: BOOLEAN,
    //       i_choreographed: BOOLEAN,
    //       position: INT,
    //       teacher_critique: BOOLEAN,
    //       is_coda: true,
    //       buttons: [
    //         {
    //           level_4_id: INT,
    //           level_1_id: INT,
    //           good: BOOLEAN
    //         }
    //       ],
    //       strongest_level_1_id: INT,
    //       weakest_level_1_id: INT
    //     }
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // };
  }

  return (
    <div className="scoring-breakdown-container">
      <form>
        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">
            Scoring Breakdown
          </span>{" "}
          <i class="fas fa-info-circle"></i>
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
        <textarea className="textarea-notes" onChange={handleChange}>
          {notes}
        </textarea>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="family-friendly"
          />
          <label className="checkbox-label-style" for="family-friendly">
            Routine is not family-friendly
          </label>
        </div>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="i-choreographed"
          />
          <label className="checkbox-label-style" for="i-choreographed">
            I choreographed this routine
          </label>
        </div>

        <button className="btn btn-submit" onClick={() => submitScore()}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

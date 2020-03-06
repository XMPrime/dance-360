import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const { isTabulator } = useSelector(state => state.login);
  const { targetRoutine } = useSelector(state => state.scoring.targetRoutine);
  const { score, note, familyFriendly, iChoreographed } = useSelector(
    state => state.scoringBreakdown
  );

  function handleChange(e) {
    const { value } = e.target;
    dispatch(editNotes(value));
  }

  function scoreTabultor(e) {
    // FAKE SUBMIT THAT CONSOLES CURRENT STATE OF BUTTON GRADES
    if (e.code === "Enter") {
      let rectangles = document.querySelectorAll("div.rectangle.level_4");
      let buttonsArr = [];
      let gradesObj = {};
      rectangles.forEach((rectangle, i) => {
        let grade = rectangle.attributes.grade.value;
        let level_1_id = rectangle.attributes.level_1_id.value;

        // Creates "buttons" array for POST to score
        buttonsArr.push({
          level_4_id: Number(rectangle.attributes.level_4_id.value),
          level_1_id: Number(rectangle.attributes.level_1_id.value),
          good: grade === "good" ? true : false
        });

        // Counts number of "good", "bad", and "neutral" buttons under each Header
        if (!gradesObj.hasOwnProperty(level_1_id)) {
          gradesObj[`${level_1_id}`] = {
            good: 0,
            bad: 0,
            neutral: 0,
            ratio: 0
          };
        }
        gradesObj[`${level_1_id}`][`${grade}`] += 1;

        if (
          i === rectangles.length - 1 ||
          level_1_id !== rectangles[i + 1].attributes.level_1_id.value
        ) {
          //i === rectangles.length - 1
          // gradesObj[`${level_1_id}`].ratio =
          //   gradesObj[`${level_1_id}`].good /
          //   (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);

          const ratio =
            gradesObj[`${level_1_id}`].good /
            (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);
          console.log(ratio);
          dispatch(setStrongestLevel1Id(level_1_id, ratio));
          dispatch(setWeakestLevel1Id(level_1_id, ratio));
        }
      });
      // console.log(gradesObj);
      return buttonsArr;
    }
  }

  function submitScore(e) {
    let rectangles = document.querySelectorAll("div.rectangle.level_4");
    let buttonsArray = [];
    let gradesArray = {};
    rectangles.forEach(rectangle => {
      let level_4_id = rectangle.attributes.level_4_id.value;
      let level_1_id = rectangle.attributes.level_1_id.value;
      buttonsArray.push({
        level_4_id: Number(level_4_id),
        level_1_id: Number(level_1_id),
        good: rectangle.attributes.grade.value === "great-job" ? true : false
      });
    });

    const score = scoreTabultor();

    // return (dispatch, getState) => {
    //   const url = "https://api.d360test.com/api/coda/score";
    //   const axios = require("axios");
    //   const event_id = getState().events.selectedEvent.id;
    //   const tour_date_id = getState().tourDates.tourDateId;
    //   const {judgeGroupId, judgeId, judgePosition, judgeIsTeacher} = getState().judgeInfo.judgeGroupId;
    //   const {routineId, } = getState().scoring;
    // const {date_routine_id, online_scoring_id, } = getState().scoring.targetRoutine

    // axios
    //   .post(url, {
    //     isTabulator,
    //     competition_group_id: judgeGroupId,
    //     date_routine_id,
    //     event_id,
    //     tour_date_id,
    //     data: {
    //       online_scoring_id,
    //       staff_id: judgeId,
    //       note,
    //       score,
    //       not_friendly: familyFriendly,
    //       i_choreographed: iChoreographed,
    //       position: judgePosition,
    //       teacher_critique: judgeIsTeacher,
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

  useEffect(() => {
    // window.addEventListener("scroll", () => handleScroll(scrollPos));
    // window.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", scoreTabultor);
  }, []);

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
          {note}
        </textarea>
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            type="checkbox"
            name="family-friendly"
            onClick={e => dispatch(toggleCheckbox(e))}
            value={familyFriendly}
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
            onClick={e => dispatch(toggleCheckbox(e))}
            value={iChoreographed}
          />
          <label className="checkbox-label-style" for="i-choreographed">
            I choreographed this routine
          </label>
        </div>

        <button className="btn btn-submit" onClick={scoreTabultor}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

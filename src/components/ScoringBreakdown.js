import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useForm from "react-hook-form";
import { setTargetRoutine, toggleSideMenu } from "../redux/scoringReducer";
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
  // const { isTabulator } = useSelector(state => state.login);
  // const { targetRoutine } = useSelector(state => state.scoring.targetRoutine);
  const {
    score,
    note,
    familyFriendly,
    iChoreographed,
    strongestRatio,
    weakestRatio
  } = useSelector(state => state.scoringBreakdown);
  const { handleSubmit } = useForm();

  function handleChange(e) {
    const { value } = e.target;
    dispatch(editNotes(value));
  }

  function scoreTabultor(strongestRatio, weakestRatio) {
    // FAKE SUBMIT THAT CONSOLES CURRENT STATE OF BUTTON GRADES
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
        //POGGERS FIRST SUCCESSFUL SHORTCIRCUIT!
        i === rectangles.length - 1 ||
        level_1_id !== rectangles[i + 1].attributes.level_1_id.value
      ) {
        //i === rectangles.length - 1
        // gradesObj[`${level_1_id}`].ratio =
        //   gradesObj[`${level_1_id}`].good /
        //   (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);

        let ratio =
          gradesObj[`${level_1_id}`].good /
          (gradesObj[`${level_1_id}`].good + gradesObj[`${level_1_id}`].bad);

        if (isNaN(ratio)) {
          ratio = 0;
        }
        if (ratio > strongestRatio) {
          dispatch(setStrongestLevel1Id(level_1_id, Number(ratio)));
        }
        if (ratio < weakestRatio) {
          dispatch(setWeakestLevel1Id(level_1_id, Number(ratio)));
        }

        console.log(level_1_id, ratio);

        dispatch(setStrongestLevel1Id(level_1_id, Number(ratio)));
        dispatch(setWeakestLevel1Id(level_1_id, Number(ratio)));
      }
    });
    // console.log(gradesObj);
    return buttonsArr;
  }

  function submitScore() {
    console.log("pass1");

    return (dispatch, getState) => {
      const scoreUrl = "https://api.d360test.com/api/coda/score";
      const socketUrl = "https://api.d360test.com/api/socket-scoring";
      const axios = require("axios");

      //Preload next routine for when the user submits score
      const { routinesData, targetRoutineIndex } = getState().scoring;
      const nextRoutine = routinesData[targetRoutineIndex + 1];
      const nextRoutineIndex = targetRoutineIndex + 1;
      console.log(nextRoutineIndex);

      const isTabulator = getState().login.isTabulator;
      const event_id = getState().events.selectedEvent.id;
      const tour_date_id = getState().tourDates.tourDateId;
      const {
        judgeGroupId,
        judgeId,
        judgePosition,
        judgeIsTeacher
      } = getState().judgeInfo;
      const {
        date_routine_id,
        online_scoring_id
      } = getState().scoring.targetRoutine;
      const buttonsArr = scoreTabultor();
      const {
        score,
        note,
        familyFriendly,
        iChoreographed,
        strongestId,
        weakestId
      } = getState().scoringBreakdown;

      console.log({
        isTabulator,
        competition_group_id: judgeGroupId,
        date_routine_id,
        event_id,
        tour_date_id,
        data: {
          online_scoring_id,
          staff_id: judgeId,
          note,
          score,
          not_friendly: familyFriendly,
          i_choreographed: iChoreographed,
          position: judgePosition,
          teacher_critique: judgeIsTeacher,
          is_coda: true,
          buttons: buttonsArr,
          strongest_level_1_id: strongestId,
          weakest_level_1_id: weakestId
        }
      });

      axios
        .post(scoreUrl, {
          isTabulator,
          competition_group_id: judgeGroupId,
          date_routine_id,
          event_id,
          tour_date_id,
          data: {
            online_scoring_id,
            staff_id: judgeId,
            note,
            score,
            not_friendly: familyFriendly,
            i_choreographed: iChoreographed,
            position: judgePosition,
            teacher_critique: judgeIsTeacher,
            is_coda: true,
            buttons: buttonsArr,
            strongest_level_1_id: strongestId,
            weakest_level_1_id: weakestId
          }
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            axios.post(socketUrl, {
              tour_date_id,
              coda: true,
              data: {
                competition_group_id: judgeGroupId,
                date_routine_id
              }.then(response => {
                console.log(response);
              })
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      dispatch(setTargetRoutine(nextRoutine, nextRoutineIndex));
      window.scrollTo(0, 0);
    };
  }

  useEffect(() => {
    // window.addEventListener("scroll", () => handleScroll(scrollPos));
    // window.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", scoreTabultor);
  }, []);

  return (
    <div className="scoring-breakdown-container">
      <form
        onSubmit={handleSubmit(() =>
          dispatch(submitScore(strongestRatio, weakestRatio))
        )}
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

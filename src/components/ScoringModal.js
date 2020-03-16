import React from "react";
import { toggleScoringModal } from "../redux/scoringReducer";
import { useDispatch, useSelector } from "react-redux";
import { setTargetRoutine } from "../redux/scoringReducer";
import {
  setStrongestLevel1Id,
  setWeakestLevel1Id
} from "../redux/scoringBreakdownReducer";

export default function ScoringModal() {
  const dispatch = useDispatch();

  const { routinesData, targetRoutineIndex, buttonGrades } = useSelector(
    state => state.scoring
  );
  const nextRoutine = routinesData[targetRoutineIndex + 1];
  const nextRoutineIndex = targetRoutineIndex + 1;

  const isTabulator = useSelector(state => state.login.isTabulator);
  const event_id = useSelector(state => state.events.selectedEvent.id);
  const tour_date_id = useSelector(state => state.tourDates.tourDateId);
  const { judgeGroupId, judgeId, judgePosition, judgeIsTeacher } = useSelector(
    state => state.judgeInfo
  );
  const { date_routine_id, online_scoring_id } = useSelector(
    state => state.scoring.targetRoutine
  );
  const {
    score,
    note,
    familyFriendly,
    iChoreographed,
    strongestId,
    weakestId
  } = useSelector(state => state.scoringBreakdown);

  let postData = {
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
      buttons: buttonGrades,
      strongest_level_1_id: strongestId,
      weakest_level_1_id: weakestId
    }
  };
  console.log(postData);

  function submitScore(postData) {
    const scoreUrl = "https://api.d360test.com/api/coda/score";
    const socketUrl = "https://api.d360test.com/api/socket-scoring";
    const axios = require("axios");
    console.log(postData);

    axios
      .post(scoreUrl, {
        postData
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          axios
            .post(socketUrl, {
              tour_date_id,
              coda: true,
              data: {
                competition_group_id: judgeGroupId,
                date_routine_id
              }
            })
            .then(response => {
              console.log(response);
              dispatch(setTargetRoutine(nextRoutine, nextRoutineIndex));
              window.scrollTo(0, 0);
            });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-header">Alert</div>
        <div className="modal-body">
          <div className="modal-text">Are you sure you want to save?</div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-grey"
            onClick={() => {
              dispatch(toggleScoringModal());
              dispatch(setStrongestLevel1Id("", -1));
              dispatch(setWeakestLevel1Id("", 2));
            }}
          >
            CANCEL
          </button>
          <button
            className="btn btn-purple"
            onClick={() => {
              dispatch(toggleScoringModal());
              submitScore(postData);
            }}
          >
            SAVE
          </button>
        </div>
      </div>
      <div
        className="modal-background"
        onClick={() => {
          dispatch(toggleScoringModal());
          dispatch(setStrongestLevel1Id("reset", -1));
          dispatch(setWeakestLevel1Id("reset", 2));
        }}
      ></div>
    </div>
  );
}

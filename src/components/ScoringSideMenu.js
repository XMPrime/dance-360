import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoutinesData,
  setTargetRoutine,
  toggleSideMenu
} from "../redux/scoringReducer";

export default function ScoringSideMenu() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const { tourDate, tourDateId } = useSelector(state => state.tourDates);
  const { routinesData, targetRoutine } = useSelector(state => state.scoring);
  const { judgeGroupId, judgePosition } = useSelector(state => state.judgeInfo);

  let getData = {
    params: {
      tour_date_id: tourDateId,
      competition_group_id: judgeGroupId,
      position: judgePosition
    }
  };

  const routineNumbers = routinesData
    ? numbersTransformer(
        routinesData.map(routine => {
          return routine.number;
        })
      )
    : [];

  const routinesList = routinesData.length
    ? routinesData.map((routine, i) => {
        return (
          <div
            className={`scoring-side-menu__routine ${
              routine === targetRoutine
                ? "scoring-side-menu__routine--selected"
                : routine.score === null
                ? "scoring-side-menu__routine--unrestricted"
                : "scoring-side-menu__routine--restricted"
            }`}
            key={routine.date_routine_id}
            onClick={
              routine.score === null ? e => handleClick(routine, i, e) : null
            }
          >
            <div className="routine-text__list-number">{`#${routineNumbers[i]}`}</div>
            <div className="routine-text__routine-name">{routine.routine}</div>
          </div>
        );
      })
    : [];

  function handleClick(routine, i, e) {
    dispatch(setTargetRoutine(routine, i));
    dispatch(toggleSideMenu());
  }

  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  function numbersTransformer(numbers) {
    let newArr = [...numbers];
    for (let i = 0, char = "a"; i < numbers.length; i++) {
      let checker = numbers.filter(number => number === numbers[i]);
      if (checker.length > 1) {
        if (numbers[i] === numbers[i + 1]) {
          newArr[i] = numbers[i] + char;
          char = nextChar(char);
        } else if (numbers[i] < numbers[i + 1]) {
          newArr[i] = numbers[i] + char;
          char = "a";
        } else {
          if (numbers[i] === numbers[i - 1]) {
            char = nextChar(char);
            newArr[i] = numbers[i] + char;
          } else {
            char = "a";
            newArr[i] = numbers[i] + char;
          }
        }
      } else {
        char = "a";
      }
    }
    return newArr;
  }

  function refreshRoutines(getData) {
    const routinesUrl = "https://api.d360test.com/api/coda/routines";
    const axios = require("axios");

    axios.get(routinesUrl, getData).then(response => {
      console.log(response);
      if (response.data.length !== 0) {
        let initialRoutine = response.data[0];
        let initialRoutineIndex = 0;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].score === null) {
            initialRoutine = response.data[i];
            initialRoutineIndex = i;
            dispatch(setRoutinesData(response.data));
            dispatch(setTargetRoutine(initialRoutine, initialRoutineIndex));
            break;
          }
        }
        dispatch(setRoutinesData(response.data));
      }
    });
  }

  return (
    <>
      <div className="scoring-side-menu">
        <div className="scoring-side-menu__routines-list">
          <div className="scoring-side-menu__header">
            <img
              src={`https://assets.dance360.com/coda/${selectedEvent.id}.svg`}
              className="scoring-side-menu__image"
              alt={selectedEvent.name}
            />
            <div className="scoring-side-menu__tour-date">{tourDate}</div>
          </div>
          {routinesList}
        </div>
        <button
          className="btn btn-refresh"
          onClick={() => refreshRoutines(getData)}
        >
          <i className="fas fa-redo"></i>REFRESH
        </button>
      </div>
      <div
        className="modal-background transparent"
        onClick={() => dispatch(toggleSideMenu())}
      ></div>
    </>
  );
}

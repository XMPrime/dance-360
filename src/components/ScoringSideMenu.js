import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTargetRoutine, toggleSideMenu } from "../redux/scoringReducer";

export default function ScoringSideMenu() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDate = useSelector(state => state.tourDates.tourDate);
  const { routinesData, targetRoutine, targetRoutineIndex } = useSelector(
    state => state.scoring
  );

  const routineNumbers = numbersTransformer(
    routinesData.map(routine => {
      return routine.number;
    })
  );

  // function createRoutinesList(targetRoutine) {
  //   return routinesData.map((routine, i) => {
  //     return (
  //       <div
  //         className={`scoring-side-menu__routine ${routine === targetRoutine ? "scoring-side-menu__routine--selected" : ""}`}
  //         key={routine.date_routine_id}
  //         divisionId={routine.performance_division_level_id}
  //         onClick={e => handleClick(routine, e)}
  //       >
  //         <div className="routine-text__list-number">{`#${routineNumbers[i]}`}</div>
  //         <div className="routine-text__routine-name">{routine.routine}</div>
  //       </div>
  //     );
  //   });
  // }

  const routinesList = routinesData.map((routine, i) => {
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
        divisionId={routine.performance_division_level_id}
        onClick={routine.score === null ? e => handleClick(routine, i, e) : ""}
      >
        <div className="routine-text__list-number">{`#${routineNumbers[i]}`}</div>
        <div className="routine-text__routine-name">{routine.routine}</div>
      </div>
    );
  });

  function handleClick(routine, i, e) {
    // if (
    //   //maybe use ID instead for easier selection
    //   e.target.classList.contains("scoring-side-menu__routine--selected") ||
    //   !e.target.classList.contains("scoring-side-menu__routine")
    // ) {
    //   //make it so the user doesn't reset the page when clicking the already selected routine
    //   return;
    // } else {
    dispatch(setTargetRoutine(routine, i));
    dispatch(toggleSideMenu());
    // }
  }

  // function clickedOutsideMenu(e) {
  //   if (e.target.classList.contains("scoring-side-menu__outside-area")) {

  //   };
  // }

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

  // useEffect(() => {
  //   document.addEventListener("click", clickedOutsideMenu);
  // }, []);

  return (
    // <div className="scoring-side-menu__outside-area">
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
    </div>
    // </div>
  );
}

//createRoutinesList(targetRoutine)

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import setDivisionId from "../redux/scoringReducer";

export default function ScoringSideMenu() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDate = useSelector(state => state.tourDates.tourDate);
  const { routinesData, divisionId } = useSelector(state => state.scoring);
  console.log(divisionId);
  console.log(routinesData[0].performance_division_level_id);
  const routinesList = routinesData.map(routine => {
    return (
      <div
        className="scoring-side-menu__routine"
        key={routine.date_routine_id}
        divisionId={routine.performance_division_level_id}
        // onClick={() =>
        //   dispatch(setDivisionId(routine.performance_division_level_id))
        // }
      >
        <div className="routine-text__list-number">{`#${routine.number}`}</div>
        <div className="routine-text__routine-name">{routine.routine}</div>
      </div>
    );
  });

  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(-1) + 1);
  }

  return (
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
  );
}

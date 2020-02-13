import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ScoringSideMenu() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDate = useSelector(state => state.tourDates.tourDate);
  const routinesList = [];
  return (
    <div className="scoring-side-menu">
      <div className="scoring-side-menu__routines-list">
        <div className="scoring-side-menu__header">
          <img
            src={`https://assets.dance360.com/coda/${selectedEvent.id}.svg`}
            className=""
            alt={selectedEvent.name}
          />
          <span>{tourDate}</span>
        </div>
        {routinesList}
      </div>
    </div>
  );
}

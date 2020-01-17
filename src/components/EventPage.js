import React, { useContext, useEffect } from "react";
import Header from "./Header";
import history from "../history";
import { JudgeContext } from "../JudgeContext";
import { useSelector, useDispatch } from "react-redux";
import { setEventsData, setSelectedEvent } from "../redux/eventsReducer";

export default function EventPage() {
  const eventsData = useSelector(state => state.events.eventsData);
  const dispatch = useDispatch();
  const axios = require("axios");
  // const {
  //   eventsData,
  //   setEventsData,
  //   setSelectedEvent,
  //   pageRouter
  // } = useContext(JudgeContext);

  const events = eventsData.map(event => {
    return (
      <div
        key={event.id}
        className="grid-item"
        event_id={event.id}
        season_id={event.current_season_id}
        onClick={() => {
          dispatch(setSelectedEvent(event));
          history.push("/tour-dates");
        }}
      >
        <img
          src={`https://assets.dance360.com/coda/${event.id}.svg`}
          className="grid-group-logo"
          alt={event.name}
        />
      </div>
    );
  });

  useEffect(() => {
    axios.get("https://api.d360test.com/api/coda/events").then(response => {
      dispatch(setEventsData(response.data));
    });
  });

  return (
    <div className="generic-page">
      <Header title="CHOOSE YOUR EVENT:" />
      <div
        className={
          eventsData.length <= 4
            ? "events-container-4orless"
            : "events-container-5ormore"
        }
      >
        {events}
      </div>
    </div>
  );
}

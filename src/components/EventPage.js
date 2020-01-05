import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { JudgeContext } from "../JudgeContext";

export default function EventPage() {
  const axios = require("axios");
  const { eventsData, setEventsData, setSelectedEvent } = useContext(
    JudgeContext
  );

  const events = eventsData.map(event => {
    return (
      <Link to="/tour-dates" key={event.id}>
        <div
          className="grid-item"
          event_id={event.id}
          season_id={event.current_season_id}
          onClick={() => setSelectedEvent(event)}
        >
          <img
            src={`https://assets.dance360.com/coda/${event.id}.svg`}
            className="grid-group-logo"
            alt={event.name}
          />
        </div>
      </Link>
    );
  });

  useEffect(() => {
    axios.get("https://api.d360test.com/api/coda/events").then(response => {
      setEventsData(response.data);
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

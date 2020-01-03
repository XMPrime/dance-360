import React, { useState, useEffect } from "react";
import logo from "../imgs/group-6.svg";
import Header from "./Header";
import { Link, Route, Switch, Redirect } from "react-router-dom";
// import {  } from "react-router-dom";

export default function EventPage() {
  // const numberOfEventsTest = 5;
  // const eventsList = [
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   },
  //   {
  //     id: 0,
  //     name: "CODA",
  //     src: logo
  //   }
  // ];
  const [eventsData, setEventsData] = useState([]);
  const axios = require("axios");

  const events = eventsData.map(event => {
    return (
      <Link to="/tour-dates">
        <div className="grid-item">
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

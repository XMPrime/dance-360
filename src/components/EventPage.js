import React from "react";
import logo from "../imgs/group-6.svg";
import Header from "./Header";
import { Link, Route, Switch, Redirect } from "react-router-dom";
// import {  } from "react-router-dom";

export default function EventPage() {
  const numberOfEventsTest = 5;
  const eventsList = [
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    },
    {
      id: 0,
      name: "CODA",
      src: logo
    }
  ];

  const events = eventsList.map(event => {
    return (
      <Link to="/tour-dates">
        <div class="grid-item">
          <img src={event.src} class="grid-group-logo" alt="logo" />
        </div>
      </Link>
    );
  });

  return (
    <div class="generic-page">
      <Header />
      <div
        className={
          eventsList.length <= 4
            ? "events-container-4orless"
            : "events-container-5ormore"
        }
      >
        {events}
      </div>
    </div>
  );
}

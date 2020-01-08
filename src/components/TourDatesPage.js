import React, { useEffect, useContext } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { JudgeContext } from "../JudgeContext";

export default function TourDatesPage() {
  const axios = require("axios");
  const {
    selectedEvent,
    tourDatesData,
    setTourDatesData,
    transformTourDateData,
    findClosestDate,
    pageRouter
  } = useContext(JudgeContext);

  const closestDate = findClosestDate(tourDatesData);

  const tourDatesList = tourDatesData.map(tourDateData => {
    if (tourDateData.end_date === closestDate) {
      return (
        <option key={tourDateData.id} className="tour-dates" selected>
          {transformTourDateData(tourDateData)}
        </option>
      );
    } else {
      return (
        <option key={tourDateData.id} className="tour-dates">
          {transformTourDateData(tourDateData)}
        </option>
      );
    }
  });

  useEffect(() => {
    axios
      .get("https://api.d360test.com/api/coda/tour-dates", {
        params: {
          event_id: selectedEvent.id,
          season_id: selectedEvent.current_season_id
        }
      })
      .then(response => {
        setTourDatesData(response.data);
      });
  });

  return (
    <div className="generic-page">
      <Header barIcon={false} title="CHOOSE YOUR CITY:" />
      <div className="tour-dates-menu">
        <img
          src={`https://assets.dance360.com/coda/${selectedEvent.id}.svg`}
          className="group-logo"
          alt="logo"
        />
        <form className="form-container">
          <select className="custom-select">{tourDatesList}</select>
          <div className="btn-block">
            <Link to="/events">
              <button className="btn btn-grey">BACK</button>
            </Link>
            <button
              className="btn btn-purple"
              type="submit"
              onClick={() => pageRouter("/judge-info")}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

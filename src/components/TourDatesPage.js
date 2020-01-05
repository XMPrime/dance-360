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
    transformTourDateData
  } = useContext(JudgeContext);
  // const cityArr = [
  //   { id: 1, name: "St. Louis - December 7-9, 2019" },
  //   { id: 2, name: "St. Louis - December 7-9, 2019" },
  //   { id: 3, name: "St. Louis - December 7-9, 2019" }
  // ];
  // const cityList = cityArr.map(city => {
  //   return city.id === 1 ? (
  //     <option className="city-options" selected>
  //       {city.name}
  //     </option>
  //   ) : (
  //     <option className="city-options">{city.name}</option>
  //   );
  // });

  function findClosestDate(tourDatesData) {
    const now = new Date();

    let closest = Infinity;

    tourDatesData.forEach(tourDate => {
      const date = new Date(tourDate.start_date);

      if (date >= now && (date < new Date(closest) || date < closest)) {
        closest = tourDate.start_date;
      }
    });

    return closest;
  }

  const closestDate = findClosestDate(tourDatesData);

  const tourDatesList = tourDatesData.map(tourDateData => {
    if (tourDateData.start_date === closestDate) {
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
          className="grid-group-logo"
          alt="logo"
        />
        <form className="form-container">
          <select className="custom-select">{tourDatesList}</select>
          <div className="btn-block">
            <button className="btn btn-grey">
              BACK<Link to="/events"></Link>
            </button>

            <button className="btn btn-purple" type="submit">
              NEXT<Link to="/judge-info"></Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

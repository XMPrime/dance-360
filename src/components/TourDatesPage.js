import React, { useEffect } from "react";
import Header from "../components/Header";
import history from "../history";
// import { JudgeContext } from "../JudgeContext";
import { useSelector, useDispatch } from "react-redux";
import {
  setTourDatesData,
  transformTourDateData,
  setSelectedTour,
  findClosestDate
} from "../redux/tourDatesReducer";

export default function TourDatesPage() {
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDatesData = useSelector(state => state.tourDates.tourDatesData);
  const dispatch = useDispatch();
  const axios = require("axios");
  // const {
  //   selectedEvent,
  //   tourDatesData,
  //   setTourDatesData,
  //   transformTourDateData,
  //   findClosestDate,
  //   pageRouter
  // } = useContext(JudgeContext);

  const closestDate = findClosestDate(tourDatesData);

  const tourDatesList = tourDatesData.map(tourDateData => {
    if (tourDateData.end_date === closestDate) {
      return (
        <option
          key={tourDateData.id}
          id={tourDateData.id}
          className="tour-dates"
          selected
        >
          {transformTourDateData(tourDateData)}
        </option>
      );
    } else {
      return (
        <option
          key={tourDateData.id}
          id={tourDateData.id}
          className="tour-dates"
        >
          {transformTourDateData(tourDateData)}
        </option>
      );
    }
  });

  function handleChange() {
    var select = document.getElementById("tour-select");
    const tourId = select.options[select.selectedIndex].id;
    dispatch(setSelectedTour(tourId));
  }

  useEffect(() => {
    axios
      .get("https://api.d360test.com/api/coda/tour-dates", {
        params: {
          event_id: selectedEvent.id,
          season_id: selectedEvent.current_season_id
        }
      })
      .then(response => {
        dispatch(setTourDatesData(response.data));
        //defaults the tourId to the first option in the list, would prefer a more elegant solution....
        dispatch(setSelectedTour(response.data[0].id));
      });
  }, []);

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
          <select
            id="tour-select"
            className="custom-select"
            onChange={handleChange}
          >
            {tourDatesList}
          </select>
          <div className="btn-block">
            <button
              className="btn btn-grey"
              onClick={() => history.push("/events")}
            >
              BACK
            </button>

            <button
              className="btn btn-purple"
              type="submit"
              onClick={() => history.push("/judge-info")}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

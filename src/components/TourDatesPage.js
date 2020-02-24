import React, { useEffect } from "react";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setTourDatesData,
  setSelectedTour,
  transformTourDateData
} from "../redux/tourDatesReducer";

export default function TourDatesPage() {
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const { tourDatesData, tourDate } = useSelector(state => state.tourDates);
  const dispatch = useDispatch();
  const axios = require("axios");
  const history = useHistory();

  const tourDatesList = tourDatesData.map(tourDateData => {
    return (
      <option
        key={tourDateData.id}
        id={tourDateData.id}
        className="tour-dates"
        value={transformTourDateData(tourDateData)}
      >
        {transformTourDateData(tourDateData)}
      </option>
    );
  });

  function handleChange(e) {
    var select = document.getElementById("tour-select");
    const tourId = select.options[select.selectedIndex].id;
    const tourDate = e.target.value;
    dispatch(setSelectedTour(tourId, tourDate));
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
            value={tourDate}
          >
            {tourDatesList}
          </select>
          <div className="btn-block">
            <button className="btn btn-grey" onClick={() => history.goBack()}>
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

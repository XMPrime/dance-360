import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import {
  setTourDatesData,
  setSelectedTour,
  transformTourDateData,
} from '../redux/tourDatesReducer';

const axios = require('axios');

export default function TourDatesPage() {
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const { tourDatesData, tourDate } = useSelector((state) => state.tourDates);
  const dispatch = useDispatch();
  const history = useHistory();

  const tourDatesList = tourDatesData.map((tourDateData) => {
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
    const select = document.getElementById('tour-select');
    const tourId = select.options[select.selectedIndex].id;
    const tourDateValue = e.target.value;
    dispatch(setSelectedTour(tourId, tourDateValue));
  }

  const buttons = [
    { color: 'grey', clickFunc: () => history.push('/events'), text: 'BACK' },
    {
      color: 'purple',
      clickFunc: () => history.push('/judge-info'),
      text: 'NEXT',
    },
  ];

  useEffect(() => {
    axios
      .get('https://api.d360test.com/api/coda/tour-dates', {
        params: {
          event_id: selectedEvent.id,
          season_id: selectedEvent.current_season_id,
        },
      })
      .then((response) => {
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
        <div className="form-container">
          <select
            id="tour-select"
            className="custom-select"
            onChange={handleChange}
            value={tourDate}
          >
            {tourDatesList}
          </select>
          <div className="btn-block">
            {buttons.map((button) => (
              <button
                key={button.text}
                className={`btn btn-${button.color}`}
                onClick={button.clickFunc}
                type="button"
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

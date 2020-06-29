import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../generic/Header';
import {
  getTourDatesData,
  setSelectedTour,
  transformTourDateData,
} from '../../redux/tourDatesReducer';

export default function TourDatesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedEvent, { tourDatesData, tourDate }] = useSelector((state) => [
    state.events.selectedEvent,
    state.tourDates,
  ]);

  // TODO use .sort instead of .reverse()
  const tourDatesList = tourDatesData
    .map((tourDateData) => (
      <option
        key={tourDateData.id}
        value={{
          tourId: tourDateData.id,
          tourInfo: transformTourDateData(tourDateData),
        }}
      >
        {transformTourDateData(tourDateData)}
      </option>
    ))
    .reverse();

  // TODO use id as value instead of object. then pass the id to action and use the id to find the data you need
  function handleChange(e) {
    const { tourId, tourInfo } = e.target.value;
    dispatch(setSelectedTour(tourId, tourInfo));
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
    dispatch(getTourDatesData(selectedEvent));
  }, [dispatch, selectedEvent]);

  // TODO after refactoring custom select, use it here
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

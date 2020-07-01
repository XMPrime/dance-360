import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../generic/Header';
import CustomSelect from '../generic/CustomSelect';
import {
  getTourDatesData,
  setSelectedTour,
  transformTourDateData,
} from '../../redux/tourDatesReducer';
import { CustomSelectProps } from '../../utils/models';

export default function TourDatesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedEvent, { tourDatesData }] = useSelector((state) => [
    state.events.selectedEvent,
    state.tourDates,
  ]);

  useEffect(() => {
    dispatch(getTourDatesData(selectedEvent));
  }, [dispatch, selectedEvent]);

  const buttons = [
    { color: 'grey', clickFunc: () => history.push('/events'), text: 'BACK' },
    {
      color: 'purple',
      clickFunc: () => history.push('/judge-info'),
      text: 'NEXT',
    },
  ];

  // TODO use moment to convert date string into unix and use unix to compare for sort
  // TODO use useState to save selected tour id, move current handleChange logic to when user clicks next
  const selectMenus = [
    {
      id: 'tourDates',
      options: tourDatesData.sort((a, b) => b.id - a.id),
      optionText: (option) => transformTourDateData(option),
      handleChange: (e) => {
        const { tourId, tourInfo } = tourDatesData.find(
          (tour) => tour.id === Number(e.target.value),
        );
        dispatch(setSelectedTour(tourId, tourInfo));
      },
    },
  ];

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
          {selectMenus.map((selectMenu) => (
            <CustomSelect
              key={selectMenu.id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...new CustomSelectProps(selectMenu)}
            />
          ))}

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

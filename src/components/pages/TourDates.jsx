import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useForm from 'react-hook-form';
import moment from 'moment';
import Header from '../generic/Header';
import CustomSelect from '../generic/CustomSelect';
import {
  getTourDatesData,
  setSelectedTour,
} from '../../redux/tourDatesReducer';
import { CustomSelectProps } from '../../utils/models';
import {
  findClosestDate,
  transformTourDateData,
} from '../../utils/helperFunctions';

export default function TourDatesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [
    selectedEvent,
    { tourDatesData, tourDateId },
  ] = useSelector((state) => [state.events.selectedEvent, state.tourDates]);

  const [defaultTour, setDefaultTour] = useState(
    tourDateId ||
      (tourDatesData &&
        tourDatesData.find(
          (data) => data.end_date === findClosestDate(tourDatesData),
        )),
  );

  useEffect(() => {
    dispatch(getTourDatesData(selectedEvent));
    // eslint-disable-next-line
  }, [selectedEvent]);

  const buttons = [
    {
      type: 'button',
      color: 'grey',
      clickFunc: () => history.push('/events'),
      text: 'BACK',
    },
    {
      type: 'submit',
      color: 'purple',
      text: 'NEXT',
    },
  ];

  const selectMenus = [
    {
      id: 'tourDates',
      options: tourDatesData.sort((a, b) =>
        moment(b.end_date).diff(moment(a.end_date)),
      ),
      optionText: (option) => transformTourDateData(option),
      changeFunc: setDefaultTour,
      defaultOption: defaultTour,
    },
  ];

  function onSubmit(formValues) {
    const selectedTour = tourDatesData.find(
      (tour) => tour.id === Number(formValues.tourDates),
    );
    dispatch(setSelectedTour(selectedTour));
    history.push('/judge-info');
  }

  return (
    <div className="generic-page">
      <Header barIcon={false} title="CHOOSE YOUR CITY:" />
      <div className="tour-dates-menu">
        <img
          src={`https://assets.dance360.com/coda/${selectedEvent.id}.svg`}
          className="group-logo"
          alt="logo"
        />
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          {selectMenus.map((selectMenu) => (
            <CustomSelect
              key={selectMenu.id}
              register={register}
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
                type="submit"
              >
                {button.text}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

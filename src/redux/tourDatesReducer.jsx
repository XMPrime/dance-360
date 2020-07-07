/* eslint-disable camelcase */
/* eslint-disable no-console */

import moment from 'moment';
import CONST from '../utils/constants';

const axios = require('axios');

export function setTourDatesData(data) {
  return {
    type: 'SET_TOUR_DATES_DATA',
    data,
  };
}

export function getTourDatesData(selectedEvent) {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/tour-dates`;
    try {
      const response = await axios.get(url, {
        params: {
          event_id: selectedEvent.id,
          season_id: selectedEvent.current_season_id,
        },
      });
      dispatch(setTourDatesData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

// TODO redo below in moment
export function transformTourDateData({ start_date, end_date, event_city }) {
  if (moment(end_date).isAfter(start_date, 'year')) {
    // 'San Diego - Dec 29, 2019 - Jan 5, 2020
    return `${event_city.name}: ${moment(start_date).format(
      'MMM D, YYYY',
    )}-${moment(end_date).format('MMM D, YYYY')}`;
  }
  if (moment(end_date).isAfter(start_date, 'month')) {
    // 'San Diego - Nov 29-Dec 5, 2019
    return `${event_city.name}: ${moment(start_date).format(
      'MMM D',
    )} - ${moment(end_date).format('MMM D, YYYY')}`;
  }
  // 'San Diego - Dec 29-30, 2019
  return `${event_city.name}: ${moment(start_date).format('MMM D')}-${moment(
    end_date,
  ).format('D, YYYY')}`;
}

export function setSelectedTour(selectedTour) {
  return {
    type: 'SET_SELECTED_TOUR',
    tourDateId: Number(selectedTour.id),
    tourDate: transformTourDateData(selectedTour),
  };
}

const initialState = {
  tourDatesData: [],
  tourDateId: '',
  tourDate: '',
};

export default function tourDatesReducer(
  tourDatesState = initialState,
  action,
) {
  switch (action.type) {
    case 'SET_TOUR_DATES_DATA': {
      return {
        ...tourDatesState,
        tourDatesData: action.data,
      };
    }

    case 'SET_SELECTED_TOUR':
      return {
        ...tourDatesState,
        tourDateId: Number(action.tourDateId),
        tourDate: action.tourDate,
      };
    default:
      return tourDatesState;
  }
}

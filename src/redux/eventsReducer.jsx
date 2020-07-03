// ACTION CREATORS:

import CONST from '../utils/constants';

const axios = require('axios');

export function setEventsData(data) {
  return {
    type: 'SET_EVENTS_DATA',
    data,
  };
}

// TODO change all promises to async/await
export function getEventsData() {
  return async (dispatch) => {
    const url = `${CONST.API}/coda/events`;

    try {
      const response = await axios.get(url);
      dispatch(setEventsData(response.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
}

export function setSelectedEvent(event) {
  return {
    type: 'SET_SELECTED_EVENT',
    event,
  };
}

const initialState = {
  eventsData: [],
  selectedEvent: null,
};

export default function eventsReducer(eventsState = initialState, action) {
  switch (action.type) {
    case 'SET_EVENTS_DATA':
      return { ...eventsState, eventsData: action.data };
    case 'SET_SELECTED_EVENT':
      return { ...eventsState, selectedEvent: action.event };
    default:
      return eventsState;
  }
}

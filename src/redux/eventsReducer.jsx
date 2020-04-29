// ACTION CREATORS:
export function setEventsData(data) {
  return {
    type: 'SET_EVENTS_DATA',
    data,
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

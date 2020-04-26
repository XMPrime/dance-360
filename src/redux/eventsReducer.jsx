//ACTION CREATORS:
export function setEventsData(data) {
  return {
    type: "SET_EVENTS_DATA",
    data
  };
}

export function setSelectedEvent(event) {
  return {
    type: "SET_SELECTED_EVENT",
    event
  };
}

// EVENTS PAGE LOGIC
// export function setEventsDataAsync() {
//   return (dispatch, getState) => {
//     const url = "https://api.d360test.com/api/auth/signin";
//     const axios = require("axios");
//     const { username, password, isLoggedIn } = getState().login;
//     axios
//       .post(url, {
//         name: username,
//         password: password
//       })
//       .then(response => {
//         if (response.status === 200) {
//           dispatch(login());
//           history.push("/events");
//         } else {
//           //display modal?
//         }
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };
// }

const initialState = {
  eventsData: [],
  selectedEvent: null
};

export default function eventsReducer(eventsState = initialState, action) {
  switch (action.type) {
    case "SET_EVENTS_DATA":
      return { ...eventsState, eventsData: action.data };
    case "SET_SELECTED_EVENT":
      return { ...eventsState, selectedEvent: action.event };
    default:
      return eventsState;
  }
}

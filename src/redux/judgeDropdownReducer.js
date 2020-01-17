//ACTION CREATORS:
export function toggleJudgeDropdown() {
  return {
    type: "TOGGLE_JUDGE_DROPDOWN"
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
  IsOpen: false
};

export default function judgeDropdownReducer(
  judgeDropdownState = initialState,
  action
) {
  switch (action.type) {
    case "TOGGLE_JUDGE_DROPDOWN":
      return { ...judgeDropdownState, isOpen: !judgeDropdownState.isOpen };
    case "SET_SELECTED_EVENT":
      return { ...judgeDropdownState, selectedEvent: action.event };
    default:
      return judgeDropdownState;
  }
}

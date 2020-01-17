import history from "../history";

//ACTION CREATORS:
export function setUsername(username) {
  return {
    type: "SET_USERNAME",
    username
  };
}

export function setPassword(password) {
  return {
    type: "SET_PASSWORD",
    password
  };
}

export function login() {
  return {
    type: "LOGIN"
  };
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}

// LOGIN LOGIC
export function loginAsync() {
  return (dispatch, getState) => {
    const url = "https://api.d360test.com/api/auth/signin";
    const axios = require("axios");
    const { username, password, isLoggedIn } = getState().login;
    axios
      .post(url, {
        name: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(login());
          history.push("/events");
        } else {
          //display modal?
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function handleChange(e) {
  const { value } = e.target;
  e.target.id === "username" ? setUsername(value) : setPassword(value);
}

const initialState = {
  isLoggedIn: false,
  username: "",
  password: ""
};

export default function loginReducer(loginState = initialState, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...loginState, username: action.username };
    case "SET_PASSWORD":
      return { ...loginState, password: action.password };
    case "LOGIN":
      return { ...loginState, isLoggedIn: true };
    case "LOGOUT":
      return { ...loginState, isLoggedIn: false };
    default:
      return loginState;
  }
}

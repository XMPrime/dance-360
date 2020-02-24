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

export function toggleLoginModal() {
  return {
    type: "TOGGLE_LOGIN_MODAL"
  };
}

export function handleChange(e) {
  const { value } = e.target;
  e.target.id === "username" ? setUsername(value) : setPassword(value);
}

const initialState = {
  isLoggedIn: false,
  username: "",
  password: "",
  modal: false
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
    case "TOGGLE_LOGIN_MODAL":
      return { ...loginState, modal: !loginState.modal };
    default:
      return loginState;
  }
}

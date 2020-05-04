// ACTION CREATORS:
export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    username,
  };
}

export function setPassword(password) {
  return {
    type: 'SET_PASSWORD',
    password,
  };
}

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function toggleLoginModal() {
  return {
    type: 'TOGGLE_LOGIN_MODAL',
  };
}

export function isTabulator(boolean) {
  return {
    type: 'IS_TABULATOR',
    boolean,
  };
}

const initialState = {
  isLoggedIn: false,
  username: '',
  password: '',
  modal: false,
  isTabulator: false,
};

export default function loginReducer(loginState = initialState, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...loginState, username: action.username };
    case 'SET_PASSWORD':
      return { ...loginState, password: action.password };
    case 'LOGIN':
      return { ...loginState, isLoggedIn: true };
    case 'LOGOUT':
      return { ...loginState, isLoggedIn: false };
    case 'IS_TABULATOR':
      return { ...loginState, isTabulator: action.boolean };
    case 'TOGGLE_LOGIN_MODAL':
      return { ...loginState, modal: !loginState.modal };
    default:
      return loginState;
  }
}
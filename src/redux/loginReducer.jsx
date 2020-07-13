export function setTextInput(e) {
  const { id, value } = e.target;
  return {
    type: 'SET_TEXT_INPUT',
    id,
    value,
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

export function tabulatorCheck(data) {
  return {
    type: 'TABULATOR_CHECK',
    boolean: data.includes('tabulator'),
  };
}

const initialState = {
  isLoggedIn: false,
  username: '',
  password: '',
  isTabulator: false,
};

export default function loginReducer(loginState = initialState, action) {
  switch (action.type) {
    case 'SET_TEXT_INPUT':
      return { ...loginState, [action.id]: action.value };
    case 'LOGIN':
      return { ...loginState, isLoggedIn: true };
    case 'LOGOUT':
      return { ...loginState, isLoggedIn: false };
    case 'TABULATOR_CHECK':
      return { ...loginState, isTabulator: action.boolean };
    default:
      return loginState;
  }
}

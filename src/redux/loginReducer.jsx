// ACTION CREATORS:
import CONST from '../utils/constants';
import { toggleModal } from './modalsReducer';

const axios = require('axios');

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

export function tryLogin(username, password) {
  return async (dispatch) => {
    const url = `${CONST.API}/auth/signin`;

    try {
      const response = await axios.post(url, {
        name: username,
        password,
      });
      if (response.status === 200) {
        dispatch(login());
        dispatch(tabulatorCheck(response.data.roles));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // display modal
      dispatch(toggleModal('auth'));
    }
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

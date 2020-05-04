import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';

import {
  setUsername,
  setPassword,
  login,
  isTabulator,
  toggleLoginModal,
} from '../redux/loginReducer';
import logo from '../imgs/group-6.svg';
import LoginModal from './LoginModal';

const axios = require('axios');

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.login.modal);
  const { register, handleSubmit, errors } = useForm();
  const errorMessage = (
    <span className="error-message">This field is required!</span>
  );

  function tabulatorCheck(roles) {
    return roles.includes('tabulator');
  }

  function loginAsync() {
    return (loginDispatch, getState) => {
      const url = 'https://api.d360test.com/api/auth/signin';

      const { username, password } = getState().login; // specific to react-hook-form?
      axios
        .post(url, {
          name: username,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            loginDispatch(login());
            loginDispatch(isTabulator(tabulatorCheck(response.data.roles)));
            history.push('/events');
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          // display modal
          dispatch(toggleLoginModal());
        });
    };
  }

  return (
    <div className="judge-1">
      {modal ? <LoginModal /> : null}
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(() => dispatch(loginAsync()))}>
          <div className="input-container">
            <i className="fa fa-envelope icon" />
            <input
              type="text"
              id="username"
              name="name"
              className="input username"
              placeholder="Username"
              onChange={(e) => dispatch(setUsername(e.target.value))}
              ref={register({ required: true })}
            />
            {errors.name && errorMessage}
          </div>

          <div className="input-container">
            <i className="fa fa-lock icon" id="lock" />
            <input
              type="password"
              id="password"
              name="password"
              className="input password"
              placeholder="Password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              ref={register({ required: true })}
            />
            {errors.password && errorMessage}
          </div>

          <button className="btn btn-login" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

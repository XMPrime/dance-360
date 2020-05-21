import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';

import { setTextInput, tryLogin } from '../redux/loginReducer';
import logo from '../imgs/group-6.svg';
import LoginModal from './LoginModal';

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username, password, welcomeModal, authModal } = useSelector(
    (state) => state.login,
  );
  const { register, handleSubmit, errors } = useForm();

  const errorMessage = (
    <span className="error-message">This field is required!</span>
  );
  const textInputs = [
    {
      icon: 'fa-envelope',
      type: 'text',
      id: 'username',
      placeholder: 'Username',
      errors: errors.username && errorMessage,
    },
    {
      icon: 'fa-lock',
      type: 'password',
      id: 'password',
      placeholder: 'Password',
      errors: errors.password && errorMessage,
    },
  ];

  const invalidAuthText = {
    type: 'auth',
    header: 'Sorry',
    body1: 'You have entered an invalid username or password.',
  };

  const welcomeText = {
    type: 'welcome',
    header: 'Welcome to my Dance Judge app!',
    linkText: 'click here',
    linkAddress:
      'https://docs.google.com/document/d/1ZPotc3MEnf29pgsx-e4CkHbBqTkfszn_brS6hbAXhj0/edit?usp=sharing',
    body1:
      'To login and look around, use "jason" and "testtest" as the username and password respectively. Additionally, ',
    body2:
      ' for a link to the User Stories for this app. Thanks for your consideration!',
  };

  async function onSubmit() {
    try {
      await dispatch(tryLogin(username, password));
      history.push('/events');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return (
    <div className="judge-1">
      {welcomeModal ? (
        <LoginModal
          type="welcome"
          header={welcomeText.header}
          linkText={welcomeText.linkText}
          linkAddress={welcomeText.linkAddress}
          body1={welcomeText.body1}
          body2={welcomeText.body2}
        />
      ) : null}
      {authModal ? (
        <LoginModal
          type="auth"
          header={invalidAuthText.header}
          body1={invalidAuthText.body1}
        />
      ) : null}
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(() => onSubmit())}>
          {textInputs.map((input, i) => (
            <div key={input.id} className="input-container">
              <i className={`fa ${input.icon} icon`} />
              <input
                type={input.type}
                id={input.id}
                name={input.id}
                className={`input ${input.id}`}
                placeholder={input.placeholder}
                onChange={(e) => dispatch(setTextInput(e))}
                ref={register({ required: true })}
              />
              {input.errors}
            </div>
          ))}
          <button className="btn btn-login" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

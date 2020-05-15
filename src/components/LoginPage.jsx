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
  const { username, password, modal } = useSelector((state) => state.login);
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
      {modal ? <LoginModal /> : null}
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(() => onSubmit())}>
          {textInputs.map((input) => {
            return (
              <div className="input-container">
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
            );
          })}
          <button className="btn btn-login" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

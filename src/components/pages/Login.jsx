import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';

import { setTextInput, tryLogin, toggleModal } from '../../redux/loginReducer';
import logo from '../../imgs/group-6.svg';
import Modal from '../generic/Modal';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username, password, welcomeModal, authModal } = useSelector(
    (state) => state.login,
  );
  // welcomeModal, authModal
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

  const invalidAuth = {
    type: 'auth',
    header: 'Sorry',
    body: 'You have entered an invalid username or password.',
    cancel: {
      text: 'OK',
      func: (e) => dispatch(toggleModal(e)),
    },
    confirm: {
      text: 'OK',
      func: (e) => dispatch(toggleModal(e)),
    },
    bgFunc: (e) => dispatch(toggleModal(e)),
  };

  const welcome = {
    type: 'welcome',
    header: 'Welcome to my Dance Judge app!',
    body: (
      <>
        To login and look around, use &quot;jason&quot; and &quot;testtest&quot;
        as the username and password respectively. Additionally,{' '}
        <a href="https://tinyurl.com/yb5dz9dr">click here</a> for a link to the
        User Stories for this app. Thanks for stopping by!
      </>
    ),
    cancel: false,
    confirm: {
      text: 'OK',
      func: (e) => dispatch(toggleModal(e)),
    },
    bgFunc: (e) => dispatch(toggleModal(e)),
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
        <Modal
          type={welcome.type}
          header={welcome.header}
          body={welcome.body}
          cancel={welcome.cancel}
          confirm={welcome.confirm}
          bgFunc={welcome.bgFunc}
        />
      ) : null}
      {authModal ? (
        <Modal
          type="auth"
          header={invalidAuth.header}
          body={invalidAuth.body}
          cancel={welcome.cancel}
          confirm={welcome.confirm}
          bgFunc={welcome.bgFunc}
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

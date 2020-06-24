/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';

import { setTextInput, tryLogin, toggleModal } from '../../redux/loginReducer';
import logo from '../../imgs/group-6.svg';
import Modal from '../generic/Modal';
import { ModalProps } from '../../utils/models';
import { envelopeIcon, lockIcon } from '../../utils/constants';

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
      icon: envelopeIcon,
      type: 'text',
      id: 'username',
      placeholder: 'Username',
      errors: errors.username && errorMessage,
    },
    {
      icon: lockIcon,
      type: 'password',
      id: 'password',
      placeholder: 'Password',
      errors: errors.password && errorMessage,
    },
  ];

  const invalidAuthProps = {
    type: 'auth',
    header: 'Sorry',
    body: 'You have entered an invalid username or password.',
    confirm: {
      text: 'OK',
      func: (e) => dispatch(toggleModal(e)),
    },
    bgFunc: (e) => dispatch(toggleModal(e)),
  };

  const welcomeProps = {
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
      {welcomeModal && <Modal {...new ModalProps(welcomeProps)} />}
      {authModal && <Modal {...new ModalProps(invalidAuthProps)} />}
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(() => onSubmit())}>
          {textInputs.map((input, i) => (
            <div key={input.id} className="input-container">
              <i className={`${input.icon} icon`} />
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

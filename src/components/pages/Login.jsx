/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';
import { login, tabulatorCheck, setTextInput } from '../../redux/loginReducer';
import { openModal } from '../../redux/modalsReducer';
import logo from '../../imgs/group-6.svg';
import { ModalProps } from '../../utils/models';
import CONST, { envelopeIcon, lockIcon } from '../../utils/constants';

const axios = require('axios');

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { username, password } = useSelector((state) => state.login);

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
    confirmText: 'OK',
  };

  const invalidAuthProps = {
    type: 'auth',
    header: 'Sorry',
    body: 'You have entered an invalid username or password.',
    confirmText: 'OK',
  };

  useEffect(() => {
    dispatch(openModal(new ModalProps(welcomeProps)));
    // eslint-disable-next-line
  }, []);

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

  async function tryLogin() {
    const url = `${CONST.API}/auth/signin`;

    try {
      const response = await axios.post(url, {
        name: username,
        password,
      });
      if (response.status === 200) {
        Promise.all([
          dispatch(login()),
          dispatch(tabulatorCheck(response.data.roles)),
        ]);
        history.push('/events');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch(openModal(new ModalProps(invalidAuthProps)));
    }
  }

  return (
    <div className="judge-1">
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(tryLogin)}>
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

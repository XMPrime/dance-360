import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, loginAsync } from "../redux/loginReducer";
import logo from "../imgs/group-6.svg";
import useForm from "react-hook-form";
import LoginModal from "../components/LoginModal";

export default function LoginPage() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.login.modal);
  const { register, handleSubmit, errors } = useForm();
  const errorMessage = (
    <span className="error-message">This field is required!</span>
  );

  return (
    <div className="judge-1">
      {modal ? <LoginModal /> : null}
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(() => dispatch(loginAsync()))}>
          <div className="input-container">
            <i className="fa fa-envelope icon"></i>
            <input
              type="text"
              id="username"
              name="name"
              className="input username"
              placeholder="Username"
              onChange={e => dispatch(setUsername(e.target.value))}
              ref={register({ required: true })}
            />
            {errors.name && errorMessage}
          </div>

          <div className="input-container">
            <i className="fa fa-lock icon" id="lock"></i>
            <input
              type="password"
              id="password"
              name="password"
              className="input password"
              placeholder="Password"
              onChange={e => dispatch(setPassword(e.target.value))}
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

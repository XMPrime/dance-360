import React, { useContext } from "react";
import logo from "../imgs/group-6.svg";
import { JudgeContext } from "../JudgeContext";
import useForm from "react-hook-form";

export default function LoginPage() {
  const { handleChange, login, username, password } = useContext(JudgeContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const errorMessage = (
    <span className="error-message">This field is required!</span>
  );
  // const useFormRef = register({
  //   required: true,
  //   pattern: {
  //     message: "This field is required!"
  //   }
  // });

  return (
    <div className="judge-1">
      <div className="container-fluid">
        <img src={logo} className="login-logo" alt="logo" />
        <form onSubmit={handleSubmit(login)}>
          <div className="input-container">
            <i className="fa fa-envelope icon"></i>
            <input
              type="text"
              id="username"
              name="name"
              className="input username"
              placeholder="Username"
              onChange={handleChange}
              ref={register({ required: true })}
            />
            {errors.name && errorMessage}
          </div>

          <div className="input-container">
            <i className="fa fa-lock fa-lg icon" id="lock"></i>
            <input
              type="password"
              id="password"
              name="password"
              className="input password"
              placeholder="Password"
              onChange={handleChange}
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

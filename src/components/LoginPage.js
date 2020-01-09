import React, { useContext } from "react";
import logo from "../imgs/group-6.svg";
import { JudgeContext } from "../JudgeContext";
import useForm from "react-hook-form";

export default function LoginPage() {
  const { handleChange, login, username, password } = useContext(JudgeContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const useFormRef = register({ required: true });

  return (
    <div className="judge-1">
      <div className="container-fluid">
        <img src={logo} className="group-logo" alt="logo" />
        <form onSubmit={login}>
          <div className="input-container">
            <input
              type="text"
              id="username"
              name="name"
              className="input username"
              placeholder="email"
              onChange={handleChange}
              ref={useFormRef}
            />
            {errors.name && <span>This field is required!</span>}
            <i className="fa fa-envelope icon"></i>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="password"
              name="password"
              className="input password"
              placeholder="password"
              onChange={handleChange}
              ref={useFormRef}
            />
            <i className="fa fa-lock fa-lg icon"></i>
            {errors.password && <span>This field is required!</span>}
          </div>

          <button className="btn btn-login" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

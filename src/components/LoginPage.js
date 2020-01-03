import React, { useContext } from "react";
import logo from "../imgs/group-6.svg";
import { Link } from "react-router-dom";
import { JudgeContext } from "../JudgeContext";

export default function LoginPage() {
  const { handleChange, login, username, password } = useContext(JudgeContext);

  return (
    <div class="judge-1">
      <div class="container-fluid">
        <form id="login-form" onSubmit={login}>
          <img src={logo} class="group-logo" alt="logo" />
          <div class="input-container">
            <input
              type="text"
              id="username"
              name="name"
              class="input username"
              placeholder="email"
              onChange={handleChange}
            />
            <i class="fa fa-envelope icon"></i>
          </div>

          <div class="input-container">
            <input
              type="text"
              id="password"
              name="password"
              class="input password"
              placeholder="password"
              onChange={handleChange}
            />
            <i class="fa fa-lock fa-lg icon"></i>
          </div>
          <Link to="/events">
            <button class="btn btn-login" type="submit" onClick={login}>
              LOGIN
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

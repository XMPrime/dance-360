import React, { useContext } from "react";
import logo from "../imgs/group-6.svg";
import { Link } from "react-router-dom";
import { JudgeContext } from "../JudgeContext";

export default function LoginPage() {
  const { handleChange, login, username, password } = useContext(JudgeContext);

  return (
    <div className="judge-1">
      <div className="container-fluid">
        <img src={logo} className="group-logo" alt="logo" />
        <div className="input-container">
          <input
            type="text"
            id="username"
            name="name"
            className="input username"
            placeholder="email"
            onChange={handleChange}
          />
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
          />
          <i className="fa fa-lock fa-lg icon"></i>
        </div>
        <button className="btn btn-login" type="submit" onClick={login}>
          LOGIN
        </button>
      </div>
    </div>
  );
}

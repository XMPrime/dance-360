import React, { useState } from "react";

const JudgeContext = React.createContext();

function JudgeContextProvider(props) {
  const [username, setUsername] = useState("jason");
  const [password, setPassword] = useState("testtest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [judgeDropdownIsOpen, setJudgeDropdownIsOpen] = useState(false);

  function toggleJudgeDropdown() {
    setJudgeDropdownIsOpen(!judgeDropdownIsOpen);
  }

  function handleChange(e) {
    const { value } = e.target;
    e.target.id === "username" ? setUsername(value) : setPassword(value);
  }

  function login(e) {
    const url = "https://api.d360test.com/api/auth/signin";
    // const formData = new FormData(document.getElementById("login-form"));
    // formData.append("name", username);
    // formData.append("password", password);
    // const bodyObj = { name: username, password: password };
    const axios = require("axios");
    axios
      .post(url, {
        name: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <JudgeContext.Provider
      value={{
        username,
        password,
        isLoggedIn,
        handleChange,
        login,
        judgeDropdownIsOpen,
        toggleJudgeDropdown
      }}
    >
      {props.children}
    </JudgeContext.Provider>
  );
}

export { JudgeContextProvider, JudgeContext };

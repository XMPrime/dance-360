import React, { useState } from "react";

const JudgeContext = React.createContext();

function JudgeContextProvider(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleChange(e) {
    const { value } = e.target;
    e.target.id === "username" ? setUsername(value) : setPassword(value);
    console.log(username);
  }

  function login(e) {
    if (username === "jason" && password === "asdf") {
      setIsLoggedIn(true);
    }
  }

  return (
    <JudgeContext.Provider
      value={{ username, password, isLoggedIn, handleChange, login }}
    >
      {props.children}
    </JudgeContext.Provider>
  );
}

export { JudgeContextProvider, JudgeContext };

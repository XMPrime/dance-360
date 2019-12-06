import { useState } from "react";

function useJudgeApp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleChange(e) {
    console.log(username, password);
    const { value } = e.target;
    e.target.id === "username" ? setUsername(value) : setPassword(value);
  }

  function login(e) {
    if (username === "jason" && password === "asdf") {
      setIsLoggedIn(true);
    }
  }

  return { username, password, isLoggedIn, handleChange, login };
}

export default useJudgeApp;

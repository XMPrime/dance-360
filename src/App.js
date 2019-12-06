import React, { useContext } from "react";
import "./App.css";
import "./css/index.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { JudgeContext } from "./JudgeContext";
import LoginPage from "./components/LoginPage";
import EventPage from "./components/EventPage";

function App() {
  const { isLoggedIn } = useContext(JudgeContext);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/events">
          {isLoggedIn ? <EventPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

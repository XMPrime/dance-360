import React from "react";
import "./App.css";
import "./css/index.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EventPage from "./components/EventPage";
import TourDatesPage from "./components/TourDatesPage";
import JudgeInfo from "./components/JudgeInfo";
import Scoring from "./components/Scoring";

import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/events">
            {isLoggedIn ? <EventPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/tour-dates">
            {isLoggedIn ? <TourDatesPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/judge-info">
            {isLoggedIn ? <JudgeInfo /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/scoring">
            {isLoggedIn ? <Scoring /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

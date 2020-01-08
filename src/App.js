import React, { useContext } from "react";
import "./App.css";
import "./css/index.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { JudgeContext } from "./JudgeContext";
import LoginPage from "./components/LoginPage";
import EventPage from "./components/EventPage";
import TourDatesPage from "./components/TourDatesPage";
import JudgeInfo from "./components/JudgeInfo";
import Scoring from "./components/Scoring";
import ScoringBreakdown from "./components/ScoringBreakdown";
import Rectangle from "./components/Rectangle";

function App() {
  const { isLoggedIn } = useContext(JudgeContext);

  return (
    <div className="App">
      {/* <ScoringBreakdown />
      <Rectangle /> */}
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
  );
}

export default App;

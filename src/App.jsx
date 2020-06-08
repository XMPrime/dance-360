import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import './css/index.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './components/pages/Login';
import Events from './components/pages/Events';
import TourDates from './components/pages/TourDates';
import JudgeInfo from './components/pages/JudgeInfo';
import Scoring from './components/pages/Scoring';

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <Router>
      <div className="App">
        {/* TODO import from routes.js + map them + create a private route isntead of all these if logged in statements */}
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <Login />
          </Route>
          <Route exact path="/events">
            {isLoggedIn ? <Events /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/tour-dates">
            {isLoggedIn ? <TourDates /> : <Redirect to="/" />}
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

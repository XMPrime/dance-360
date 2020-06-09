/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './App.css';
import './css/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/generic/PrivateRoute';

import routes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map(({ privateRoute, ...route }) =>
            privateRoute ? (
              <PrivateRoute key={route.path} {...route} />
            ) : (
              <Route key={route.path} {...route} />
            ),
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ path, exact, component }) {
  const { isLoggedIn } = useSelector((state) => state.login);

  return isLoggedIn ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  exact: false,
};

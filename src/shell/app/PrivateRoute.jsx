import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'shared/constants/routes';

export default function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return <Route {...rest}>{isAuthenticated ? children : <Redirect to={routes.login} />}</Route>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

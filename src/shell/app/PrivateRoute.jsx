import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';

export default function PrivateRoute({ children, ...rest }) {
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.LOGIN,
            state: { referrer: pathname },
          }}
        />
      )}
    </Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

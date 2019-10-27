import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;

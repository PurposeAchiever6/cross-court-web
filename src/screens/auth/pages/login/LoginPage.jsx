import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'screens/auth/components/LoginForm';

const LoginPage = ({ actions, isLoading, error }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <LoginForm loginHandler={actions.loginInit} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default LoginPage;

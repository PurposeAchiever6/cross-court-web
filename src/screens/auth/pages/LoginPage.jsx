import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from 'screens/auth/components/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { loginInit } from 'screens/auth/actionCreators';
import { getLoginLoading, getLoginError, getIsAuthenticated } from 'screens/auth/reducer';
import ROUTES from 'shared/constants/routes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);
  const loginAction = (credentials) => dispatch(loginInit(credentials));

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-20">
      <LoginForm loginHandler={loginAction} isLoading={isLoading} error={error} />
    </div>
  );
};

export default LoginPage;

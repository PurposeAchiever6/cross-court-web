import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from 'screens/auth/components/LoginForm';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginInit } from 'screens/auth/actionCreators';
import { getLoginLoading, getLoginError, getIsAuthenticated } from 'screens/auth/reducer';
import ROUTES from 'shared/constants/routes';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);
  const loginAction = credentials => dispatch(loginInit(credentials));

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <PageContainer>
      <LoginForm loginHandler={loginAction} isLoading={isLoading} error={error} />
    </PageContainer>
  );
};

export default LoginPage;

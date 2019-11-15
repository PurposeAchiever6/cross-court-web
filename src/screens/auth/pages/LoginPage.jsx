import React from 'react';
import LoginForm from 'screens/auth/components/LoginForm';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginInit } from 'screens/auth/actionCreators';
import { getLoginLoading, getLoginError } from 'screens/auth/reducer';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);
  const loginAction = credentials => dispatch(loginInit(credentials));

  return (
    <PageContainer>
      <LoginForm loginHandler={loginAction} isLoading={isLoading} error={error} />
    </PageContainer>
  );
};

export default LoginPage;

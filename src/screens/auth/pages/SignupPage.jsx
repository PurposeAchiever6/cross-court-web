import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import SignupForm from 'screens/auth/components/SignupForm';
import { signUpInit } from 'screens/auth/actionCreators';
import { getSignupLoading, getSignupErrors, getIsAuthenticated } from 'screens/auth/reducer';
import ROUTES from 'shared/constants/routes';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getSignupLoading);
  const errors = useSelector(getSignupErrors);
  const signupAction = credentials => dispatch(signUpInit(credentials));
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <PageContainer>
      <SignupForm signupHandler={signupAction} errors={errors} isLoading={isLoading} />
    </PageContainer>
  );
};

export default SignupPage;

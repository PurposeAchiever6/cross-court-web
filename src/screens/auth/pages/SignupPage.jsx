import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import SignupForm from 'screens/auth/components/SignupForm';
import { signUpInit } from 'screens/auth/actionCreators';
import { getSignupLoading, getSignupErrors } from 'screens/auth/reducer';

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

  return (
    <PageContainer>
      <SignupForm signupHandler={signupAction} errors={errors} isLoading={isLoading} />
    </PageContainer>
  );
};

export default SignupPage;

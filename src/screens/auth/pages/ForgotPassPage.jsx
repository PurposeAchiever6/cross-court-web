import React from 'react';
import ForgotPassForm from 'screens/auth/components/ForgotPassForm';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassInit } from 'screens/auth/actionCreators';
import { getForgotPassLoading, getForgotPassError } from 'screens/auth/reducer';
import styled from 'styled-components';

const PageContainer = styled.div`
`;

const ForgotPassPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getForgotPassLoading);
  const error = useSelector(getForgotPassError);
  const forgotPassAction = credentials => dispatch(forgotPassInit(credentials));

  return (
    <PageContainer>
      <ForgotPassForm forgotPassHandler={forgotPassAction} error={error} isLoading={isLoading} />
    </PageContainer>
  );
};

export default ForgotPassPage;

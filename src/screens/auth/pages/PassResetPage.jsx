import React from 'react';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { passResetInit } from 'screens/auth/actionCreators';
import { getPassResetLoading, getPassResetError } from 'screens/auth/reducer';
import PasswordResetForm from 'screens/auth/components/PasswordResetForm';
import utils from 'shared/utils/auth';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PassResetPage = ({ location }) => {
  const { client, token, uid } = queryString.parse(location.search);
  utils.setTokens({ client, accessToken: token, uid });

  const dispatch = useDispatch();
  const isLoading = useSelector(getPassResetLoading);
  const error = useSelector(getPassResetError);
  const passResetAction = credentials => dispatch(passResetInit(credentials));

  return (
    <PageContainer>
      <PasswordResetForm passResetHandler={passResetAction} error={error} isLoading={isLoading} />
    </PageContainer>
  );
};

export default PassResetPage;

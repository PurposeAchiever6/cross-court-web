import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { isNil } from 'ramda';
import { useDispatch } from 'react-redux';

import CheckIcon from 'shared/images/check-icon.png';
import Button from 'shared/components/Button';
import ROUTES from 'shared/constants/routes';
import useQuery from 'shared/hooks/useQuery';
import StorageUtils from 'shared/utils/storage';

import { autoLogin } from '../actionCreators';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    margin: 5rem 0;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 3.75rem;
  }
`;

const SignupConfirmationPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const client = query.get('client');
  const accessToken = query.get('access-token');
  const uid = query.get('uid');

  useEffect(() => {
    dispatch(autoLogin({ client, accessToken, uid }));
  }, [accessToken, client, dispatch, uid]);

  const savedSession = StorageUtils.getSavedSession();

  if (!isNil(savedSession)) {
    return <Redirect to={ROUTES.SERIES} />;
  }

  return (
    <PageContainer>
      <img src={CheckIcon} alt="Check icon" />
      <h1>Your e-mail was successfully verified!</h1>
      <Link to={ROUTES.MYACCOUNT}>
        <Button>Continue</Button>
      </Link>
    </PageContainer>
  );
};

export default SignupConfirmationPage;

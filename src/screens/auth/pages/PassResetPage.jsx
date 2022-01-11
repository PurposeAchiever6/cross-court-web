import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { passResetInit } from 'screens/auth/actionCreators';
import { getPassResetLoading, getPassResetError } from 'screens/auth/reducer';
import AuthUtils from 'shared/utils/auth';
import PasswordResetForm from 'screens/auth/components/PasswordResetForm';

const PassResetPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { client, token, uid } = queryString.parse(location.search);
  AuthUtils.setTokens({ client, accessToken: token, uid });

  const isLoading = useSelector(getPassResetLoading);
  const error = useSelector(getPassResetError);
  const passResetAction = (credentials) => dispatch(passResetInit(credentials));

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-16">
      <PasswordResetForm passResetHandler={passResetAction} error={error} isLoading={isLoading} />
    </div>
  );
};

export default PassResetPage;

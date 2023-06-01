import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useQuery from 'shared/hooks/useQuery';

import ROUTES from 'shared/constants/routes';
import { autoLogin, logoutInit } from 'screens/auth/actionCreators';
import toast from 'shared/utils/toast';
import Loading from 'shared/components/Loading';

const SignupConfirmationPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  const success = query.get('success') === 'true';
  const error = query.get('error');
  const client = query.get('client');
  const accessToken = query.get('access-token');
  const uid = query.get('uid');

  const successFlow = success && client && accessToken && uid;

  useEffect(() => {
    if (successFlow) {
      dispatch(autoLogin({ client, accessToken, uid }));
      toast.success('Your email has been confirmed.');
    } else {
      dispatch(logoutInit({ redirectTo: ROUTES.LOGIN }));

      if (error) {
        toast.error(error);
      }
    }
  }, []);

  return successFlow ? <Redirect to={ROUTES.ONBOARDING_PERSONAL_DETAILS} /> : <Loading />;
};

export default SignupConfirmationPage;

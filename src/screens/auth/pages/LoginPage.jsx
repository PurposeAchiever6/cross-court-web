import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import humps from 'humps';

import ROUTES from 'shared/constants/routes';
import AuthUtils from 'shared/utils/auth';
import { getIsAuthenticated, getShowResetPasswordModal } from 'screens/auth/reducer';
import {
  showResetPasswordModal as showResetPasswordModalAction,
  closeResetPasswordModal as closeResetPasswordModalAction,
} from 'screens/auth/actionCreators';
import AuthPageLayout from 'shared/components/layout/AuthPageLayout';
import Link from 'shared/components/Link';
import LoginForm from 'screens/auth/components/LoginForm';
import ResetPasswordModal from 'screens/auth/components/modals/ResetPasswordModal';
import loginImg from 'screens/auth/images/login.jpeg';

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { client, token, uid, resetPassword } = humps.camelizeKeys(
    queryString.parse(location.search)
  );

  const showResetPasswordModal = useSelector(getShowResetPasswordModal);

  const isAuthenticated = useSelector(getIsAuthenticated);

  const setShowResetPasswordModal = (show) => {
    show ? dispatch(showResetPasswordModalAction()) : dispatch(closeResetPasswordModalAction());
  };

  useEffect(() => {
    if (resetPassword === 'true') {
      AuthUtils.setTokens({ client, accessToken: token, uid });
      setShowResetPasswordModal(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <AuthPageLayout image={loginImg}>
        <div className="md:absolute md:top-0 md:right-0 text-right text-sm mb-8">
          <span className="mr-2">New to Crosscourt?</span>
          <Link variant="purple-dark" to={ROUTES.SIGNUP}>
            Sign Up
          </Link>
        </div>
        <h1 className="font-shapiro95_super_wide text-3xl md:text-4xl xl:text-5xl mb-4">
          Welcome Back
        </h1>
        <LoginForm />
      </AuthPageLayout>
      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        closeHandler={() => setShowResetPasswordModal(false)}
      />
    </>
  );
};

export default LoginPage;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { sendConfirmationEmailInit } from 'screens/auth/actionCreators';
import AuthPageLayout from 'shared/components/layout/AuthPageLayout';
import signupVerificationImg from 'screens/auth/images/signup-verification.jpeg';
import Link from 'shared/components/Link';

const SignupVerificationPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);

  const sendConfirmationEmail = () => dispatch(sendConfirmationEmailInit());

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <AuthPageLayout image={signupVerificationImg}>
      <h1 className="font-shapiro95_super_wide text-3xl md:text-4xl xl:text-5xl mb-4 mt-6 md:mt-0">
        Let's Verify.
      </h1>
      <div className="font-shapiro95_super_wide text-2xl mb-4">We just sent you an email.</div>
      <p className="mb-4">Please check your email for a link to continue forward.</p>
      <p>
        <Link variant="purple-dark" onClick={sendConfirmationEmail} className="text-sm">
          Resend link
        </Link>
      </p>
    </AuthPageLayout>
  );
};

export default SignupVerificationPage;

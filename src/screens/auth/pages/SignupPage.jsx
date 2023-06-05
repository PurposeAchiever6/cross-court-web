import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import AuthPageLayout from 'shared/components/layout/AuthPageLayout';
import Link from 'shared/components/Link';
import SignupForm from 'screens/auth/components/SignupForm';
import signupImg from 'screens/auth/images/signup.jpg';

const SignupPage = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <AuthPageLayout image={signupImg}>
      <div className="md:absolute md:top-0 md:right-0 text-right text-sm mb-8">
        <span className="mr-2">Already a member?</span>
        <Link variant="purple-dark" to={ROUTES.LOGIN}>
          Log In
        </Link>
      </div>
      <h1 className="font-shapiro95_super_wide text-3xl md:text-4xl xl:text-5xl mb-4">
        Let's Begin.
      </h1>
      <SignupForm />
    </AuthPageLayout>
  );
};

export default SignupPage;

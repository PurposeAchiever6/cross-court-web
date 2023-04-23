import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import OnboardingPageLayout from 'shared/components/layout/OnboardingPageLayout';
import Link from 'shared/components/Link';
import LoginForm from 'screens/auth/components/LoginForm';
import loginImg from 'screens/auth/images/login.jpeg';

const LoginPage = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <OnboardingPageLayout image={loginImg}>
      <div className="md:absolute md:top-0 md:right-0 text-center text-sm mb-6">
        <span className="mr-2">New to Crosscourt?</span>
        <Link variant="purple-dark" to={ROUTES.SIGNUP}>
          Sign Up
        </Link>
      </div>
      <h1 className="font-shapiro95_super_wide text-center text-3xl md:text-4xl mb-8">
        Welcome Back
      </h1>
      <LoginForm />
    </OnboardingPageLayout>
  );
};

export default LoginPage;

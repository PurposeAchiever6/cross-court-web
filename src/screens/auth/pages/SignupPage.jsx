import React from 'react';
import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import SignupForm from 'screens/auth/components/SignupForm';
import { signUpInit } from 'screens/auth/actionCreators';
import { getSignupLoading, getSignupErrors, getIsAuthenticated } from 'screens/auth/reducer';
import ROUTES from 'shared/constants/routes';
import signUnImage1 from 'screens/auth/images/sign_up_image_01.png';
import signUnImage2 from 'screens/auth/images/sign_up_image_02.png';

const SignupPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getSignupLoading);
  const errors = useSelector(getSignupErrors);
  const signupAction = (credentials) => dispatch(signUpInit(credentials));
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <img
        src={signUnImage1}
        alt="Sign up to sweat"
        className="absolute bottom-0 left-0 w-2/5 md:w-1/5 z-n-1"
      />
      <img
        src={signUnImage2}
        alt="Sign up, first free"
        className="absolute bottom-0 right-0 w-2/5 md:w-1/5 z-n-1"
      />
      <SignupForm signupHandler={signupAction} errors={errors} isLoading={isLoading} />
    </div>
  );
};

export default SignupPage;

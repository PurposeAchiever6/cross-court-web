import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { getUserEmail } from 'screens/auth/reducer';
import PaperPlaneIcon from 'shared/images/paper-plane-icon.png';

const ForgotPassSuccess = () => {
  const userEmail = useSelector(getUserEmail);

  return (
    <div className="w-full max-w-md mx-auto text-center px-4 py-16">
      <h1 className="font-shapiro95_super_wide text-3xl uppercase mb-14">Check Your Email</h1>
      <img src={PaperPlaneIcon} alt="sent-mail-icon" className="inline-block mb-16" />
      <p className="mb-12">
        We sent an email to <strong>{userEmail}</strong> which contains an link to reset your
        password.
      </p>
      <Link to={ROUTES.LOGIN} className="font-bold hover:underline">
        <strong>Back to Log In</strong>
      </Link>
    </div>
  );
};

export default ForgotPassSuccess;

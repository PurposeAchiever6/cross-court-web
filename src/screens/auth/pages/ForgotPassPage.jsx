import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { forgotPassInit } from 'screens/auth/actionCreators';
import { getForgotPassLoading, getForgotPassError } from 'screens/auth/reducer';
import ForgotPassForm from 'screens/auth/components/ForgotPassForm';

const ForgotPassPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getForgotPassLoading);
  const error = useSelector(getForgotPassError);
  const forgotPassAction = (credentials) => dispatch(forgotPassInit(credentials));

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-16">
      <ForgotPassForm forgotPassHandler={forgotPassAction} error={error} isLoading={isLoading} />
    </div>
  );
};

export default ForgotPassPage;

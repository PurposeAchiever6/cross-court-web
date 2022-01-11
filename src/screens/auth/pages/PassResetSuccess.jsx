import React from 'react';

import ROUTES from 'shared/constants/routes';
import CheckIcon from 'shared/images/check-icon.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const PassResetSuccess = () => (
  <div className="w-full max-w-sm mx-auto text-center px-4 py-16">
    <h1 className="font-shapiro95_super_wide text-3xl uppercase mb-14">Password Reset</h1>
    <img src={CheckIcon} alt="check-icon" className="inline-block mb-12" />
    <p className="mb-12">Your Crosscourt password was been succesfully reset</p>
    <PrimaryButton to={ROUTES.LOGIN}>Go to Login</PrimaryButton>
  </div>
);

export default PassResetSuccess;

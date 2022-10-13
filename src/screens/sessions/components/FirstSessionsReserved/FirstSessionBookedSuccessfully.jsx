import React from 'react';
import { useSelector } from 'react-redux';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import { capitalize } from 'shared/utils/helpers';
import { getUserProfile } from 'screens/my-account/reducer';

const FirstSessionBookedSuccessfully = ({ className }) => {
  const env = runtimeEnv();

  const userProfile = useSelector(getUserProfile);

  const promoCode = env.REACT_APP_FIRST_TIMER_PROMO_CODE;
  const percentageDiscount = env.REACT_APP_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

  return (
    <div className={className}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-shapiro95_super_wide uppercase text-center mb-6">
        Thanks {capitalize(userProfile.firstName)}!
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl">
        Your first session is booked! Check out this CC INTRO OFFER: Use promo code{' '}
        <span className="text-cc-purple">{promoCode}</span> at checkout for {percentageDiscount}%
        off your first month! Choose a membership below.
      </h2>
    </div>
  );
};

FirstSessionBookedSuccessfully.defaultProps = {
  className: '',
};

FirstSessionBookedSuccessfully.propTypes = {
  className: PropTypes.string,
};

export default FirstSessionBookedSuccessfully;

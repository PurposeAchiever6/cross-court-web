import React from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

const MembershipPromoCodeAlert = ({ className }) => {
  const env = runtimeEnv();
  const promoCode = env.REACT_APP_FIRST_TIMER_PROMO_CODE;
  const percentageDiscount = env.REACT_APP_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

  return (
    <div className={`bg-cc-purple text-white p-4 ${className}`}>
      Get {percentageDiscount}% off for your first month using code <strong>{promoCode}</strong>.
      Only valid before your first session!
    </div>
  );
};
MembershipPromoCodeAlert.defaultProps = {
  className: '',
};

MembershipPromoCodeAlert.propTypes = {
  className: PropTypes.string,
};

export default MembershipPromoCodeAlert;

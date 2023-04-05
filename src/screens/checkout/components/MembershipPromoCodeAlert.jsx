import React from 'react';

import PropTypes from 'prop-types';

const MembershipPromoCodeAlert = ({ className }) => {
  const promoCode = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE;
  const percentageDiscount = import.meta.env.VITE_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

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

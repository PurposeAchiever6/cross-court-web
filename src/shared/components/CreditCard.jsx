import React from 'react';
import PropTypes from 'prop-types';

import CreditCardSvg from 'shared/components/svg/CreditCardSvg';
import ccLogo from 'shared/images/logos/cc-white.png';

const CreditCard = ({ last4, expMonth, expYear }) => (
  <div className="relative md:w-max">
    <CreditCardSvg className="w-full md:w-48" />
    <img
      className="absolute w-12 md:w-8 top-8 md:top-4 left-8 md:left-5"
      src={ccLogo}
      alt="cc-logo"
    />
    <span className="absolute bottom-12 md:bottom-10 right-6 md:right-5 text-sm md:text-xs text-cc-black font-shapiro95_super_wide">
      {expMonth}/{expYear}
    </span>
    <span className="absolute bottom-6 md:bottom-4 right-6 md:right-5 text-2xl md:text-lg text-cc-black font-shapiro95_super_wide">
      {last4}
    </span>
  </div>
);

CreditCard.propTypes = {
  last4: PropTypes.string.isRequired,
  expMonth: PropTypes.number.isRequired,
  expYear: PropTypes.number.isRequired,
};

export default CreditCard;

import React from 'react';
import PropTypes from 'prop-types';

import { isRecurring, formatPrice } from 'screens/products/utils';
import { isForever } from 'screens/promo-codes/utils';

const RecurringProductInformation = ({ product, promoCode, className }) => {
  const { priceForUser, promoCodeAppliedPrice } = product;

  if (!isRecurring(product)) {
    return null;
  }

  if (!promoCode) {
    return <div className={className}>Recurring monthly price: {formatPrice(priceForUser)}</div>;
  }

  const { durationInMonths } = promoCode;

  if (isForever(promoCode)) {
    return (
      <div className={className}>
        Recurring monthly price forever: {formatPrice(promoCodeAppliedPrice)}
      </div>
    );
  }

  const monthsApplied = Array.from({ length: durationInMonths }, (_, i) => `${i + 1}`);
  const monthsAppliedListFormat = new Intl.ListFormat().format(monthsApplied);

  return (
    <div className={className}>
      <span className="block mb-1">
        {`Month ${monthsAppliedListFormat}: ${formatPrice(promoCodeAppliedPrice)}`}
      </span>
      <span className="block text-xs">
        Recurring monthly price after: {formatPrice(priceForUser)}
      </span>
    </div>
  );
};

RecurringProductInformation.defaultProps = {
  product: null,
  promoCode: null,
  className: '',
};

RecurringProductInformation.propTypes = {
  product: PropTypes.shape(),
  promoCode: PropTypes.shape(),
  className: PropTypes.string,
};

export default RecurringProductInformation;

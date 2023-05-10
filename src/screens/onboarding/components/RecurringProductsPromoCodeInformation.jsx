import React from 'react';
import PropTypes from 'prop-types';

import { isForever } from 'screens/promo-codes/utils';
import { titleize } from 'shared/utils/helpers';
import { isRecurring, formatPrice } from 'screens/products/utils';

const RecurringProductsPromoCodeInformation = ({ products, className }) => {
  const filteredProducts = products.filter(
    (product) => isRecurring(product) && product.promoCode && !isForever(product.promoCode)
  );

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {filteredProducts.map((product, index) => (
        <p
          key={product.id}
          className={`text-sm ${index + 1 < filteredProducts.length ? 'mb-4' : ''}`}
        >
          <span className="font-shapiro95_super_wide">
            Special Offer for {titleize(product.name)}:
          </span>{' '}
          After your first{' '}
          {product.promoCode.durationInMonths === 1
            ? 'month'
            : `${product.promoCode.durationInMonths} months`}
          , {titleize(product.name)} membership will auto renew at the full{' '}
          {formatPrice(product.priceForUser)} per month rate. You have the option to downgrade or
          upgrade any time before your next billing date.
        </p>
      ))}
    </div>
  );
};

RecurringProductsPromoCodeInformation.defaultProps = {
  className: '',
};

RecurringProductsPromoCodeInformation.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

export default RecurringProductsPromoCodeInformation;

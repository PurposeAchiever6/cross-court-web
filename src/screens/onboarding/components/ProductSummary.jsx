import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { formatPrice } from 'screens/products/utils';
import { getPromoCodeApplied } from 'screens/onboarding/reducer';
import RecurringProductInformation from 'screens/onboarding/components/RecurringProductInformation';

const ProductSummary = ({ product, className }) => {
  const promoCodeApplied = useSelector(getPromoCodeApplied);

  const { name, description, priceForUser, promoCodeAppliedPrice } = product;

  return (
    <div className={`border border-black ${className}`}>
      <h3 className="border-b-2 border-black font-shapiro95_super_wide text-center text-xl py-2">
        {name}
      </h3>
      <div className="p-4">
        <div className="border-b border-black pb-3 mb-3">
          <div className="mb-2">{name}</div>
          <p className="text-sm">{description}</p>
          <RecurringProductInformation
            product={product}
            promoCode={promoCodeApplied}
            className="text-sm mt-5"
          />
        </div>
        <div className="text-lg">
          Total Today:{' '}
          <span className={promoCodeAppliedPrice ? 'line-through text-error-600' : ''}>
            {formatPrice(priceForUser)}
          </span>
          {promoCodeAppliedPrice && (
            <span className="ml-2">{formatPrice(promoCodeAppliedPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

ProductSummary.defaultProps = {
  className: '',
};

ProductSummary.propTypes = {
  product: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default ProductSummary;

import React from 'react';
import PropTypes from 'prop-types';

import { isRecurring, formatPrice } from 'screens/products/utils';
import { titleize } from 'shared/utils/helpers';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import reviewImg from 'screens/onboarding/images/review.jpeg';

const PurchaseDetails = ({ product, paymentMethod, className }) => {
  const recurringProduct = isRecurring(product);

  return (
    <div className={className}>
      <div className="border border-black mb-2">
        <div className="p-4 border-b border-black">
          <h4 className="font-shapiro95_super_wide text-lg mb-1">Purchase</h4>
          <div>{titleize(`${product.name}${recurringProduct ? ' membership' : ''}`)}</div>
        </div>
        <div className="p-4 border-b border-black">
          <h4 className="font-shapiro95_super_wide text-lg mb-1">Payment</h4>
          <div>
            <span className="mr-2">{titleize(paymentMethod.brand)}</span>
            <span className="mr-2">**** **** ****</span>
            <span>{paymentMethod.last4}</span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-shapiro95_super_wide text-lg mb-1">Total Today</h4>
          <div>{formatPrice(product.promoCodeAppliedPrice || product.priceForUser)}</div>
        </div>
      </div>
      <LazyBackgroundImage
        img={reviewImg}
        className="bg-no-repeat bg-cover bg-center h-[25rem] md:h-[30rem]"
      />
    </div>
  );
};

PurchaseDetails.defaultProps = {
  className: '',
};

PurchaseDetails.propTypes = {
  product: PropTypes.shape().isRequired,
  paymentMethod: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default PurchaseDetails;

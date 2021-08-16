import React from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';

import { RECURRING } from 'screens/products/constants';
import { productPrice } from 'screens/products/utils';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const ProductPlan = ({
  product,
  submitText,
  submitBtnSecondary,
  handleSubmit,
  userHasActiveSubscription,
  className,
}) => {
  const formatPrice = (price) =>
    currency(price, {
      formatWithSymbol: true,
      precision: 0,
    }).format();

  const price = formatPrice(productPrice(product, userHasActiveSubscription));
  const isUnlimited = product.credits < 0;
  const sessionPricePerMonth = formatPrice(product.price / product.credits);

  const isRecurring = product.productType === RECURRING;
  const label = product.label;

  return (
    <div
      className={`relative border-2 border-cc-purple bg-cc-black text-white lg:text-center py-6 px-5 lg:px-8 transform lg:hover:scale-115 transition-transform duration-300 ${className} ${
        label ? 'pl-14 lg:pl-8' : ''
      }`}
    >
      <div className="inline-block mb-5 lg:h-9">
        <h2 className="inline-block lg:block text-xl lg:text-2xl shapiro96_inclined_wide leading-none uppercase">
          {product.name}
          {!isRecurring && <span>*</span>}
        </h2>
        {isRecurring && (
          <span className="lg:block text-left shapiro95_super_wide text-xs leading-none">
            /month*
          </span>
        )}
      </div>
      <div className="lg:h-44 mb-4">
        <div className="dharma_gothic_cheavy_italic mb-3 lg:mb-0">
          <span className="text-9xl lg:text-10xl">{price}</span>
          {isRecurring && <span className="text-3xl lg:text-6xl">/month</span>}
        </div>
        {isRecurring && !isUnlimited && (
          <div className="shapiro95_super_wide -mt-2 lg:-mt-4">{`${sessionPricePerMonth}/session`}</div>
        )}
      </div>
      <div className="absolute lg:static top-1/2 right-5 transform lg:transform-none -translate-y-1/2 lg:mb-4">
        <PrimaryButton
          inverted={submitBtnSecondary}
          bg={submitBtnSecondary && 'transparent'}
          onClick={() => handleSubmit(product)}
        >
          {submitText}
        </PrimaryButton>
      </div>
      <div className="lg:h-4">
        {!isUnlimited && (
          <div className="text-xs">
            {isRecurring ? '*Sessions do not rollover' : '*Expires in 30 Days'}
          </div>
        )}
      </div>
      {label && (
        <>
          <div className="hidden lg:block text-center absolute -inset-x-0.5 -top-8 bg-cc-purple border-2 border-cc-purple shapiro95_super_wide text-black py-1 uppercase">
            {label}
          </div>
          <div className="lg:hidden absolute inset-y-0 left-0 bg-cc-purple shapiro95_super_wide text-black w-8">
            <div className="text-center absolute top-1/2 -left-28 transform -translate-y-1/2 -rotate-90 whitespace-nowrap w-64 uppercase">
              {label}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ProductPlan.defaultProps = {
  className: '',
  submitText: 'Buy',
  submitBtnSecondary: false,
  userHasActiveSubscription: false,
};

ProductPlan.propTypes = {
  className: PropTypes.string,
  submitText: PropTypes.string,
  submitBtnSecondary: PropTypes.bool,
  product: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userHasActiveSubscription: PropTypes.bool,
};

export default ProductPlan;

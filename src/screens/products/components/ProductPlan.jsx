import React from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import { RECURRING } from 'screens/products/constants';
import { productPrice } from 'screens/products/utils';
import Ball from 'shared/images/white-circular-logo.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const ProductPlan = ({
  product,
  submitText,
  submitBtnSecondary,
  handleSubmit,
  userHasActiveSubscription,
  className,
}) => {
  const env = runtimeEnv();
  const SAMPLE_UNLIMITED_SESSIONS_PER_MONTH = env.REACT_APP_SAMPLE_UNLIMITED_SESSIONS_PER_MONTH;

  const formatPrice = (price) =>
    currency(price, {
      formatWithSymbol: true,
      precision: 0,
    }).format();

  const price = formatPrice(productPrice(product, userHasActiveSubscription));
  const isUnlimited = product.credits < 0;
  const sessionPricePerMonth = formatPrice(product.price / product.credits);
  const unlimitedPricePerSession = formatPrice(product.price / SAMPLE_UNLIMITED_SESSIONS_PER_MONTH);

  const isRecurring = product.productType === RECURRING;
  const label = product.label;

  return (
    <div
      className={`relative border-2 border-cc-purple bg-cc-black text-white lg:text-center py-6 px-5 lg:px-8 transform lg:hover:scale-115 transition-transform duration-300 ${className} ${
        label ? 'pl-14 lg:pl-8' : ''
      }`}
    >
      <div className="inline-block mb-5 lg:h-9">
        <h2 className="inline-block lg:block text-xl 2xl:text-2xl shapiro96_inclined_wide leading-none uppercase">
          {product.name}
          {!isRecurring && <span>*</span>}
        </h2>
        {isRecurring && (
          <span className="lg:block text-left shapiro95_super_wide text-xs leading-none">
            /month*
          </span>
        )}
      </div>
      <div className={`mb-6 lg:mb-4 ${isRecurring ? 'lg:h-116' : 'lg:h-44'}`}>
        <div className="dharma_gothic_cheavy_italic mb-3 lg:mb-0">
          <span className="text-9xl xl:text-10xl">{price}</span>
          {isRecurring && <span className="text-3xl lg:text-6xl">/month</span>}
        </div>
        {isRecurring && !isUnlimited && (
          <div className="shapiro95_super_wide text-xs -mt-2 lg:-mt-2 2xl:text-sm">{`${sessionPricePerMonth}/session`}</div>
        )}
        {isUnlimited && (
          <div className="shapiro95_super_wide text-xs -mt-2 2xl:text-sm">
            {`${unlimitedPricePerSession}/session @ ${SAMPLE_UNLIMITED_SESSIONS_PER_MONTH}/month`}
          </div>
        )}
        {isRecurring && (
          <>
            <h2 className="mb-3 mt-6 text-lg text-left xl:text-xl shapiro96_inclined_wide leading-none uppercase">
              FEATURES
            </h2>
            <div className="flex mb-2">
              <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
              <div className="text-sm text-left mt-2 ml-2">
                <div>Month to month</div>
                <div>Reduced additional sessions</div>
                <div>Highlights</div>
                <div>Waitlist priority</div>
              </div>
            </div>
            <div className="flex mb-2">
              <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
              <div className="text-sm text-left mt-2 ml-2">Open Club Access</div>
            </div>
            {isRecurring && (
              <div className="flex mb-2">
                <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
                <div className="text-sm text-left mt-2 ml-2">Free Jersey Rental</div>
              </div>
            )}
            {isUnlimited && (
              <div className="flex mb-2">
                <img className="w-5 h-5 ml-1 mt-2" src={Ball} alt="Icon" />
                <div className="text-sm text-left mt-2 ml-2">No late cancellation fee</div>
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={`absolute lg:static right-5 transform lg:transform-none -translate-y-1/3 lg:mb-4 ${
          isRecurring ? 'top-1/4' : 'top-1/2'
        }`}
      >
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

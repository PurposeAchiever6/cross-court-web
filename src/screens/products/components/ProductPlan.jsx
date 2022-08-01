import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import currency from 'currency.js';

import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING, UNLIMITED_VALUE } from 'screens/products/constants';
import { productDiscount } from 'screens/products/utils';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const ProductPlan = ({
  product,
  submitText,
  submitBtnSecondary,
  handleSubmit,
  showFeatures,
  className,
}) => {
  const currentUser = useSelector(getUserProfile);

  const formatPrice = (price) =>
    currency(price, {
      formatWithSymbol: true,
      precision: 0,
    }).format();

  const isUnlimited = product.credits === UNLIMITED_VALUE;
  const sessionsCreditsString = isUnlimited ? 'Unlimited' : product.credits.toString();
  const skillSessionCreditsString =
    product.skillSessionCredits === UNLIMITED_VALUE
      ? 'Unlimited'
      : product.skillSessionCredits.toString();

  const price = formatPrice(product.priceForUser);

  const isRecurring = product.productType === RECURRING;
  const label = product.label;
  const { discountPercentage, discountReason } = productDiscount(product, currentUser);

  return (
    <div
      className={`relative border-2 border-cc-purple bg-cc-black text-white lg:text-center py-6 px-5 lg:px-8 transform lg:hover:scale-110 transition-transform duration-300 ${className} ${
        label ? 'pl-14 lg:pl-8' : ''
      }`}
    >
      <div className="inline-block mb-5 lg:h-9">
        <h2 className="inline-block lg:block text-3xl 2xl:text-2xl font-shapiro96_inclined_wide leading-none uppercase">
          {product.name}
          {!isRecurring && <span>*</span>}
        </h2>
      </div>
      <div className="mb-6 lg:mb-10">
        <div className="dharma_gothic_cheavy_italic mb-3 lg:mb-0">
          <span className="text-9xl xl:text-10xl">{price}</span>
          {isRecurring && <span className="text-3xl lg:text-6xl">/month</span>}
        </div>
        {discountPercentage > 0 && (
          <div className="shapiro95_super_wide bg-cc-purple text-cc-black text-xs -mt-2 md:mt-0 2xl:text-sm lg:-mx-2 p-2 rounded-sm">
            {`${discountPercentage}% discount for ${discountReason}`}
          </div>
        )}
        {isRecurring && showFeatures && (
          <div className="h-64 lg:h-80 flex flex-col">
            <h2 className="my-3 text-transparent text-stroke-white text-stroke-width-1 text-lg text-left xl:text-xl font-shapiro96_inclined_wide leading-none uppercase">
              WHAT'S INCLUDED
            </h2>
            <div className="text-xs font-shapiro96_inclined_wide text-left uppercase">
              <p className="mt-2">
                <span className="text-cc-purple">{sessionsCreditsString}</span> sessions per month
              </p>
              <p className="mt-2">
                <span className="text-cc-purple">{skillSessionCreditsString}</span> free sklz
                sessions per month
              </p>
              {!isUnlimited && (
                <p className="mt-2">
                  <span className="text-cc-purple">{product.maxRolloverCredits}</span> rollover
                  sessions per month
                </p>
              )}
              <p className="mt-2">Free jersey/towel rental</p>
              <p className="mt-2">Members only event access</p>
              <p className="mt-2">Online community forum access</p>
              {isUnlimited && <p className="mt-2">No late cancellation fee</p>}
              <p className="mt-2 text-cc-purple">Plus all memberships perks below</p>
            </div>
          </div>
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
        {!isRecurring && <div className="text-xs">*Expires in 30 Days</div>}
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
  showFeatures: true,
};

ProductPlan.propTypes = {
  className: PropTypes.string,
  submitText: PropTypes.string,
  submitBtnSecondary: PropTypes.bool,
  product: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showFeatures: PropTypes.bool,
};

export default ProductPlan;

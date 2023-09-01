import React from 'react';
import PropTypes from 'prop-types';

import { isRecurring, formatPrice, isTrial } from 'screens/products/utils';
import { isForever } from 'screens/promo-codes/utils';
import Badge from 'shared/components/Badge';
import SelectableBox from 'shared/components/SelectableBox';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';

const Product = ({ selectProduct, selectedProduct, product, className }) => {
  const { id, name, description, priceForUser, promoCode, trial, credits, creditsExpirationDays } =
    product;
  const { durationInMonths, discountedPrice } = promoCode || {};
  const recurringProduct = isRecurring(product);
  const trialProduct = isTrial(product);

  const recurringAndHasPromoCode = recurringProduct && promoCode?.validForUser;
  const trialAndHasPromoCode = trialProduct && promoCode?.validForUser;
  const promoCodeForever = isForever(promoCode);

  const priceType = (() => {
    if (recurringAndHasPromoCode) {
      if (promoCodeForever) {
        return 'Forever';
      }

      return durationInMonths === 1 ? 'First Month' : `First ${durationInMonths} Months`;
    }

    if (trial) {
      return 'Flat fee';
    }

    return recurringProduct ? '/mo.' : '1 day';
  })();

  const promoCodeSavedMoney = () => {
    const savedAmountPrice = formatPrice(priceForUser - discountedPrice);

    if (promoCodeForever) {
      return `Get ${savedAmountPrice} off forever`;
    }

    return `Get ${savedAmountPrice} ${
      durationInMonths === 1 ? 'off your first month' : `in your first ${durationInMonths} months`
    }`;
  };

  return (
    <SelectableBox
      variant={recurringProduct ? 'blue-light' : 'white'}
      selected={selectedProduct?.id === id}
      onClick={() => selectProduct(product)}
      className={className}
    >
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0 sm:mr-14">
          <h3 className="font-shapiro95_super_wide text-2xl mb-3">{name}</h3>
          {trialProduct && (
            <div className="-mt-3">
              <span className="text-sm">
                {credits} for 1 Day Pass. Expires in {creditsExpirationDays} days.
              </span>
              {trialAndHasPromoCode && (
                <>
                  <LineDashedSvg className="my-2" />
                  <span className="block">{promoCodeSavedMoney()}</span>
                  <span className="block text-sm opacity-80">
                    Buy membership within 7 days post-trial.
                  </span>
                </>
              )}
            </div>
          )}
          {recurringAndHasPromoCode && (
            <Badge variant="white" align="left" className="mb-3 -mt-2">
              {promoCodeSavedMoney()}
            </Badge>
          )}
          <p className="text-sm">
            {description}{' '}
            {recurringAndHasPromoCode && (
              <span className="font-shapiro95_super_wide">
                {promoCodeForever
                  ? `Regular price is ${formatPrice(priceForUser)}.`
                  : `${formatPrice(priceForUser)}/month ongoing.`}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center">
          <span className="font-shapiro95_super_wide sm:font-dharma_gothic_cheavy text-2xl sm:text-9xl mr-2 sm:mr-3">
            {formatPrice(recurringAndHasPromoCode ? discountedPrice : priceForUser)}
          </span>
          <span className="inline-block text-sm sm:text-base sm:w-16">{priceType}</span>
        </div>
      </div>
    </SelectableBox>
  );
};

Product.defaultProps = {
  selectedProduct: null,
  className: '',
};

Product.propTypes = {
  selectProduct: PropTypes.func.isRequired,
  product: PropTypes.shape().isRequired,
  selectedProduct: PropTypes.shape(),
  className: PropTypes.string,
};

export default Product;

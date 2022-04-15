import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import currency from 'currency.js';
import PropTypes from 'prop-types';

import { purchaseFormattedDate } from 'shared/utils/date';
import CCIcon from 'shared/components/CCIcon';
import Label from 'shared/components/Label';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Spinner from 'shared/components/Spinner';
import { productPrice } from 'screens/products/utils';
import { RECURRING } from 'screens/products/constants';

import Prorate from './Prorate';
import PromoCode from './PromoCode';
import { getCheckoutLoading } from '../reducer';
import { clearDiscount } from '../actionCreators';

const PurchaseDetails = ({
  productDetails,
  paymentMethod,
  checkoutHandler,
  userProfile,
  prorate,
  prorateLoading,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCheckoutLoading);
  const [useCcCash, setUseCcCash] = useState(false);

  const purchaseDate = purchaseFormattedDate();
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  const isDropIn = productDetails.productType !== RECURRING;
  const isSubscription = !isDropIn;
  const ccCash = Number(userProfile.ccCash);
  const productPriceAmount = productPrice(productDetails, userHasActiveSubscription);

  const price = currency(productPriceAmount, {
    formatWithSymbol: true,
    precision: 2,
  }).format();

  useEffect(() => {
    dispatch(clearDiscount());
  }, [dispatch]);

  return (
    <div className="w-full md:w-3/5 2xl:w-2/5 min-h-screen px-4">
      <div className="border-4 border-cc-purple p-8 text-lg">
        <div className="text-right font-shapiro95_super_wide md:text-xl mb-4">{purchaseDate}</div>

        <div className="mb-4">
          <Label color="purple" className="mb-2">
            YOUR PURCHASE
          </Label>
          <div className="text-xl">{productDetails.name}</div>
          <div>{productDetails.description}</div>
        </div>

        <div className="mb-4">
          <Label color="purple" className="mb-2">
            PAYMENT METHOD
          </Label>
          <div className="flex items-center">
            <CCIcon ccType={paymentMethod.brand} fontSize="2.5rem" />
            <div className="flex flex-col ml-4 font-shapiro95_super_wide">
              <span className="md:text-xl">{`***${paymentMethod.last4}`}</span>
              <div>
                <span>Expires {`${paymentMethod.expMonth}/${paymentMethod.expYear}`}</span>
              </div>
            </div>
          </div>
        </div>

        <PromoCode />

        {isDropIn && (
          <div className="mb-8">
            <Label color="purple" className="mb-2">
              REFERRAL CREDITS
            </Label>
            <div className="flex items-center">
              <button
                className={`border-2 rounded-full min-w-8 h-8 ${
                  useCcCash ? 'animate-spin-slow bg-cc-ball-logo bg-contain' : ''
                } ${ccCash <= 0 ? 'opacity-60 pointer-events-none' : ''}`}
                type="button"
                onClick={() => setUseCcCash(!useCcCash)}
              />
              <span className="ml-2">
                <span className={ccCash <= 0 ? 'opacity-60' : ''}>Use my referral credits</span> (
                <strong>{`$${ccCash}`}</strong> available)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="font-shapiro95_super_wide mb-8 bg-cc-purple p-6 text-white text-2xl md:text-5xl">
        {prorateLoading ? (
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span className="text-2xl">
              <Spinner />
            </span>
          </div>
        ) : prorate && isSubscription ? (
          <Prorate prorate={prorate} productPrice={productPriceAmount} />
        ) : (
          <div className="flex justify-between">
            <span>Total</span>
            <span>{price}</span>
          </div>
        )}
      </div>

      <PrimaryButton
        className="text-right w-full "
        onClick={() => checkoutHandler({ useCcCash })}
        loading={isLoading}
      >
        CHECKOUT
      </PrimaryButton>
    </div>
  );
};

PurchaseDetails.propTypes = {
  paymentMethod: PropTypes.object.isRequired,
  productDetails: PropTypes.object.isRequired,
  checkoutHandler: PropTypes.func,
  userProfile: PropTypes.shape().isRequired,
};

export default PurchaseDetails;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { useSelector, useDispatch } from 'react-redux';

import { purchaseFormattedDate } from 'shared/utils/date';
import CCIcon from 'shared/components/CCIcon';
import { getCheckoutLoading } from '../reducer';
import { clearDiscount } from '../actionCreators';
import PromoCode from './PromoCode';
import Prorate from './Prorate';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Spinner from 'shared/components/Spinner';
import { productPrice } from 'screens/products/utils';
import { RECURRING } from 'screens/products/constants';

const PurchaseDetails = ({
  productDetails,
  paymentMethod,
  createPurchaseHandler,
  userHasActiveSubscription,
  prorate,
  prorateLoading,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCheckoutLoading);
  const checkoutHandler = createPurchaseHandler;
  const purchaseDate = purchaseFormattedDate();
  const productPriceAmount = productPrice(productDetails, userHasActiveSubscription);
  const isSubscription = productDetails?.productType === RECURRING;

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
          <span className="font-shapiro95_super_wide text-cc-purple">YOUR PURCHASE</span>
          <div className="text-xl">{productDetails.name}</div>
          <div className="">{productDetails.description}</div>
        </div>
        <div className="mb-4">
          <span className="font-shapiro95_super_wide text-cc-purple">PAYMENT METHOD</span>
          <div className="flex items-center">
            <CCIcon ccType={paymentMethod.brand} fontSize="2.5rem" />
            <div className="flex flex-col ml-4 font-shapiro95_super_wide">
              <span className=" md:text-xl">{`***${paymentMethod.last4}`}</span>
              <div className="text-base md:text-md">
                Expires {`${paymentMethod.expMonth}/${paymentMethod.expYear}`}
              </div>
            </div>
          </div>
        </div>
        <span className="font-shapiro95_super_wide text-cc-purple">DISCOUNT CODE</span>
        <PromoCode />
      </div>
      <div className="font-shapiro95_super_wide mb-8 bg-cc-purple p-6 text-white text-2xl md:text-5xl">
        {prorateLoading ? (
          <div className="flex flex justify-between items-center">
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

      <PrimaryButton className="text-right w-full " onClick={checkoutHandler} loading={isLoading}>
        CHECKOUT
      </PrimaryButton>
    </div>
  );
};

PurchaseDetails.propTypes = {
  paymentMethod: PropTypes.object.isRequired,
  productDetails: PropTypes.object.isRequired,
  createPurchaseHandler: PropTypes.func,
  userHasActiveSubscription: PropTypes.bool.isRequired,
};

export default PurchaseDetails;

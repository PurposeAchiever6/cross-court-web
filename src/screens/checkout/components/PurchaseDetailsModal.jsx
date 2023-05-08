import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Modal from 'shared/components/Modal';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import { RECURRING } from 'screens/products/constants';
import { getSelectedProduct } from 'screens/products/reducer';
import { getProrate, getProrateLoading, getCheckoutLoading } from 'screens/checkout/reducer';
import Prorate from 'screens/checkout/components/Prorate';
import PromoCode from 'screens/checkout/components/PromoCode';
import {
  createPurchase,
  createSubscription,
  updateSubscription,
  subscriptionProrate,
  clearDiscount,
} from 'screens/checkout/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import { shortMonthDayFullYear } from 'shared/utils/date';
import Spinner from 'shared/components/Spinner';
import ToggleButton from 'shared/components/ToggleButton';
import { formatPrice } from 'screens/products/utils';

const PurchaseDetailsModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector(getSelectedProduct);
  const paymentMethod = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);
  const prorate = useSelector(getProrate);
  const prorateLoading = useSelector(getProrateLoading);

  const productId = productDetails?.id;
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  const userActiveSubscriptionNotPaused = !userProfile.activeSubscription?.paused;
  const isSubscription = productDetails?.productType === RECURRING;
  const isDropIn = productDetails?.productType !== RECURRING;

  const isLoading = useSelector(getCheckoutLoading);
  const [useCcCash, setUseCcCash] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [awareRecurringProduct, setAwareRecurringProduct] = useState(false);

  const purchaseDate = shortMonthDayFullYear();
  const ccCash = Number(userProfile.ccCash);

  useEffect(() => {
    dispatch(clearDiscount());
  }, [dispatch]);

  useEffect(() => {
    if (
      isSubscription &&
      productId &&
      userHasActiveSubscription &&
      userActiveSubscriptionNotPaused
    ) {
      dispatch(subscriptionProrate(productId));
    }
  }, [
    dispatch,
    isSubscription,
    productId,
    userHasActiveSubscription,
    userActiveSubscriptionNotPaused,
  ]);

  const isNewSubscription = isSubscription && !userHasActiveSubscription;

  const checkoutHandler = (params = {}) => {
    if (isSubscription && userHasActiveSubscription) {
      dispatch(updateSubscription());
    } else if (isNewSubscription) {
      dispatch(createSubscription());
    } else {
      dispatch(createPurchase(params));
    }
  };

  if (isOpen && (isNil(productDetails) || isNil(paymentMethod))) {
    closeHandler();
  }

  const checkoutDisabled = isNewSubscription
    ? !(termsAndConditions && awareRecurringProduct)
    : false;

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Purchase Details" size="2xl">
      <span className="hidden md:block absolute top-11 md:top-8 right-12">{purchaseDate}</span>
      <div className="border border-cc-black">
        <div className="py-2 text-center border-b-2 border-cc-black">
          <h3 className="font-shapiro95_super_wide text-lg">{productDetails?.name}</h3>
        </div>
        <div className="p-4 border-b border-cc-black">
          <span className="font-shapiro95_super_wide text-lg mb-1 block">Payment</span>
          <span className="block">
            <span className="uppercase mr-2">{paymentMethod?.brand}</span>
            **** **** **** {paymentMethod?.last4}
          </span>
        </div>
        {isDropIn && (
          <div className="p-4 flex items-center justify-between border-b border-cc-black">
            <div>
              <span className="font-shapiro95_super_wide text-lg mb-1 block">Use CC CA$H</span>
              {`$${ccCash}`} Available
            </div>
            <ToggleButton
              offLabel="Apply to balance"
              className="text-sm"
              variant="black"
              size="4xl"
              value={useCcCash}
              onChange={() => setUseCcCash(!useCcCash)}
            />
          </div>
        )}
        <div className="p-4">
          <span className="font-shapiro95_super_wide text-lg mb-1 block">Total Today</span>
          <span className="block text-lg">
            {prorateLoading && <Spinner />}
            {!prorateLoading && prorate && isSubscription && <Prorate prorate={prorate} />}
            {(!prorate || !isSubscription) && (
              <span>{formatPrice(productDetails?.priceForUser ?? 0)}</span>
            )}
          </span>
        </div>
      </div>
      {/* TODO: Update this component with new PromoCode component */}
      <PromoCode className="my-6" />
      {isNewSubscription && (
        <div className="mb-6">
          <InputCheckboxField
            name="awareRecurringProduct"
            onChange={() => setAwareRecurringProduct(!awareRecurringProduct)}
            value={awareRecurringProduct}
            formik={false}
            className="mb-2"
          >
            I’m aware this is a monthly recurring subscription
          </InputCheckboxField>
          <InputCheckboxField
            name="termsAndConditions"
            onChange={() => setTermsAndConditions(!termsAndConditions)}
            value={termsAndConditions}
            formik={false}
          >
            I agree to the{' '}
            <Link variant="purple-dark" to={ROUTES.TERMS} target="_blank">
              terms and conditions
            </Link>
          </InputCheckboxField>
        </div>
      )}

      <Button
        disabled={checkoutDisabled}
        onClick={() => checkoutHandler({ useCcCash })}
        loading={isLoading}
      >
        CHECK OUT
      </Button>
    </Modal>
  );
};

PurchaseDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default PurchaseDetailsModal;

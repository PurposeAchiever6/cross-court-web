import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { RECURRING } from 'screens/products/constants';
import { titleize } from 'shared/utils/helpers';
import { shortMonthDayFullYear } from 'shared/utils/date';
import { formatPrice } from 'screens/products/utils';
import {
  createPurchase,
  createSubscription,
  updateSubscription,
  subscriptionProrate,
} from 'screens/checkout/actionCreators';
import {
  getSelectedProduct,
  getSelectedPaymentMethod,
  getPromoCodeApplied,
  getProrate,
  getProrateLoading,
  getCheckoutLoading,
} from 'screens/checkout/reducer';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import { getUserProfile } from 'screens/my-account/reducer';
import Spinner from 'shared/components/Spinner';
import ToggleButton from 'shared/components/ToggleButton';
import InfoTooltip from 'shared/components/InfoTooltip';
import RecurringProductInformation from 'screens/checkout/components/RecurringProductInformation';
import PromoCode from 'screens/checkout/components/PromoCode';

const PurchaseDetailsModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUserProfile);
  const product = useSelector(getSelectedProduct);
  const paymentMethod = useSelector(getSelectedPaymentMethod);
  const promoCode = useSelector(getPromoCodeApplied);
  const prorate = useSelector(getProrate);
  const prorateLoading = useSelector(getProrateLoading);

  const isLoading = useSelector(getCheckoutLoading);
  const [useCcCash, setUseCcCash] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [awareRecurringProduct, setAwareRecurringProduct] = useState(false);

  const productId = product?.id;
  const userHasActiveSubscription = !!currentUser.activeSubscription;
  const userActiveSubscriptionNotPaused = !currentUser.activeSubscription?.paused;
  const isSubscription = product?.productType === RECURRING;
  const isDropIn = !isSubscription;
  const purchaseDate = shortMonthDayFullYear();
  const ccCash = Number(currentUser.ccCash);
  const isNewSubscription = isSubscription && !userHasActiveSubscription;
  const checkoutDisabled = isNewSubscription
    ? !(termsAndConditions && awareRecurringProduct)
    : false;

  const checkoutHandler = ({ useCcCash }) => {
    const checkoutPayload = { product, paymentMethod, promoCode };

    if (isSubscription) {
      userHasActiveSubscription
        ? dispatch(updateSubscription(checkoutPayload))
        : dispatch(createSubscription(checkoutPayload));
    } else {
      dispatch(createPurchase({ ...checkoutPayload, useCcCash }));
    }
  };

  useEffect(() => {
    if (
      isOpen &&
      isSubscription &&
      productId &&
      userHasActiveSubscription &&
      userActiveSubscriptionNotPaused
    ) {
      dispatch(subscriptionProrate({ productId, promoCode }));
    }
  }, [
    dispatch,
    isOpen,
    isSubscription,
    productId,
    userHasActiveSubscription,
    userActiveSubscriptionNotPaused,
    promoCode,
  ]);

  if (isOpen && (!product || !paymentMethod)) {
    closeHandler();
    return null;
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Purchase Details" size="2xl">
      <span className="hidden md:block absolute top-11 md:top-8 right-12">{purchaseDate}</span>
      <div className="border border-cc-black">
        <h3 className="border-b-2 border-black font-shapiro95_super_wide text-center text-xl py-2">
          {product?.name}
        </h3>
        <div className="border-b border-black p-4">
          <p className="text-sm">{product?.description}</p>
          {!prorate && (
            <RecurringProductInformation
              product={product}
              promoCode={promoCode}
              className="text-sm mt-5"
            />
          )}
        </div>
        <div className="border-b border-black p-4">
          <h4 className="font-shapiro95_super_wide text-lg mb-1">Payment</h4>
          <div>
            <span className="mr-2">{titleize(paymentMethod?.brand)}</span>
            <span className="mr-2">**** **** ****</span>
            <span>{paymentMethod?.last4}</span>
          </div>
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
          <h4 className="font-shapiro95_super_wide text-lg mb-1">Total Today</h4>
          <div className="text-lg">
            <div className="flex items-center">
              {prorateLoading ? (
                <Spinner />
              ) : (
                <>
                  <span
                    className={
                      product?.promoCodeAppliedPrice == null ? '' : 'line-through text-error-600'
                    }
                  >
                    {formatPrice(product?.priceForUser)}
                  </span>
                  {product?.promoCodeAppliedPrice != null && (
                    <span className="ml-2">{formatPrice(product?.promoCodeAppliedPrice)}</span>
                  )}
                  {prorate && (
                    <InfoTooltip
                      dark
                      className="ml-2"
                      info="Upgrading or downgrading your membership may result in prorated charges. After this first prorated invoice, all charges will show the membership rate. Please note, the billing period will be reset and you will be charged immediately"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PromoCode product={product} className="my-6" />
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
            </Link>{' '}
            and policies found in the{' '}
            <Link variant="purple-dark" to={ROUTES.MEMBER_HANDBOOK} target="_blank">
              Member Handbook
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

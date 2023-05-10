import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { isRecurring } from 'screens/products/utils';
import { shortMonthDayFullYear } from 'shared/utils/date';
import {
  getSelectedProduct,
  getSelectedPaymentMethod,
  getPromoCodeApplied,
} from 'screens/onboarding/reducer';
import { getCheckoutLoading } from 'screens/checkout/reducer';
import { completeOnboardingInit } from 'screens/onboarding/actionCreators';
import { createPurchase, createSubscription } from 'screens/checkout/actionCreators';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import Button from 'shared/components/Button';
import BackButton from 'shared/components/BackButton';
import PurchaseDetails from 'screens/onboarding/components/PurchaseDetails';

const OnboardingReviewPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const checkoutLoading = useSelector(getCheckoutLoading);
  const selectedProduct = useSelector(getSelectedProduct);
  const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);
  const promoCodeApplied = useSelector(getPromoCodeApplied);
  const promoCode = promoCodeApplied?.code;

  const purchaseProduct = () => {
    isRecurring(selectedProduct)
      ? dispatch(
          createSubscription(
            {
              product: selectedProduct,
              paymentMethod: selectedPaymentMethod,
              promoCode,
            },
            { addPaymentMethod: true, callAction: completeOnboardingInit() }
          )
        )
      : dispatch(
          createPurchase(
            {
              product: selectedProduct,
              paymentMethod: selectedPaymentMethod,
              promoCode,
            },
            { addPaymentMethod: true, callAction: completeOnboardingInit() }
          )
        );
  };

  if (!selectedProduct) {
    return <Redirect to={ROUTES.ONBOARDING_MEMBERSHIPS} />;
  }

  if (!selectedPaymentMethod) {
    return <Redirect to={ROUTES.ONBOARDING_PAYMENT_METHOD} />;
  }

  return (
    <OnboardingLayout>
      <OnboardingLayoutContent>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-shapiro95_super_wide text-xl md:text-2xl">Review</h1>
          <span>{shortMonthDayFullYear()}</span>
        </div>
        <PurchaseDetails product={selectedProduct} paymentMethod={selectedPaymentMethod} />
      </OnboardingLayoutContent>
      <OnboardingLayoutSidebar active="review">
        <div className="flex items-stretch">
          <BackButton
            onClick={() => history.push(ROUTES.ONBOARDING_PAYMENT_METHOD)}
            className="shrink-0 mr-3"
          />
          <Button onClick={purchaseProduct} loading={checkoutLoading} className="w-full">
            Confirm
          </Button>
        </div>
      </OnboardingLayoutSidebar>
    </OnboardingLayout>
  );
};

export default OnboardingReviewPage;

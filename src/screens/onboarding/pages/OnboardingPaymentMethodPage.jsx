import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { formatPrice, isRecurring } from 'screens/products/utils';
import { isForever } from 'screens/promo-codes/utils';
import { getSelectedProduct, getPaymentMethodLoading } from 'screens/onboarding/reducer';
import { setPaymentMethodInit } from 'screens/onboarding/actionCreators';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import BackButton from 'shared/components/BackButton';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import ProductSummary from 'screens/onboarding/components/ProductSummary';
import PromoCode from 'screens/onboarding/components/PromoCode';
import PaymentMethodForm from 'shared/components/PaymentMethodForm';

const OnboardingPaymentMethodPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const selectedProduct = useSelector(getSelectedProduct);
  const paymentMethodLoading = useSelector(getPaymentMethodLoading);

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [awareRecurringProduct, setAwareRecurringProduct] = useState(false);
  const [awareRecurringProductPromoCode, setAwareRecurringProductPromoCode] = useState(false);

  const selectedProductPromoCode = selectedProduct?.promoCode;
  const recurringProduct = isRecurring(selectedProduct);
  const showAwareRecurringProductPromoCode =
    selectedProductPromoCode && !isForever(selectedProduct.promoCode);

  const buttonDisabled = (() => {
    if (recurringProduct) {
      if (showAwareRecurringProductPromoCode) {
        return !termsAndConditions || !awareRecurringProduct || !awareRecurringProductPromoCode;
      }

      return !termsAndConditions || !awareRecurringProduct;
    }

    return !termsAndConditions;
  })();

  const setPaymentMethod = () => {
    dispatch(setPaymentMethodInit({ stripe, cardElement: elements.getElement('cardNumber') }));
  };

  if (!selectedProduct) {
    return <Redirect to={ROUTES.ONBOARDING_MEMBERSHIPS} />;
  }

  return (
    <OnboardingLayout>
      <OnboardingLayoutContent>
        <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">Summary</h1>
        <ProductSummary product={selectedProduct} className="mb-4 md:mb-8" />
        <PaymentMethodForm label="Card Number" className="mb-4 md:mb-8" />
        <PromoCode product={selectedProduct} className="mb-8" />
        <div>
          {recurringProduct && (
            <>
              <InputCheckboxField
                name="awareRecurringProduct"
                onChange={() => setAwareRecurringProduct(!awareRecurringProduct)}
                value={awareRecurringProduct}
                formik={false}
                className="mb-2"
              >
                I’m aware this is a monthly recurring subscription
              </InputCheckboxField>
              {showAwareRecurringProductPromoCode && (
                <InputCheckboxField
                  name="awareRecurringProductPromoCode"
                  onChange={() =>
                    setAwareRecurringProductPromoCode(!awareRecurringProductPromoCode)
                  }
                  value={awareRecurringProductPromoCode}
                  formik={false}
                  className="mb-2"
                >
                  I will be billed at the regular {formatPrice(selectedProduct.priceForUser)}/month
                  rate if I do not change my membership tier
                  {selectedProductPromoCode.durationInMonths === 1
                    ? ' prior to the next billing date'
                    : ` in the next ${selectedProductPromoCode.durationInMonths} months`}
                  .
                </InputCheckboxField>
              )}
            </>
          )}
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
            {recurringProduct && (
              <>
                and policies found in the{' '}
                <Link variant="purple-dark" to={ROUTES.MEMBER_HANDBOOK} target="_blank">
                  Member Handbook
                </Link>
              </>
            )}
          </InputCheckboxField>
        </div>
      </OnboardingLayoutContent>
      <OnboardingLayoutSidebar active="membership">
        <div className="flex items-stretch">
          <BackButton
            onClick={() => history.push(ROUTES.ONBOARDING_MEMBERSHIPS)}
            className="shrink-0 mr-3"
          />
          <Button
            onClick={setPaymentMethod}
            loading={paymentMethodLoading}
            disabled={buttonDisabled}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </OnboardingLayoutSidebar>
    </OnboardingLayout>
  );
};

export default OnboardingPaymentMethodPage;

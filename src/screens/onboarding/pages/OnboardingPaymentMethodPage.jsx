import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { RECURRING } from 'screens/products/constants';
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

  const recurringProduct = selectedProduct?.productType === RECURRING;
  const btnDisabled = !termsAndConditions || (recurringProduct && !awareRecurringProduct);

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
            <InputCheckboxField
              name="awareRecurringProduct"
              onChange={() => setAwareRecurringProduct(!awareRecurringProduct)}
              value={awareRecurringProduct}
              formik={false}
              className="mb-2"
            >
              I’m aware this is a monthly recurring subscription
            </InputCheckboxField>
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
            </Link>
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
            disabled={btnDisabled}
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

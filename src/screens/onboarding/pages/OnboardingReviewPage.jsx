import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct, getSelectedPaymentMethod } from 'screens/onboarding/reducer';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import BackButton from 'shared/components/BackButton';
import Button from 'shared/components/Button';

const OnboardingReviewPage = () => {
  const history = useHistory();

  const selectedProduct = useSelector(getSelectedProduct);
  const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);

  if (!selectedProduct) {
    return <Redirect to={ROUTES.ONBOARDING_MEMBERSHIPS} />;
  }

  if (!selectedPaymentMethod) {
    return <Redirect to={ROUTES.ONBOARDING_PAYMENT_METHOD} />;
  }

  return (
    <OnboardingLayout>
      <OnboardingLayoutContent>
        <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">Review</h1>
      </OnboardingLayoutContent>
      {/* TODO: show review details before confirm checkout */}
      <OnboardingLayoutSidebar active="review">
        <div className="flex items-stretch">
          <BackButton
            onClick={() => history.push(ROUTES.ONBOARDING_PAYMENT_METHOD)}
            className="shrink-0 mr-3"
          />
          <Button disabled className="w-full">
            Confirm
          </Button>
        </div>
      </OnboardingLayoutSidebar>
    </OnboardingLayout>
  );
};

export default OnboardingReviewPage;

import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/onboarding/reducer';
import OnboardingLayout, {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import BackButton from 'shared/components/BackButton';
import Button from 'shared/components/Button';

const OnboardingPaymentMethodPage = () => {
  const history = useHistory();
  const selectedProduct = useSelector(getSelectedProduct);

  if (!selectedProduct) {
    return <Redirect to={ROUTES.ONBOARDING_MEMBERSHIPS} />;
  }

  return (
    <OnboardingLayout>
      <OnboardingLayoutContent>
        <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">Summary</h1>
      </OnboardingLayoutContent>
      {/* TODO Allow to enter ayment method information */}
      <OnboardingLayoutSidebar active="membership">
        <div className="flex items-stretch">
          <BackButton
            onClick={() => history.push(ROUTES.ONBOARDING_MEMBERSHIPS)}
            className="shrink-0 mr-3"
          />
          <Button disabled className="w-full">
            Next
          </Button>
        </div>
      </OnboardingLayoutSidebar>
    </OnboardingLayout>
  );
};

export default OnboardingPaymentMethodPage;

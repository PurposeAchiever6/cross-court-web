import React from 'react';

import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import PersonalDetailsForm from 'screens/onboarding/components/PersonalDetailsForm';

const OnboardingPersonalDetailsPage = () => (
  <PageLayout>
    <SectionLayout>
      <PersonalDetailsForm />
    </SectionLayout>
  </PageLayout>
);

export default OnboardingPersonalDetailsPage;

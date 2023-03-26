import React from 'react';

import PageLayout from 'shared/components/layout/PageLayout';

import UnlockYourPotential from './sections/UnlockYourPotential';
import CrosscourtGoal from './sections/CrosscourtGoal';
import PlatformForProgress from './sections/PlatformForProgress';
import Testimonials from './sections/Testimonials';
import TrustTheProgress from './sections/TrustTheProgress';
import Faq from './sections/Faq';

const Landing = () => (
  <PageLayout>
    <UnlockYourPotential />
    <CrosscourtGoal />
    <PlatformForProgress />
    <Testimonials />
    <TrustTheProgress />
    <Faq />
  </PageLayout>
);

export default Landing;

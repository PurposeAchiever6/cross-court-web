import React from 'react';

import AdsLayout from 'shared/components/layout/AdsLayout';
import UnlockYourPotential from 'screens/ads/sections/UnlockYourPotential';
import CrosscourtGoal from 'screens/ads/sections/CrosscourtGoal';
import CurrentOptions from 'screens/ads/sections/CurrentOptions';
import ExperienceTabs from 'screens/ads/sections/ExperienceTabs';

const AdsPage = () => (
  <AdsLayout>
    <UnlockYourPotential />
    <CurrentOptions />
    <CrosscourtGoal />
    <ExperienceTabs />
  </AdsLayout>
);

export default AdsPage;

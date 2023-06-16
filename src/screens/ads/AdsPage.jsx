import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import AdsLayout from 'shared/components/layout/AdsLayout';

import UnlockYourPotential from 'screens/ads/sections/UnlockYourPotential';
import CrosscourtGoal from 'screens/ads/sections/CrosscourtGoal';
import CurrentOptions from 'screens/ads/sections/CurrentOptions';
import ExperienceTabs from 'screens/ads/sections/ExperienceTabs';

const AdsPage = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      <Redirect to={ROUTES.HOME} />;
    }
  }, [isAuthenticated]);

  return (
    <AdsLayout>
      <UnlockYourPotential />
      <CurrentOptions />
      <CrosscourtGoal />
      <ExperienceTabs />
    </AdsLayout>
  );
};

export default AdsPage;

import React from 'react';

import AdsLayout from 'shared/components/layout/AdsLayout';
import CuratedPickupHoops from 'screens/ads/sections/CuratedPickupHoops';
import CurrentOptions from 'screens/ads/sections/CurrentOptions';
import MembershipIncludes from 'screens/ads/sections/MembershipIncludes';
import CrosscourtGoal from 'screens/ads/sections/CrosscourtGoal';
import Testimonials from 'screens/ads/sections/Testimonials';
import Faq from 'screens/ads/sections/Faq';

const AdsPage = () => (
  <AdsLayout>
    <CuratedPickupHoops className="mb-10 md:mb-20" />
    <CurrentOptions className="mb-10 md:mb-20" />
    <MembershipIncludes className="mb-20" />
    <CrosscourtGoal className="mb-20" />
    <Testimonials className="mb-20" />
    <Faq />
  </AdsLayout>
);

export default AdsPage;

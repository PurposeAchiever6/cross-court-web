import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import FirstSessionBookedSuccessfully from 'screens/sessions/components/FirstSessionsReserved/FirstSessionBookedSuccessfully';
import HowDoYouHearAboutUs from 'screens/sessions/components/FirstSessionsReserved/HowDoYouHearAboutUs';
import JoinTheCCTeam from 'screens/sessions/components/FirstSessionsReserved/JoinTheCCTeam';
import Memberships from 'screens/sessions/components/FirstSessionsReserved/Memberships';
import MembershipsFeatures from 'screens/sessions/components/FirstSessionsReserved/MembershipsFeatures';
import GalleryPhotos from 'screens/sessions/components/FirstSessionsReserved/GalleryPhotos';

const SessionReserved = () => {
  const env = runtimeEnv();

  const userProfile = useSelector(getUserProfile);

  if (userProfile.activeSubscription) {
    return <Redirect to={ROUTES.SESSIONRESERVED} />;
  }

  return (
    <div className="bg-cc-black text-white px-4 sm:px-20 pt-28 pb-10">
      <div className="fixed top-16 inset-x-0 text-center z-10">
        <div className="bg-cc-purple text-cc-black px-4 py-1 sm:py-2 uppercase text-sm sm:text-lg">
          Get 75% off your first month if you join today!
        </div>
        <div className="bg-cc-black text-xs sm:text-sm py-1 border-b border-cc-purple border-opacity-20">
          Use promo code{' '}
          <span className="text-cc-purple">{env.REACT_APP_FIRST_TIMER_PROMO_CODE}</span> at checkout
          for 75% off your first month!
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto mb-10">
        <FirstSessionBookedSuccessfully className="mb-10" />
        <HowDoYouHearAboutUs />
      </div>
      <div className="max-w-screen-lg mx-auto mb-14">
        <JoinTheCCTeam />
      </div>
      <div className="max-w-screen-2xl mx-auto mb-10">
        <Memberships className="mb-3" />
        <MembershipsFeatures />
      </div>
      <div className="max-w-screen-lg mx-auto mb-8">
        <GalleryPhotos />
      </div>
      <div className="text-center">
        <PrimaryButton to={ROUTES.MYACCOUNT}>DONE</PrimaryButton>
      </div>
    </div>
  );
};

export default SessionReserved;

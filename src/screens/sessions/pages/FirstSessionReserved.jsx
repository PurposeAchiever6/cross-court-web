import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import blackTextureBgImg from 'shared/images/black-texture-bg.png';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Animation from 'shared/components/Animation';
import confettiAnimation from 'shared/animations/confetti.json';

import FirstSessionBookedSuccessfully from 'screens/sessions/components/FirstSessionsReserved/FirstSessionBookedSuccessfully';
import JoinTheCCTeam from 'screens/sessions/components/FirstSessionsReserved/JoinTheCCTeam';
import Memberships from 'screens/sessions/components/FirstSessionsReserved/Memberships';
import MembershipsFeatures from 'screens/sessions/components/FirstSessionsReserved/MembershipsFeatures';
import GalleryPhotos from 'screens/sessions/components/FirstSessionsReserved/GalleryPhotos';

const SessionReserved = () => {
  const env = runtimeEnv();

  const percentageDiscount = env.REACT_APP_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

  const userProfile = useSelector(getUserProfile);

  if (userProfile.activeSubscription) {
    return <Redirect to={ROUTES.SESSIONRESERVED} />;
  }

  return (
    <LazyBackgroundImage
      img={blackTextureBgImg}
      className="bg-no-repeat bg-cover bg-center text-white px-4 sm:px-20 pt-28 pb-10"
    >
      <div className="fixed top-16 inset-x-0 text-center z-20">
        <div className="bg-cc-purple text-cc-black px-4 py-1 sm:py-2 uppercase text-xs md:text-base">
          Get {percentageDiscount}% off your first month if you join before first session!
        </div>
      </div>
      <Animation
        animation={confettiAnimation}
        height="150vh"
        className="absolute inset-x-0 top-28"
      />
      <div className="relative z-10">
        <div className="max-w-screen-lg mx-auto mb-10">
          <FirstSessionBookedSuccessfully />
        </div>
        <div className="max-w-screen-lg mx-auto mb-14">
          <JoinTheCCTeam />
        </div>
        <div className="max-w-screen-2xl mx-auto mb-10">
          <Memberships className="mb-6 md:mb-8" />
          <MembershipsFeatures />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mb-8">
        <GalleryPhotos />
      </div>
      <div className="text-center">
        <PrimaryButton to={ROUTES.MYACCOUNT}>DONE</PrimaryButton>
      </div>
    </LazyBackgroundImage>
  );
};

export default SessionReserved;

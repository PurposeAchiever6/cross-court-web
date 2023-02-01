import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import confettiAnimation from 'shared/animations/confetti.json';
import Animation from 'shared/components/Animation';
import { getUserProfile } from 'screens/my-account/reducer';
import { getPurchaseConfirmed } from '../reducer';
import basketImg from '../images/basket.jpg';
import basketballImg from '../images/basketball.jpg';
import courtImg from '../images/court.jpg';
import playImg from '../images/play.jpg';
import runImg from '../images/run.jpg';
import kGoldn from '../images/24kGoldn.jpg';

const MembershipConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const currentUser = useSelector(getUserProfile);
  const env = runtimeEnv();

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <>
      <Animation
        animation={confettiAnimation}
        className="absolute inset-0 bottom-1/2 md:bottom-0"
      />
      <div className="md:text-lg flex flex-col px-4 pt-10 sm:pt-24 pb-10 md:pb-20 max-w-screen-md mx-auto relative">
        <div className="text-center">
          <h1 className="uppercase font-shapiro95_super_wide md:text-2xl">
            HEY {currentUser.firstName}. WELCOME TO THE CCTEAM!
          </h1>
          <p className="mt-2">
            We understand you might be asking yourself <b>"now what?"</b> or{' '}
            <b>"what did I just get myself into?"</b>. Don't worry, if you're{' '}
            <b>
              ready to level up your life and willing to put the work in, you came to the right
              place.
            </b>{' '}
            We know joining the <b>ccteam</b> can be overwhelming or confusing if you're not
            properly onboarded.
          </p>
          <p className="font-shapiro96_inclined_wide mt-10">
            ONE OF OUR MEMBERSHIP EXPERIENCE MANAGERS WILL HELP GET YOU UP TO SPEED AND BE YOUR
            POINT OF CONTACT MOVING FORWARD.
          </p>
          <p className="mt-2">
            SCHEDULE YOUR 5 MINUTE KICK OFF CALL TO MEET YOUR EXPERIENCE MANAGER, GET THE LOW DOWN,
            AND HAVE ANY QUESTIONS ANSWERED.
          </p>
        </div>
      </div>
      <div className="text-center mb-20">
        <PrimaryButton
          to={{ pathname: env.REACT_APP_CALENDLY_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 sm:mr-3"
        >
          BOOK CALL
        </PrimaryButton>
        <PrimaryButton inverted to={ROUTES.LOCATIONS}>
          See Schedule
        </PrimaryButton>
      </div>
      <div className="bg-cc-black p-5 md:p-10 flex flex-col items-center justify-center">
        <div className="flex h-3/3 mt-10 container">
          <img
            className="w-1/4 h-3/3 mr-2 object-cover object-center"
            src={kGoldn}
            alt="24kGoldn"
          />
          <div className="w-1/4 mx-2">
            <img className="w-full pb-4 h-1/3 object-cover" src={runImg} alt="run" />
            <img className="w-full h-2/3 object-cover" src={playImg} alt="play" />
          </div>
          <div className="w-1/4 mx-2">
            <img
              className="w-full pb-4 h-2/3 object-cover object-left-top"
              src={basketImg}
              alt="ball"
            />
            <img
              className="w-full h-1/3 object-cover object-top"
              src={basketballImg}
              alt="basketball"
            />
          </div>
          <img className="w-1/4 h-3/3 ml-2 object-cover object-left" src={courtImg} alt="court" />
        </div>
      </div>
    </>
  );
};

export default MembershipConfirm;

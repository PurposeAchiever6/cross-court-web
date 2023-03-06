import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import confettiAnimation from 'shared/animations/confetti.json';
import Animation from 'shared/components/Animation';
import { getUserProfile } from 'screens/my-account/reducer';
import Steps from 'shared/components/Steps';
import { getPurchaseConfirmed } from '../reducer';
import basketImg from '../images/basket.jpg';
import basketballImg from '../images/basketball.jpg';
import courtImg from '../images/court.jpg';
import playImg from '../images/play.jpg';
import runImg from '../images/run.jpg';
import kGoldn from '../images/24kGoldn.jpg';

const STEPS = [
  {
    title: 'A QUICK WELCOME MESSAGE',
  },
  {
    title: 'YOUR NEW MEMBER HANDBOOK WHICH INCLUDES ALL YOU NEED TO KNOW AS A CC MEMBER',
  },
  {
    title:
      'A LINK TO JOIN OUR COMMUNITY DISCORD WHERE YOU CAN ENGAGE WITH OTHER MEMBERS AND STAY UP TO DATE ON ALL THINGS CC',
  },
  {
    title:
      'A LINK TO SCHEDULE AN OPTIONAL KICK OFF CALL WITH ONE OF OUR MEMBERSHIP EXPERIENCE MANAGERS SHOULD YOU HAVE ANY QUESTIONS',
  },
];

const MembershipConfirm = () => {
  const purchaseConfirmed = useSelector(getPurchaseConfirmed);
  const currentUser = useSelector(getUserProfile);

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
          <h1 className="uppercase font-shapiro95_super_wide md:text-2xl mb-2">
            HEY {currentUser.firstName}. WELCOME TO THE CCTEAM!
          </h1>
          <p className="font-shapiro96_inclined_wide uppercase">Next steps!</p>
          <p className="font-shapiro96_inclined_wide uppercase">Check your email for</p>
          <Steps steps={STEPS} className="text-left" />
        </div>
      </div>
      <div className="text-center mb-20">
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

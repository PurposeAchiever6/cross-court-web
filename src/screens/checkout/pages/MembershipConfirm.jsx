import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faUser,
  faPlusCircle,
  faPlusSquare,
  faTicketAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import confettiAnimation from 'shared/animations/confetti.json';
import ReferAFriend from 'shared/components/ReferAFriend';
import Animation from 'shared/components/Animation';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSelectedProduct } from 'screens/products/reducer';
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
  const productDetails = useSelector(getSelectedProduct);

  const ITEMS = [
    {
      icon: faVideo,
      title: 'CLIPPING YOUR HIGHLIGHTS',
      description: `Watch your full length session or clip, download and upload personal highlights to
        social media using the Pixelott App. Go to our "content" page found in our website's
        footer for a step by step guide for viewing and personalizing Crosscourt content.`,
    },
    {
      icon: faUser,
      title: 'PERSONALZING YOUR PROFILE',
      description: `Upload a profile image in "My Account" to finish setting up your profile.
      This will be displayed on our courtside dashboard before each session.`,
    },
    {
      icon: faPlusSquare,
      title: 'DOWNLOADING OUR WEB APP',
      description: `Adding Crosscourt to your mobile device's homescreen makes it easy to find
      upcoming sessions and stay up to date with everything Crosscourt. On your mobile device
      open our site in Safari, tap the icon located in the middle of your device at the bottom
      and hit "Add to Homescreen".`,
    },
    {
      icon: faTicketAlt,
      title: 'COMING OUT TO ALL CC EXPERIENCES',
      description: `All members have access to our Open Club period.
      These are designated "open gym" hours for members to work on their game,
      hang out with other members, organize own runs, or get an extended warm up for their sessions.`,
    },
    {
      icon: faPlusCircle,
      title: 'ADDING MORE SESSIONS',
      description: `If you use all the credits in your account, you can either purchase additional
      drop in sessions at a discount or you can upgrade your membership.`,
    },
    {
      icon: faUsers,
      component: (
        <ReferAFriend
          className="flex flex-col w-full md:w-max items-center md:items-start"
          code={currentUser.referralCode}
        />
      ),
    },
  ];

  if (!purchaseConfirmed) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <>
      <div className="container sm:min-h-screen flex flex-col px-4 pt-14 pb-10 md:pb-20 mx-auto relative">
        <Animation
          animation={confettiAnimation}
          className="absolute inset-0 bottom-1/2 md:bottom-0"
        />
        <div className="relative z-10">
          <h1 className="text-center shapiro95_super_wide text-2xl">MEMBERSHIP CONFIRMED!</h1>
          <h2 className="text-center shapiro95_super_wide text-2xl mb-2">
            WELCOME TO THE CC TEAM{' '}
            <span className="text-cc-purple uppercase">{currentUser.firstName}</span>
          </h2>
          {productDetails?.credits > 0 && (
            <h3 className="text-center text-lg">
              {`You have ${productDetails?.credits} sessions to use within the next 30 days before they refill. Let's put em to good
        use!`}
            </h3>
          )}

          <p className="font-shapiro96_inclined_wide text-4xl md:text-6xl text-transparent text-stroke-cc-purple text-stroke-width-2 my-6 text-center">
            NEXT STEPS!
          </p>
          {ITEMS.map((item, i) => (
            <div className="flex mb-6 flex-col md:flex-row text-center md:text-left" key={i}>
              <div className="flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                {item.icon && <FontAwesomeIcon icon={item.icon} size="3x" />}
              </div>
              <div className="flex flex-col w-full md:w-5/6">
                {item.title && <p className="shapiro95_super_wide text-2xl">{item.title}</p>}
                {item.description && <p>{item.description}</p>}
                {item.component}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-cc-black p-5 md:p-10 flex flex-col items-center justify-center">
        <div className="text-center mt-6 md:mt-3">
          <Link
            className="font-dharma_gothic_cheavy_italic text-7xl sm:text-8xl text-cc-black bg-cc-purple px-4 pt-1 uppercase"
            to={ROUTES.LOCATIONS}
          >
            See Schedule
          </Link>
        </div>
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

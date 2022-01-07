import React from 'react';
import { useSelector } from 'react-redux';

import { getUserProfile } from 'screens/my-account/reducer';
import { openContactFormForUser } from 'shared/utils/contactForm';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import CCTeamPerksBgImg from 'screens/careers/images/cc-team-perks.jpeg';
import competitiveWageIcon from 'screens/careers/images/wage.png';
import freeSessionsIcon from 'screens/careers/images/free-sessions.png';
import rewardsIcon from 'screens/careers/images/rewards.png';
import ccFitIcon from 'screens/careers/images/cc-fit.png';
import gloryIcon from 'screens/careers/images/glory.png';

const PERKS = [
  { src: competitiveWageIcon, text: 'Competitive Wage', className: 'h-20 md:h-28' },
  { src: freeSessionsIcon, text: 'Free Membership', className: 'h-24 md:h-32' },
  { src: rewardsIcon, text: 'Rewards', className: 'h-24 md:h-32' },
  { src: ccFitIcon, text: 'CC Swag', className: 'h-24 md:h-32' },
  { src: gloryIcon, text: 'Glory', className: 'h-28 md:h-36' },
];

const CCTeamPerks = () => {
  const currentUser = useSelector(getUserProfile) || {};

  return (
    <section
      className="text-white bg-no-repeat bg-cover bg-center pt-16 pb-36"
      style={{ backgroundImage: `url('${CCTeamPerksBgImg}')` }}
    >
      <div className="bg-cc-black bg-opacity-50 px-4 md:px-12 pt-8 md:pb-4 mb-12">
        <h2 className="font-shapiro95_super_wide mb-10">
          <span className="text-transparent text-stroke-white text-3xl md:text-4xl block">
            EXPERIENCE TEAM
          </span>
          <span className="text-2xl md:text-3xl block">PERKS</span>
        </h2>
        <div className="flex flex-wrap justify-between md:px-6 lg:px-8 xl:px-10">
          {PERKS.map(({ src, text, className }, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center w-1/2 md:w-auto h-40 md:h-44 mb-14 md:mb-6 last:w-full md:last:w-auto px-4 md:px-6"
            >
              <img src={src} alt={`perk-{text}`} className={className} />
              <div className="font-shapiro95_super_wide text-center text-sm sm:text-base uppercase">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center px-4 md:px-12">
        <h2 className="font-dharma_gothic_cexbold text-transparent text-stroke-white text-9xl md:text-12xl mb-10">
          ANY QUESTIONS?
        </h2>
        <div>
          <PrimaryButton onClick={() => openContactFormForUser(currentUser)}>
            EMAIL US
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default CCTeamPerks;

import React from 'react';
import PropTypes from 'prop-types';

import LandingBgImg from 'screens/products/images/pick-up-basketball-facility-2.jpeg';
import PerkMonthToMonth from 'screens/products/images/perk-month-to-month.png';
import PerkLockedInRate from 'screens/products/images/perk-locked-in-rate.png';
import PerkGetHighlights from 'screens/products/images/perk-get-highlights.png';
import PerkReducedSessions from 'screens/products/images/perk-reduced-sessions.png';
import ArrowDownSvg from 'shared/components/svg/ArrowDownSvg';

const PERKS = [
  {
    title: 'Month 2 Month',
    description:
      'Memberships as flexible as they come. Upgrade, downgrade, cancel and reactivate as you please.',
    iconImg: PerkMonthToMonth,
    iconClassName: 'w-10 lg:w-14 mr-6',
  },
  {
    title: 'Locked in Rate',
    description:
      'The rate you pay is the rate you receive regardless of any changes to memberships ' +
      'rates over time.',
    iconImg: PerkLockedInRate,
    iconClassName: 'w-10 lg:w-14 mr-6',
  },
  {
    title: 'Get Highlights',
    description:
      'Only members receive access to sessions VOD content, where you can view, clip, edit ' +
      'and download personal highlights.',
    iconImg: PerkGetHighlights,
    iconClassName: 'w-12 lg:w-16 mr-4',
  },
  {
    title: 'Reduced Sessions',
    description:
      '4 or 8 session/month members can purchase additional drop in sessions at a reduced rate ' +
      'once all the credits in your account for that month have been used.',
    iconImg: PerkReducedSessions,
    iconClassName: 'w-12 lg:w-16 mr-4',
  },
];

const Landing = ({ scrollToPlans }) => {
  return (
    <section
      className="flex items-center min-h-screen bg-no-repeat bg-cover bg-top pt-24 pb-36 relative"
      style={{ backgroundImage: `url('${LandingBgImg}')` }}
    >
      <div className="text-white bg-cc-black bg-opacity-60 w-full px-4 md:px-14 xl:px-24 py-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center max-w-screen-xl mx-auto">
          <p className="font-shapiro95_super_wide w-full lg:max-w-xs xl:max-w-md lg:pr-20 text-sm text-center lg:text-left px-8 sm:px-16 lg:px-0">
            We believe a membership driven community brings out the best in the ccteam and gives us
            a better opportunity to make sport a larger part of our lifestyle. Two sessions per week
            is the sweet spot, but more won't hurt!
          </p>
          <div className="w-full mb-12 lg:mb-0">
            <h2 className="font-shapiro95_super_wide text-3xl italic mb-8">MEMBERSHIP PERKS</h2>
            <div className="flex flex-wrap -m-4">
              {PERKS.map(({ title, description, iconImg, iconClassName }, index) => (
                <div key={index} className="flex w-full sm:w-1/2 items-start p-4">
                  <img src={iconImg} alt={`perk-title`} className={iconClassName} />
                  <div>
                    <div className="font-shapiro95_super_wide text-lg sm:text-xl text-transparent text-stroke-white text-stroke-width-1 uppercase mb-2">
                      {title}
                    </div>
                    <p className="text-xs">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-cc-purple absolute bottom-8 right-1/2 transform translate-x-1/2"
        onClick={scrollToPlans}
      >
        <div className="font-dharma_gothic_cexbold italic text-5xl md:text-7xl py-2 px-4 flex">
          SEE PRICING
          <ArrowDownSvg className="w-5 md:w-7 ml-4" />
        </div>
      </button>
    </section>
  );
};

Landing.propTypes = {
  scrollToPlans: PropTypes.func.isRequired,
};

export default Landing;

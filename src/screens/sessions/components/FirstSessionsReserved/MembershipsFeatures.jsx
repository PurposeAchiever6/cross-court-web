import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';

const FEATURES = [
  {
    name: 'Discounted cost/session',
    description:
      'Sessions range from $10 to $18 with a membership, but are $28 each without a membership. Not only that, members can purchase additional drop in sessions for $18 once all the credits in your account for that month have been used.',
  },
  {
    name: 'Personalized Highlights',
    description:
      "Every session's filmed. Only members can access session highlights to then clip and share on social, or see where to improve",
  },
  {
    name: 'Tiered Sessions Based on Skill Level',
    description:
      "Are you a former varsity standout and wanna relive your glory days? Join the CCTeam and participate in advanced sessions. What about if you've never played basketball and are just here for the cardio? We've got you covered with our beginner sessions.",
  },
  {
    name: 'Private Skills Training',
    description:
      'Our member-only skills training sessions are designed to get your game to the next level. Go from beginner to intermediate, then intermediate to advanced by working on your game with a Crosscourt coach.',
  },
  { name: 'Members Only Events', description: 'Get access to exclusive CCTeam events' },
  {
    name: 'Open Club Access',
    description:
      'Open club is exactly what it sounds like - Access to the Crosscourt club to put shots up, work on your handle, or self-organize games with friends you can bring. The Crosscourt club is your oyster.',
  },
  {
    name: 'Member Tournaments (coming soon)',
    description: "It's a weekend block party. Bring your best 5 and compete for prizes.",
  },
  {
    name: 'Leagues (coming soon)',
    description:
      'Build your team and compete against other CCTeam squads with prizes for the winning team each season.',
  },
];

const MembershipsFeatures = ({ className }) => {
  return (
    <div className={className}>
      <h4 className="text-2xl md:text-4xl font-shapiro95_super_wide uppercase mb-4 sm:mb-8 md:mb-10">
        Memberships Features
      </h4>
      <div className="flex flex-wrap sm:-m-5 pb-8 sm:pb-12">
        {FEATURES.map(({ name, description }) => (
          <div key={name} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 sm:mb-0 sm:p-5">
            <div className="group border border-cc-purple bg-cc-black hover:bg-cc-purple transition-all duration-500 flex justify-center items-center text-center h-56 p-10 relative cursor-pointer">
              <span className="group-hover:transition-all duration-150 delay-300 group-hover:delay-0 group-hover:opacity-0">
                {name}
              </span>
              <p className="absolute inset-0 flex justify-center items-center p-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          className="font-dharma_gothic_cheavy_italic text-7xl sm:text-8xl text-cc-black bg-cc-purple px-4 pt-1 uppercase"
          to={ROUTES.MEMBERSHIPS}
        >
          See Memberships
        </Link>
      </div>
    </div>
  );
};

MembershipsFeatures.defaultProps = {
  className: '',
};

MembershipsFeatures.propTypes = {
  className: PropTypes.string,
};

export default MembershipsFeatures;

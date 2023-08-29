import React from 'react';
import PropTypes from 'prop-types';

import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';
import SignupForm from 'screens/auth/components/SignupForm';
import curatedPickupHoopsImg from 'screens/ads/images/curated-pickup-hoops.jpeg';
import CheckmarkSvg from 'shared/components/svg/CheckmarkSvg';

const FEATURES = [
  { label: 'Indoor Gym', backgroundColorClass: 'bg-cc-blue-100' },
  { label: '1 Hour', backgroundColorClass: 'bg-cc-blue-100' },
  { label: '15 players', backgroundColorClass: 'bg-cc-blue-300' },
  { label: '2 Referees', backgroundColorClass: 'bg-cc-blue-500' },
  { label: 'Skill Levels', backgroundColorClass: 'bg-cc-blue-700' },
  { label: 'Teams Built For You', backgroundColorClass: 'bg-cc-blue-900' },
];

const CuratedPickupHoops = ({ className }) => (
  <SectionLayout className={className}>
    <div className="lg:flex lg:mb-20">
      <div className="w-full lg:w-1/2 lg:pt-16 mb-10 lg:mb-0 lg:pr-4">
        <h1 className="font-shapiro95_super_wide text-4xl lg:text-5xl xl:text-6xl max-w-xl xl:max-w-none mb-6">
          Curated pick-up hoops.
        </h1>
        <p className="text-sm xl:text-base max-w-xl mb-6">
          Crosscourt is a basketball-inspired social club for the corporate athlete built around a
          one hour, refereed pick up experience.
        </p>
        <SignupForm dark submitText="Get Started" />
      </div>
      <ExpandedLayout lgBreakpoint={false} xlBreakpoint={false} className="lg:w-1/2 lg:pl-4">
        <img
          alt="curated-pickup-hoops-img"
          src={curatedPickupHoopsImg}
          className="w-full h-full object-cover"
        />
      </ExpandedLayout>
    </div>
    <ExpandedLayout
      lgBreakpoint={false}
      xlBreakpoint={false}
      className="grid grid-cols-1 lg:grid-cols-6 gap-px lg:gap-4"
    >
      {FEATURES.map(({ label, backgroundColorClass }) => (
        <div
          key={label}
          className={`flex lg:flex-col lg:justify-center items-center px-4 lg:px-6 py-4 lg:py-10 ${backgroundColorClass}`}
        >
          <CheckmarkSvg className="w-8 lg:w-10 text-cc-black rounded-full border-3 border-cc-purple-900 mr-2 lg:mr-0 lg:mb-3" />
          <span className="text-center text-sm">{label}</span>
        </div>
      ))}
    </ExpandedLayout>
  </SectionLayout>
);

CuratedPickupHoops.defaultProps = {
  className: '',
};

CuratedPickupHoops.propTypes = {
  className: PropTypes.string,
};

export default CuratedPickupHoops;

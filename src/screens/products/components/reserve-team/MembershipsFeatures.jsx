import React from 'react';

import ROUTES from 'shared/constants/routes';
import { RESERVE_TEAM_NOT_INCLUDED_MEMBERSHIPS_FEATURES } from 'shared/constants/memberships';
import HoverableBox from 'shared/components/HoverableBox';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import blackTextureBgImg from 'shared/images/black-texture-bg.png';

const MembershipsFeatures = () => (
  <LazyBackgroundImage
    as="section"
    img={blackTextureBgImg}
    className="bg-no-repeat bg-cover bg-center"
  >
    <div className="px-4 lg:px-20 py-16 lg:py-20">
      <h2 className="font-shapiro95_super_wide uppercase mb-8 flex flex-col md:flex-row">
        <span className="text-cc-purple text-4xl md:text-5xl lg:text-7xl block">Not</span>
        <span className="text-transparent text-stroke-cc-purple text-stroke-width-1 text-4xl md:text-5xl lg:text-7xl block md:ml-4">
          Included
        </span>
      </h2>
      <div className="flex flex-wrap sm:-m-5 pb-12">
        {RESERVE_TEAM_NOT_INCLUDED_MEMBERSHIPS_FEATURES.map(({ name, description }) => (
          <div key={name} className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 sm:p-5">
            <HoverableBox title={name} description={description} className="h-64" />
          </div>
        ))}
      </div>
      <div className="text-center mb-10">
        <PrimaryButton to={ROUTES.LOCATIONS}>Book Session</PrimaryButton>
      </div>
      <span className="font-shapiro95_super_wide uppercase text-cc-purple text-2xl md:text-5xl mt-6 md:block flex justify-center">
        How it works
      </span>
      <ol className="text-white list-decimal list-inside p-0 text-sm md:text-lg mt-6 p-4 md:p-0 text-justify">
        <li>We add you to the system as a reserve team member.</li>
        <li>You purchase a reserve team membership by going to the memberships page.</li>
        <li>
          If a session has less than 5 sign ups 10 hours before or less than 10 sign ups 5 hours
          before, you will receive a link to book that session.
        </li>
        <li>You will not be able to book sessions unless it meets this criteria.</li>
        <li>You will have access to open club as well.</li>
        <li>
          If you'd like to upgrade to a traditional membership, reach out to us and we'll update
          your account on our end.
        </li>
        <li>We do not guarantee there will be sessions available for booking.</li>
      </ol>
    </div>
  </LazyBackgroundImage>
);

export default MembershipsFeatures;

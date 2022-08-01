import React from 'react';
import PropTypes from 'prop-types';
import ROUTES from 'shared/constants/routes';
import { MEMBERSHIPS_FEATURES } from 'shared/constants/memberships';
import HoverableBox from 'shared/components/HoverableBox';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import blackTextureBgImg from 'shared/images/black-texture-bg.png';

const MembershipsFeatures = ({ setWatchSkillsVideo }) => (
  <LazyBackgroundImage
    as="section"
    img={blackTextureBgImg}
    className="bg-no-repeat bg-cover bg-center"
  >
    <div className="px-4 lg:px-20 py-16 lg:py-20">
      <h2 className="font-shapiro95_super_wide uppercase mb-8">
        <span className="text-transparent text-stroke-cc-purple text-stroke-width-1 text-4xl md:text-5xl lg:text-7xl block">
          Membership
        </span>
        <span className="text-cc-purple text-2xl md:text-3xl lg:text-5xl block">
          Extras And Experiences
        </span>
      </h2>
      <p className="text-lg text-white max-w-screen-xl lg:pr-20 mb-10">
        Becoming a Crosscourt member gives you access to the CCteam - a community of modern athletes
        bonded by the power of team-sport and exclusive CCteam experiences.
      </p>
      <div className="flex flex-wrap sm:-m-5 pb-12">
        {MEMBERSHIPS_FEATURES.map(({ name, description, linkDescription }) => (
          <div key={name} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 sm:mb-0 sm:p-5">
            <HoverableBox
              title={name}
              description={description}
              linkDescription={linkDescription}
              className="h-64"
              linkOnClick={setWatchSkillsVideo ? () => setWatchSkillsVideo(true) : null}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        <PrimaryButton to={ROUTES.LOCATIONS}>Book Session</PrimaryButton>
      </div>
    </div>
  </LazyBackgroundImage>
);

MembershipsFeatures.defaultProps = {
  setWatchSkillsVideo: null,
};

MembershipsFeatures.propTypes = {
  setWatchSkillsVideo: PropTypes.func,
};

export default MembershipsFeatures;

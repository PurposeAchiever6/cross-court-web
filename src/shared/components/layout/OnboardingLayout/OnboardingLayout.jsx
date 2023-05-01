import React from 'react';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Link from 'shared/components/Link';
import LogoSvg from 'shared/components/svg/LogoSvg';
import gradientEffectBgImg from 'shared/images/backgrounds/gradient-effect-top-right.png';

const OnboardingLayout = ({ children }) => (
  <PageLayout noPadding>
    <SectionLayout className="pt-12 pb-32 md:pt-24 md:pb-24">
      <img
        src={gradientEffectBgImg}
        alt="cc-basketball-balls"
        className="absolute top-0 inset-x-0 w-full"
      />
      <div className="max-w-screen-lg mx-auto relative">
        <Link
          variant="none"
          to={ROUTES.HOME}
          className="block text-center md:text-left mb-5 md:mb-8"
        >
          <LogoSvg className="inline-block w-56" />
        </Link>
        {children}
        <div className="text-xs mt-6">{`${new Date().getFullYear()}`} &reg; Crosscourt</div>
      </div>
    </SectionLayout>
  </PageLayout>
);

OnboardingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnboardingLayout;

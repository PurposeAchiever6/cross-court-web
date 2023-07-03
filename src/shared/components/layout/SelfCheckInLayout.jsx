import React from 'react';
import PropTypes from 'prop-types';

import PageLayout from 'shared/components/layout/PageLayout';
import LogoSvg from 'shared/components/svg/LogoSvg';
import gradientEffectBgImg from 'shared/images/backgrounds/gradient-effect-top-right.png';

const SelfCheckInLayout = ({ children }) => (
  <PageLayout noPadding className="min-h-screen">
    <LogoSvg className="absolute inset-x-0 mx-auto max-w-[20rem] w-[40%] mt-12" />
    <img
      src={gradientEffectBgImg}
      alt="gradient-effect-bg-img"
      className="absolute -top-6 inset-x-0 w-full h-[20%] opacity-70"
    />
    {children}
  </PageLayout>
);

SelfCheckInLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelfCheckInLayout;

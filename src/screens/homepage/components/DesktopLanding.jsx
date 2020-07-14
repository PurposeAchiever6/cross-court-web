import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';
import MakeSportYourLifestyle from './desktop/MakeSportYourLifestyle';
import CrosscourtIsAHighIntensity from './desktop/CrosscourtIsAHighIntensity';
import WhyWeExist from './desktop/WhyWeExist';
import WhoWeAre from './desktop/WhoWeAre';
import WhatWeDo from './desktop/WhatWeDo';
import KeysToCrosscourt from './desktop/KeysToCrosscourt';
import FollowUsOnInstagram from './desktop/FollowUsOnInstagram';
import Ready from './desktop/Ready';

const Section = styled.section`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  min-height: 125rem;

  @media ${device.mobile} {
    display: none;
  }
`;

const DesktopLanding = () => (
  <Section>
    <MakeSportYourLifestyle />
    <CrosscourtIsAHighIntensity />
    <WhyWeExist />
    <WhoWeAre />
    <WhatWeDo />
    <KeysToCrosscourt />
    <FollowUsOnInstagram />
    <Ready />
  </Section>
);

export default DesktopLanding;

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

const Section = styled.section``;

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

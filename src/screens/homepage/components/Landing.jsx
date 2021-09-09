import React from 'react';
import CrosscourtIsAHighIntensity from './sections/CrosscourtIsAHighIntensity';
import FollowUsOnInstagram from './sections/FollowUsOnInstagram';
import HomeVideo from './sections/HomeVideo';
import KeysToCrosscourt from './sections/KeysToCrosscourt';
import MakeSportYourLifestyle from './sections/MakeSportYourLifestyle';
import Ready from './sections/Ready';
import WhatWeDo from './sections/WhatWeDo';
import WhoWeAre from './sections/WhoWeAre';
import WhyWeExist from './sections/WhyWeExist';

const Landing = () => (
  <>
    <MakeSportYourLifestyle />
    <HomeVideo />
    <CrosscourtIsAHighIntensity />
    <WhyWeExist />
    <WhoWeAre />
    <WhatWeDo />
    <KeysToCrosscourt />
    <FollowUsOnInstagram />
    <Ready />
  </>
);

export default Landing;

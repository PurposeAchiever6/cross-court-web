import React from 'react';

import CrosscourtKeys from 'shared/components/CrosscourtKeys';
import MakeSportYourLifestyle from './sections/MakeSportYourLifestyle';
import HomeVideo from './sections/HomeVideo';
import BasketballBasedFitness from './sections/BasketballBasedFitness';
import WhatWeDo from './sections/WhatWeDo';
import WhoWeAre from './sections/WhoWeAre';
import WhyWeExist from './sections/WhyWeExist';
import Testimonials from './sections/Testimonials';
import FollowUsOnInstagram from './sections/FollowUsOnInstagram';
import Ready from './sections/Ready';

const Landing = () => (
  <>
    <MakeSportYourLifestyle />
    <HomeVideo />
    <BasketballBasedFitness />
    <WhatWeDo />
    <WhoWeAre />
    <WhyWeExist />
    <CrosscourtKeys />
    <Testimonials />
    <FollowUsOnInstagram />
    <Ready />
  </>
);

export default Landing;

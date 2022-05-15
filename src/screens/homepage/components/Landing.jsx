import React from 'react';

import CrosscourtKeys from 'shared/components/CrosscourtKeys';
import UnleashYourInnerAthlete from './sections/UnleashYourInnerAthlete';
import EveryoneIsAnThlete from './sections/EveryoneIsAnThlete';
import WhatWeDo from './sections/WhatWeDo';
import MembershipsFeatures from './sections/MembershipsFeatures';
import Testimonials from './sections/Testimonials';
import FollowUsOnInstagram from './sections/FollowUsOnInstagram';
import Ready from './sections/Ready';

const Landing = () => (
  <>
    <UnleashYourInnerAthlete />
    <EveryoneIsAnThlete />
    <WhatWeDo />
    <CrosscourtKeys />
    <MembershipsFeatures />
    <Testimonials />
    <FollowUsOnInstagram />
    <Ready />
  </>
);

export default Landing;

import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import TheExperience from './mobile/TheExperience';
import NothingButVibe from './mobile/NothingButVibe';
import NoBullshit from './mobile/NoBullshit';
import EveryonesAnAthlete from './mobile/EveryonesAnAthlete';

const Section = styled.section`
  display: none;
  margin-top: 3rem;

  @media ${device.mobile} {
    display: block;
  }
`;

const MobileLanding = () => (
  <Section>
    <TheExperience />
    <NothingButVibe />
    <NoBullshit />
    <EveryonesAnAthlete />
  </Section>
);

export default MobileLanding;

import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';
import TheExperience from './desktop/TheExperience';
import NothingButVibe from './desktop/NothingButVibe';
import NoBullshit from './desktop/NoBullshit';
import EveryonesAnAthlete from './desktop/EveryonesAnAthlete';

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  min-height: 125rem;

  @media ${device.mobile} {
    display: none;
  }
`;

const DesktopLanding = () => (
  <Section>
    <TheExperience />
    <NothingButVibe />
    <NoBullshit />
    <EveryonesAnAthlete />
  </Section>
);

export default DesktopLanding;

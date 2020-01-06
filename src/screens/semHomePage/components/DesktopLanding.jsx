import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

import Benefits from './desktop/Benefits';
import SessionExperienceManager from './desktop/SessionExperienceManager';
import SessionOfficial from './desktop/SessionOfficial';

const Container = styled.div`
  @media ${device.mobile} {
    display: none;
  }
`;
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const DesktopLanding = () => (
  <Container>
    <Section>
      <SessionExperienceManager />
      <SessionOfficial />
    </Section>
    <Benefits />
  </Container>
);

export default DesktopLanding;

import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

import SessionExperienceManager from './desktop/SessionExperienceManager';
import SessionOfficial from './desktop/SessionOfficial';

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media ${device.mobile} {
    display: none;
  }
`;

const DesktopLanding = () => (
  <Section>
    <SessionExperienceManager />
    <SessionOfficial />
  </Section>
);

export default DesktopLanding;

import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

import Benefits from './mobile/Benefits';
import SessionExperienceManager from './mobile/SessionExperienceManager';
import SessionOfficial from './mobile/SessionOfficial';

const Container = styled.div`
  @media ${device.desktop} {
    display: none;
  }
`;

const MobileLanding = () => (
  <Container>
    <SessionExperienceManager />
    <SessionOfficial />
    <Benefits />
  </Container>
);

export default MobileLanding;

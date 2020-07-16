import React from 'react';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

import JoinTheCCTeam from './desktop/JoinTheCCTeam';
import TheSessionExperienceManager from './desktop/TheSessionExperienceManager';
import TheSessionOfficial from './desktop/TheSessionOfficial';
import CCTeamPerks from './desktop/CCTeamPerks';
import AnyQuestions from './desktop/AnyQuestions';

const Container = styled.div``;

const DesktopLanding = () => (
  <Container>
    <JoinTheCCTeam />
    <TheSessionExperienceManager />
    <TheSessionOfficial />
    <CCTeamPerks />
    <AnyQuestions />
  </Container>
);

export default DesktopLanding;

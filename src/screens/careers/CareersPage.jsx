import React from 'react';

import PageLayout from 'shared/components/layout/PageLayout';
import JoinTheCCTeam from './sections/JoinTheCCTeam';
import TheSessionExperienceManager from './sections/TheSessionExperienceManager';
import TheSessionOfficial from './sections/TheSessionOfficial';
import CCTeamPerks from './sections/CCTeamPerks';

const CareersPage = () => (
  <PageLayout noPadding>
    <JoinTheCCTeam />
    <TheSessionExperienceManager />
    <TheSessionOfficial />
    <CCTeamPerks />
  </PageLayout>
);

export default CareersPage;

import React from 'react';
import styled from 'styled-components';

import joinTheCCTeamBgImg from 'screens/sem/images/cool-basketball-gym.jpeg';

const Section = styled.section`
  .title {
    font-size: 200px;
    line-height: 180px;
    @media (min-width: 992px) {
      font-size: 320px;
      line-height: 260px;
    }
  }

  .subtitle {
    font-size: 20px;
    line-height: 18px;
    @media (min-width: 992px) {
      font-size: 33px;
      line-height: 30px;
    }
  }
`;

const JoinTheCCTeam = () => (
  <Section
    className="flex justify-center items-center h-screen bg-cc-black bg-no-repeat bg-cover bg-top"
    style={{ backgroundImage: `url('${joinTheCCTeamBgImg}')` }}
  >
    <div className="text-center text-white bg-cc-black bg-opacity-60 w-full p-6">
      <h1 className="title font-dharma_gothic_cexbold text-transparent text-stroke-white text-13xl whitespace-nowrap">
        JOIN THE
      </h1>
      <h1 className="subtitle font-shapiro95_super_wide text-3xl whitespace-nowrap">
        EXPERIENCE TEAM
      </h1>
      <div className="text-sm max-w-2xl mt-4 mx-auto">
        AS A MEMBER OF THE CC EXPERIENCE TEAM, YOU&apos;LL HELP US UNITE AND IGNITE THE WORLD
        THROUGH THE POWER OF TEAM-SPORT
      </div>
    </div>
  </Section>
);

export default JoinTheCCTeam;

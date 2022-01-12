import React from 'react';
import styled from 'styled-components';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import joinTheCCTeamBgImg from 'screens/careers/images/cool-basketball-gym.jpeg';

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
  <Section>
    <LazyBackgroundImage
      img={joinTheCCTeamBgImg}
      className="flex justify-center items-center min-h-screen bg-cc-black bg-no-repeat bg-cover bg-top"
    >
      <div className="text-center text-white bg-cc-black bg-opacity-60 w-full p-6">
        <h1>
          <span className="title font-dharma_gothic_cexbold text-transparent text-stroke-white block whitespace-nowrap">
            JOIN THE
          </span>
          <span className="subtitle font-shapiro95_super_wide block whitespace-nowrap">
            EXPERIENCE TEAM
          </span>
        </h1>
        <div className="text-sm max-w-2xl mt-4 mx-auto">
          AS A MEMBER OF THE CC EXPERIENCE TEAM, YOU&apos;LL HELP US UNITE AND IGNITE THE WORLD
          THROUGH THE POWER OF TEAM-SPORT
        </div>
      </div>
    </LazyBackgroundImage>
  </Section>
);

export default JoinTheCCTeam;

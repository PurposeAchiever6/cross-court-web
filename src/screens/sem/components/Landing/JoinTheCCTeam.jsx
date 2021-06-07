import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  .title {
    color: white;
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
    font-size: 200px;
    line-height: 180px;
    @media (min-width: 992px) {
      font-size: 400px;
      line-height: 310px;
    }
  }

  .subtitle {
    color: white;
    font-family: shapiro95_super_wide;
    font-size: 45px;
    line-height: 30px;
    @media (min-width: 992px) {
      font-size: 90px;
      line-height: 65px;
    }
  }
`;

const JoinTheCCTeam = () => (
  <StyledDiv className="flex flex-col h-screen items-center justify-center text-white bg-cc-black">
    <div className="w-min">
      <p className="title">JOIN THE</p>
      <p className="subtitle">CCTEAM</p>
      <p className="text-center mt-10 text-xs">
        AS A MEMBER OF THE CC EXPERIENCE TEAM, YOU&apos;LL HELP US UNITE AND IGNITE THE WORLD
        THROUGH THE POWER OF TEAM-SPORT
      </p>
    </div>
  </StyledDiv>
);

export default JoinTheCCTeam;

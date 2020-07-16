import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import { ReactComponent as CompetitiveWageSvg } from 'shared/components/svg/competitive-wage.svg';
import { ReactComponent as FreeSessionsSvg } from 'shared/components/svg/free-sessions.svg';
import { ReactComponent as EquitySvg } from 'shared/components/svg/equity.svg';
import { ReactComponent as RewardsSvg } from 'shared/components/svg/rewards.svg';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';
import { ReactComponent as CrosscourtFace } from 'shared/components/svg/crosscourt-face.svg';

const Section = styled.section`
  padding: 4.5rem 5rem;
  display: flex;

  .text {
    font-weight: bold;
  }

  .title {
    text-align: left;
    font-size: 3rem;
    margin-bottom: 5rem;
    letter-spacing: 0.2rem;
    font-weight: 500;
  }

  .boxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .boxes-item {
    display: flex;
    height: 7rem;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

  .boxes-text {
    text-align: center;
    font-weight: bold;
  }

  .boxes-image {
    margin-bottom: 1rem;
  }

  // @media (max-width: 991px) {
  //   padding: 4.5rem 0;

  //   .title {
  //     text-align: center;
  //     font-size: 2rem;
  //   }

  //   .boxes {
  //     display: grid;
  //     grid-template-columns: repeat(2, 1fr);
  //     grid-template-rows: repeat(3, 1fr);
  //     grid-column-gap: 15px;
  //     grid-row-gap: 40px;
  //   }
  // }
`;

const CCTeamPerks = props => (
  <Section {...props}>
    <section className="cc-team-perks section-block text-black">
      <section className="title-block">
        <h2 className="title-1 shapiro97_air_extd">CCTEAM</h2>
        <p className="title-2 shapiro95_super_wide">PERKS</p>
      </section>
      <div className="boxes">
        <div className="boxes-item">
          <div className="boxes-image">
            <CompetitiveWageSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">COMPETITIVE WAGE</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <FreeSessionsSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">FREE SESSIONS</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <EquitySvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">EQUITY</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <RewardsSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">REWARDS</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <JerseySvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">CC FIT</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <CrosscourtFace />
          </div>
          <span className="boxes-text shapiro95_super_wide">GLORY</span>
        </div>
      </div>
    </section>
  </Section>
);

export default CCTeamPerks;

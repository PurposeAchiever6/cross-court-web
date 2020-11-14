import React from 'react';
import styled from 'styled-components';

import competitiveWageIcon from 'shared/images/competitive-wage.png';
import freeSessionsIcon from 'shared/images/free-sessions.png';
import equityIcon from 'shared/images/equity.png';
import rewardsIcon from 'shared/images/rewards.png';
import ccFitIcon from 'shared/images/cc-fit.png';
import gloryIcon from 'shared/images/glory.png';

const Section = styled.section`
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
`;

const CCTeamPerks = props => (
  <Section {...props}>
    <section className="cc-team-perks section-block text-black">
      <section className="title-block">
        <p className="heading-sprite"></p>
      </section>
      <div className="boxes">
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="competitive-wage" src={competitiveWageIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">COMPETITIVE WAGE</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="free-session" src={freeSessionsIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">FREE SESSIONS</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="equity" src={equityIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">EQUITY</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="rewards" src={rewardsIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">REWARDS</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="cc-fit" src={ccFitIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">CC FIT</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img alt="" className="glory" src={gloryIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">GLORY</span>
        </div>
      </div>
    </section>
  </Section>
);

export default CCTeamPerks;

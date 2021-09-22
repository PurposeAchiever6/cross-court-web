import React from 'react';
import styled from 'styled-components';

import oneHourIcon from 'shared/images/1-hour.png';
import premiumFacilityIcon from 'shared/images/premium-facility.png';
import fifteenPlayerLimitIcon from 'shared/images/15-player-limit.png';
import equipmentProvidedIcon from 'shared/images/equipment-provided.png';
import sessionOfficialIcon from 'shared/images/session-official.png';
import hypeSoundtracksIcon from 'shared/images/hype-soundtracks.png';

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;

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

  .boxes-item {
    align-items: center;
    flex-direction: column;
    display: flex;
    width: 130px;
    margin-bottom: 40px;
    @media (min-width: 992px) {
      margin-bottom: 0px;
    }
  }

  .boxes-image {
    img {
      width: 130px;
    }
  }

  .boxes-text {
    font-family: 'shapiro95_super_wide';
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    @media (min-width: 992px) {
      font-size: 16px;
      line-height: 18px;
    }
  }
`;

const KeysToCrosscourt = (props) => (
  <Section {...props}>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="one-hour" src={oneHourIcon} />
      </div>
      <span className="boxes-text">1 HOUR</span>
    </div>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="premium-facility" src={premiumFacilityIcon} />
      </div>
      <span className="boxes-text">
        PREMIUM
        <br />
        FACILITY
      </span>
    </div>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="fifteen-player-limit" src={fifteenPlayerLimitIcon} />
      </div>
      <span className="boxes-text">
        15 PLAYER
        <br />
        LIMIT
      </span>
    </div>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="equipment-provided" src={equipmentProvidedIcon} />
      </div>
      <span className="boxes-text">
        EQUIPMENT
        <br />
        PROVIDED
      </span>
    </div>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="session-official" src={sessionOfficialIcon} />
      </div>
      <span className="boxes-text">
        SESSION
        <br />
        OFFICIALS
      </span>
    </div>
    <div className="boxes-item">
      <div className="boxes-image">
        <img alt="" className="hype-soundtracks" src={hypeSoundtracksIcon} />
      </div>
      <span className="boxes-text">
        HYPE
        <br />
        SOUNDTRACKS
      </span>
    </div>
  </Section>
);

export default KeysToCrosscourt;

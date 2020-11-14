import React from 'react';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';

import oneHourIcon from 'shared/images/1-hour.png';
import premiumFacilityIcon from 'shared/images/premium-facility.png';
import fifteenPlayerLimitIcon from 'shared/images/15-player-limit.png';
import equipmentProvidedIcon from 'shared/images/equipment-provided.png';
import sessionOfficialIcon from 'shared/images/session-official.png';
import hypeSoundtracksIcon from 'shared/images/hype-soundtracks.png';

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

  @media (max-width: 991px) {
    .title {
      text-align: center;
      font-size: 2rem;
    }
  }
`;

const TheSession = props => (
  <Section className="the-session" {...props}>
    <div className="boxes">
      <div className="boxes-item">
        <div className="boxes-image">
          <img alt="" className="one-hour" src={oneHourIcon} />
        </div>
        <span className="boxes-text">
          ONE
          <br />
          HOUR
        </span>
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
          OFFICIAL
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
    </div>
    <section className="button-wrapper">
      <ArButton className="see-schedule-button" link={ROUTES.LOCATIONS} double={false}>
        SEE SCHEDULE
      </ArButton>
    </section>
  </Section>
);

export default TheSession;

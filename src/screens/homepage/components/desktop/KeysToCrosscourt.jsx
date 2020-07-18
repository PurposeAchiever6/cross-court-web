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
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

  .boxes-text {
    text-align: center;
  }

  .boxes-image {
    margin-bottom: 1rem;
  }

  // @media (max-width: 991px) {
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

const KeysToCrosscourt = props => (
  <Section {...props}>
    <section className="keys-to-crosscourt section-block text-black">
      <section className="title-block">
        <h2 className="title-1 shapiro97_air_extd">KEYS TO</h2>
        <p className="title-2 shapiro95_super_wide">CROSSCOURT</p>
      </section>
      <div className="boxes">
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="one-hour" src={oneHourIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">1 HOUR</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="premium-facility" src={premiumFacilityIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            PREMIUM
            <br />
            FACILITY
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="fifteen-player-limit" src={fifteenPlayerLimitIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            15 PLAYER
            <br />
            LIMIT
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="equipment-provided" src={equipmentProvidedIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            EQUIPMENT
            <br />
            PROVIDED
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="session-official" src={sessionOfficialIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            SESSION
            <br />
            OFFICIAL
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <img className="hype-soundtracks" src={hypeSoundtracksIcon} />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            HYPE
            <br />
            SOUNDTRACKS
          </span>
        </div>
      </div>
      <video className="video-player" src="/home.mp4" muted playsinline controls loop></video>
    </section>
  </Section>
);

export default KeysToCrosscourt;

import React from 'react';
import styled from 'styled-components';

import device from 'shared/styles/mediaQueries';
import GymSvg from 'shared/components/svg/GymSvg';
import { ReactComponent as ClockSvg } from 'shared/components/svg/clock.svg';
import { ReactComponent as OfficialSvg } from 'shared/components/svg/official.svg';
import { ReactComponent as PlayerSvg } from 'shared/components/svg/player-min.svg';
import { ReactComponent as SpeakerSvg } from 'shared/components/svg/speaker.svg';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';

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

  @media ${device.mobile} {
    padding: 4.5rem 0;

    .title {
      text-align: center;
      font-size: 2rem;
    }

    .boxes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 40px;
    }
  }
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
            <ClockSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">1 HOUR</span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <GymSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            PREMIUM
            <br />
            FACILITY
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <PlayerSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            15 PLAYER
            <br />
            LIMIT
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <JerseySvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            EQUIPMENT
            <br />
            PROVIDED
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <OfficialSvg />
          </div>
          <span className="boxes-text shapiro95_super_wide">
            SESSION
            <br />
            OFFICIAL
          </span>
        </div>
        <div className="boxes-item">
          <div className="boxes-image">
            <SpeakerSvg />
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

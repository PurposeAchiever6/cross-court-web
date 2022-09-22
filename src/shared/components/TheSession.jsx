import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import GymSvg from 'shared/components/svg/GymSvg';
import { ReactComponent as ClockSvg } from 'shared/components/svg/clock.svg';
import { ReactComponent as OfficialSvg } from 'shared/components/svg/official.svg';
import { ReactComponent as PlayerSvg } from 'shared/components/svg/player-min.svg';
import { ReactComponent as SpeakerSvg } from 'shared/components/svg/speaker.svg';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';

const Section = styled.section`
  padding: 4.5rem 5rem;
  background: ${colors.offWhite};

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
    width: 99%;
    text-align: center;
    font-weight: bold;
  }

  .boxes-image {
    margin-bottom: 1rem;
  }

  @media (max-width: 991px) {
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

const TheSession = (props) => (
  <Section {...props}>
    <h2 className="title">
      THE <span className="text">SESSION</span>
    </h2>
    <div className="boxes">
      <div className="boxes-item">
        <div className="boxes-image">
          <ClockSvg />
        </div>
        <span className="boxes-text">1 Hour</span>
      </div>
      <div className="boxes-item">
        <div className="boxes-image">
          <GymSvg />
        </div>
        <span className="boxes-text">Premium Facility</span>
      </div>
      <div className="boxes-item">
        <div className="boxes-image">
          <OfficialSvg />
        </div>
        <span className="boxes-text">Session Officials</span>
      </div>
      <div className="boxes-item">
        <div className="boxes-image">
          <PlayerSvg />
        </div>
        <span className="boxes-text">15 Player Limit</span>
      </div>
      <div className="boxes-item">
        <div className="boxes-image">
          <SpeakerSvg />
        </div>
        <span className="boxes-text">Hype Soundtracks</span>
      </div>
      <div className="boxes-item">
        <div className="boxes-image">
          <JerseySvg />
        </div>
        <span className="boxes-text">Equipment provided</span>
      </div>
    </div>
  </Section>
);

export default TheSession;

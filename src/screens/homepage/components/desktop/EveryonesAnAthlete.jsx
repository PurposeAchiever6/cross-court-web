import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import EveryonesAnAthleteImage from '../../images/everyones-an-athlete.jpg';
import ImageContainer from '../ImageContainer';

const TextContainer = styled.div`
  background: ${colors.black};
  color: ${colors.white};
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.25rem;
    letter-spacing: 0.1rem;
    margin: 0;
  }

  .text {
    font-weight: 500;
    display: block;

    em {
      font-weight: bold;
    }
  }
`;

const EveryonesAnAthlete = () => (
  <>
    <div>
      <ImageContainer img={EveryonesAnAthleteImage} overlayColor={colors.blackOverlay} />
    </div>
    <TextContainer>
      <h2 className="title">
        Everyone&apos;s
        <span className="text">
          an <em>Athlete</em>
        </span>
      </h2>
      <p>
        The court is where overworked professionals, weekend warriors, and up-and-coming creatives
        come together to sweat as equals. We are building a community where it’s not the differences
        that define us, but what we have in common
      </p>
    </TextContainer>
  </>
);

export default EveryonesAnAthlete;

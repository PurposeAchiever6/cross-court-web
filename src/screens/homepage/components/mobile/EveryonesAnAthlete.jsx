import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import EveryonesAnAthleteImage from '../../images/everyones-an-athlete.jpg';
import ImageContainer from '../ImageContainer';
import BoxContainer from './BoxContainer';

const Container = styled(BoxContainer)`
  .title {
    text-align: center;
  }

  .text {
    font-weight: 500;
    background-color: ${colors.black};
    display: block;
    padding: 0.25rem 0.5rem;

    em {
      font-weight: bold;
      text-align: center;
    }
  }
`;

const TextContainer = styled.div`
  margin: 0.25rem 2rem 4.5rem;
`;

const EveryonesAnAthlete = () => (
  <>
    <Container>
      <ImageContainer img={EveryonesAnAthleteImage} overlayColor={colors.blackOverlay} />
      <h2 className="title">
        Everyone&apos;s
        <span className="text">
          an <em>Athlete</em>
        </span>
      </h2>
    </Container>
    <TextContainer>
      <p>
        The court is where overworked professionals, weekend warriors, and up-and-coming creatives
        come together to sweat as equals. We are building a community where it’s not the differences
        that define us, but what we have in common
      </p>
    </TextContainer>
  </>
);

export default EveryonesAnAthlete;

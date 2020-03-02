import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import NoBullshitPic from '../../images/no-bullshit.jpg';
import ImageContainer from '../ImageContainer';

const TextContainer = styled.div`
  background-color: ${colors.polarPlum};
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.white};

  .title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.25rem;
    letter-spacing: 0.1rem;
    margin: 0;

    em {
      font-weight: bold;
      color: ${colors.white};
      display: block;
      padding-right: 1rem;
    }
  }
`;

const NoBullshit = () => (
  <>
    <TextContainer>
      <h2 className="title">
        No <em>BULLSH*T</em>
      </h2>
      <p>
        Sports shouldn’t be more work than workout. No more underwhelming pickup sessions. No more
        long term commitments to leagues. No more lame cardio. Just sign up, show up and sweat
      </p>
    </TextContainer>
    <div>
      <ImageContainer img={NoBullshitPic} overlayColor={colors.blueOverlay} />
    </div>
  </>
);

export default NoBullshit;

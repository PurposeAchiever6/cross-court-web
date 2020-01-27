import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { sessionExperienceText } from 'shared/texts/constants';
import SessionExperienceImage from '../../images/session-experience-manager.png';
import ImageContainer from './ImageContainer';

const Container = styled.div`
  .image {
    padding-bottom: 5rem;
  }
`;

const TextContainer = styled.div`
  background-color: ${colors.white};
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.black};
  font-size: 1.2rem;

  .button {
    margin-top: 3rem;
    margin-bottom: 5rem;
    width: 15rem;
  }

  .title {
    font-weight: bold;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    margin: 0;
    color: ${colors.polarPlum};
  }
`;

const SessionExperienceManager = () => {
  const SEM_LINK = process.env.REACT_APP_FOUNTAIN_SEM_LINK;

  return (
    <Container>
      <div className="image">
        <ImageContainer img={SessionExperienceImage} overlayColor={colors.blueOverlay} />
      </div>
      <TextContainer>
        <h2 className="title">SESSION</h2>
        <h2 className="title">EXPERIENCE</h2>
        <h2 className="title">MANAGER</h2>
        <p>{sessionExperienceText}</p>

        <a href={SEM_LINK} target="_blank" rel="noopener noreferrer">
          <Button className="button">Apply to be SEM</Button>
        </a>
      </TextContainer>
    </Container>
  );
};

export default SessionExperienceManager;

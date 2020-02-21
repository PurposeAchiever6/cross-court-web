import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { sessionOfficialText } from 'shared/texts/constants';

import SessionOfficialImage from '../../images/session-official.webp';
import ImageContainer from './ImageContainer';

const TextContainer = styled.div`
  background-color: ${colors.white};
  padding: 0 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.black};
  font-size: 1.6rem;
  height: 100vh;
  max-width: 40rem;

  .button {
    margin-top: 3rem;
    width: 20rem;
  }

  .title {
    font-weight: bold;
    font-size: 5rem;
    letter-spacing: 0.1rem;
    margin: 0;
    color: ${colors.black};
  }
`;

const SessionOfficial = () => {
  const SO_LINK = process.env.REACT_APP_FOUNTAIN_SO_LINK;

  return (
    <>
      <div>
        <ImageContainer img={SessionOfficialImage} overlayColor={colors.blackOverlay} />
      </div>
      <TextContainer>
        <h2 className="title">SESSION</h2>
        <h2 className="title">OFFICIAL</h2>
        <p>{sessionOfficialText}</p>
        <a href={SO_LINK} target="_blank" rel="noopener noreferrer">
          <Button className="button">Apply to be SO</Button>
        </a>
      </TextContainer>
    </>
  );
};

export default SessionOfficial;

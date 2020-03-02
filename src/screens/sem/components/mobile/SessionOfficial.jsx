import React from 'react';
import styled from 'styled-components';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { sessionOfficialText } from 'shared/texts/constants';

import SessionOfficialImage from '../../images/session-official.jpg';
import ImageContainer from './ImageContainer';

const TextContainer = styled.div`
  background-color: ${colors.white};
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
  flex-direction: column;
  justify-content: center;
  color: ${colors.black};
  font-size: 1.2rem;
  margin-top: 3rem;

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
    color: ${colors.black};
  }
`;

const SessionOfficial = () => {
  const env = runtimeEnv();
  const SO_LINK = env.REACT_APP_FOUNTAIN_SO_LINK;

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

import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import SessionOfficialImage from '../../images/session-official.png';
import ImageContainer from '../ImageContainer';

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

const SessionOfficial = () => (
  <>
    <div>
      <ImageContainer img={SessionOfficialImage} overlayColor={colors.blackOverlay} />
    </div>
    <TextContainer>
      <h2 className="title">SESSION</h2>
      <h2 className="title">OFFICIAL</h2>
      <p>
        As a session official, you will have fun enforcing the CrossCourt rules and maintaining
        order on the court. This isn’t your average referee role. We encourage getting to know our
        players, hitting a dance move in between games, or adding some flare to a foul call. You are
        a leader on the CrossCourt team and will work side by side with the SEM to deliver a
        seamless and enjoyable in session experience, every time.
      </p>
      <Button className="button">Apply to be SO</Button>
    </TextContainer>
  </>
);

export default SessionOfficial;

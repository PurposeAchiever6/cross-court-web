import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';
import ArrowDownSvg from 'shared/components/svg/ArrowDownSvg';
import JoinImage from '../../images/join.png';
import ImageContainer from './ImageContainer';

const Container = styled.div`
  color: ${colors.white};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 6rem;
  text-align: center;

  .title {
    font-size: 5rem;
    letter-spacing: 0.1rem;
    margin: 0;
    color: ${colors.white};
  }

  .subtitle {
    margin-top: 5rem;
    margin-bottom: 2rem;
    max-width: 50rem;
    text-align: center;
    font-size: 2rem;
  }

  @media ${device.mobile} {
    height: 70vh;

    * {
      width: 85%;
    }

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }
`;

const Join = () => (
  <ImageContainer img={JoinImage} overlayColor={colors.blackOverlay}>
    <Container>
      <p className="title">JOIN THE</p>
      <h2 className="title">
        <strong>CROSSCOURT TEAM</strong>
      </h2>
      <div className="subtitle">
        Together, we’ll create an experience that’s powerful enough to
        <strong> unite and ignite</strong> people worldwide through the
        <strong> culture of sport</strong>
      </div>
      <ArrowDownSvg />
    </Container>
  </ImageContainer>
);

export default Join;

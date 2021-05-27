import React from 'react';

import ROUTES from 'shared/constants/routes';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';
import showUpGif from 'screens/how-it-works/images/show-up.gif';
import colors from 'shared/styles/constants';

const Section = styled.section`
  .left-section,
  .right-section {
    min-height: 850px;
    width: auto;
    @media (min-width: 992px) {
      width: 50vw;
    }
  }

  .right-section {
    background: transparent url(${showUpGif}) no-repeat 0 0;
    background-size: cover;
    height: 100vh;
    order: 2;
  }

  .title {
    color: ${colors.brandBlue};
    font-size: 120px;
    line-height: 100px;
    margin-bottom: 15px;
    font-family: dharma_gothic_cheavy;

    @media (min-width: 992px) {
      font-size: 250px;
      line-height: 200px;
    }
  }
`;

const Showup = () => {
  return (
    <Section className="flex flex-col md:flex-row text-white text-right">
      <div className="left-section flex flex-col justify-center px-6 md:px-24">
        <p className="title dharma_gothic_cheavy">SHOW UP</p>
        <p className="mb-16 text-black">
          Each hour-long session is run by our trained Experience Team.
          <br />
          <br />
          Our Session Experience Managers will check you in, DJ, keep score, and make sure you leave
          dripping in sweat, while our Session Officials enforce the rules and maintain order on the
          court.
        </p>
        <div className="buttons-container">
          <PrimaryButton to={ROUTES.LOCATIONS}>RESERVE NOW</PrimaryButton>
        </div>
      </div>
      <div className="right-section" />
    </Section>
  );
};

export default Showup;

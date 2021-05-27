import React from 'react';

import ROUTES from 'shared/constants/routes';

import sweatGif from 'screens/how-it-works/images/sweat.gif';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const Section = styled.section`
  background-color: ${colors.brandBlack};

  .left-section,
  .right-section {
    min-height: 850px;
    width: auto;
    @media (min-width: 992px) {
      width: 50vw;
    }
  }

  .left-section {
    background: transparent url(${sweatGif}) no-repeat 0 0;
    background-size: cover;
    height: 100vh;
    order: 2;
  }

  .title {
    color: white;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandBlue};
    font-size: 120px;
    line-height: 100px;
    margin-bottom: 15px;
    font-family: dharma_gothic_cheavy_italic;

    @media (min-width: 992px) {
      font-size: 250px;
      line-height: 200px;
    }
  }
`;

function SweatDesktop() {
  return (
    <Section className="flex flex-col md:flex-row md:flex-row-reverse text-white">
      <div className="left-section" />
      <div className="right-section flex flex-col justify-center px-6 md:px-16">
        <p className="title">SWEAT</p>
        <p className="mb-16">
          Whether you&apos;re looking to sweat for 60 minutes or get a little competitive,
          we&apos;ve got you covered.
          <br />
          <br />
          Our high intensity sessions are fast paced and non stop. Games are to 5 minutes or first
          to 11 by 2&apos;s and 3&apos;s, whichever comes first. Winner stays, but only for a max of
          3 games in a row to ensure you leave dripping in sweat.
        </p>
        <PrimaryButton to={ROUTES.LOCATIONS} inverted bg={colors.brandBlack}>
          LET&apos;S GO
        </PrimaryButton>
      </div>
    </Section>
  );
}

export default SweatDesktop;

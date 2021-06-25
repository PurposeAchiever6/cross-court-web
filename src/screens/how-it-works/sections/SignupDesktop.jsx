import React from 'react';

import ROUTES from 'shared/constants/routes';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';
import signUpGif from 'screens/how-it-works/images/sign-up.gif';
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
    background: transparent url(${signUpGif}) no-repeat 0 0;
    background-size: cover;
    height: 100vh;
    order: 2;
  }

  .title {
    color: white;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandPurple};
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

const Signup = () => {
  return (
    <Section className="flex flex-col md:flex-row md:flex-row-reverse text-white">
      <div className="left-section" />
      <div className="right-section flex flex-col justify-center px-6 md:px-16">
        <p className="title">SIGN UP</p>
        <p className="mb-16">
          Reserve one of the 15 available spots in a session at a location near you. Come solo or
          with friends. Bring your shoes, some water, a towel, and a ball if you have 'em.
        </p>
        <PrimaryButton to={ROUTES.LOCATIONS} inverted bg={colors.brandBlack}>
          FIND A SESSION
        </PrimaryButton>
      </div>
    </Section>
  );
};

export default Signup;

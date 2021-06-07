import React from 'react';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import styled from 'styled-components';

const Section = styled.section`
  .title {
    color: black;
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    font-size: 100px;
    line-height: 100px;
    @media (min-width: 992px) {
      font-size: 250px;
      line-height: 250px;
    }
  }
`;

const AnyQuestions = () => (
  <Section className="md:h-screen b-white flex flex-col justify-center items-center">
    <p className="title">ANY QUESTIONS?</p>
    <PrimaryButton
      className="my-12"
      onClick={() => document.querySelector('.eapps-form-floating-button').click()}
    >
      EMAIL US
    </PrimaryButton>
  </Section>
);

export default AnyQuestions;

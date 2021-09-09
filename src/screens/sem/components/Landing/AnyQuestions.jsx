import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { getUserProfile } from 'screens/my-account/reducer';
import { openContactFormForUser } from 'shared/utils/contactForm';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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

const AnyQuestions = () => {
  const currentUser = useSelector(getUserProfile) || {};

  return (
    <Section className="md:h-screen b-white flex flex-col justify-center items-center">
      <p className="title">ANY QUESTIONS?</p>
      <PrimaryButton className="my-12" onClick={() => openContactFormForUser(currentUser)}>
        EMAIL US
      </PrimaryButton>
    </Section>
  );
};

export default AnyQuestions;

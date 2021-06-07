import React from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import theSessionExperienceManagerImg from 'screens/sem/images/the-session-experience-manager.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';

const Section = styled.section`
  @media (min-width: 992px) {
    background-image: url('${theSessionExperienceManagerImg}');
    background-attachment: fixed;
    height: 100vh;
  }

  .mobile-image {
    display: block;
    height: auto;
    width: 100%;
    @media (min-width: 992px) {
      display: none;
    }
  }

  .title {
    color: black;
    font-family: shapiro95_super_wide;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 52px;
      line-height: 52px;
    }
  }

  .subtitle {
    color: black;
    font-family: shapiro95_super_wide;
    font-size: 15px;
    line-height: 15px;
    @media (min-width: 992px) {
      font-size: 30px;
      line-height: 30px;
    }
  }
`;

const SessionExperienceManager = () => {
  const env = runtimeEnv();
  const SEM_LINK = env.REACT_APP_FOUNTAIN_SEM_LINK;

  return (
    <Section className="flex flex-col h-sreen bg-no-repeat bg-cover justify-center text-black p-6">
      <div>
        <p className="title">THE SESSION</p>
        <p className="subtitle">EXPERIENCE MANAGER</p>
        <p className="max-w-3xl my-10">
          Crosscourt&apos;s SEMs are the face of Crosscourt at each session. Part host, part DJ, and
          part coordinator, you represent Crosscourt at each session you manage. You bring the
          energy and hold it in each session. If you are charismatic, empowering, and hospitable,
          then you may be a perfect Session Experience Manager.
        </p>
      </div>
      <div className="flex justify-between w-full md:w-96">
        <PrimaryButton
          className="apply-button"
          onClick={() => window.open(SEM_LINK, '_blank')}
          w="100%"
        >
          APPLY
        </PrimaryButton>
        <PrimaryButton
          className="learn-more"
          onClick={() => document.querySelector('.eapps-form-floating-button').click()}
          inverted
          w="100%"
        >
          <span className="text">LEARN MORE</span>
        </PrimaryButton>
      </div>
      <img alt="" className="mobile-image" src={theSessionExperienceManagerImg} />
    </Section>
  );
};

export default SessionExperienceManager;

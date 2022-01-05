import React from 'react';
import { useSelector } from 'react-redux';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import styled from 'styled-components';

import { getUserProfile } from 'screens/my-account/reducer';
import { openContactFormForUser } from 'shared/utils/contactForm';
import theSessionExperienceManagerBgImg from 'screens/sem/images/the-session-experience-manager.jpeg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Section = styled.section`
  .title {
    font-size: 33px;
    line-height: 33px;
    @media (min-width: 992px) {
      font-size: 52px;
      line-height: 52px;
    }
  }

  .subtitle {
    font-size: 19px;
    line-height: 25px;
    @media (min-width: 992px) {
      font-size: 30px;
      line-height: 30px;
    }
  }
`;

const SessionExperienceManager = () => {
  const env = runtimeEnv();
  const SEM_LINK = env.REACT_APP_SEM_APPLICANT_LINK;
  const currentUser = useSelector(getUserProfile) || {};

  return (
    <Section className="flex flex-wrap">
      <div className="w-full md:w-1/2 px-4 md:px-10 py-14">
        <div className="w-min font-shapiro95_super_wide whitespace-nowrap text-center mb-10">
          <h2 className="title text-transparent text-stroke-black">THE SESSION</h2>
          <h2 className="subtitle">EXPERIENCE MANAGER</h2>
        </div>
        <p className="mb-20 max-w-2xl">
          Crosscourt&apos;s SEMs are the face of Crosscourt at each session. Part host, part DJ, and
          part coordinator, you represent Crosscourt at each session you manage. You bring the
          energy and hold it in each session. If you are charismatic and love providing world class
          hospitality, then you may be a perfect Session Experience Manager.
        </p>
        <div className="flex">
          <PrimaryButton className="mr-4 md:mr-12" onClick={() => window.open(SEM_LINK, '_blank')}>
            APPLY
          </PrimaryButton>
          <PrimaryButton onClick={() => openContactFormForUser(currentUser)} inverted>
            LEARN MORE
          </PrimaryButton>
        </div>
      </div>
      <div
        className="w-full md:w-1/2 bg-no-repeat bg-cover"
        style={{
          minHeight: '450px',
          backgroundImage: `url('${theSessionExperienceManagerBgImg}')`,
        }}
      />
    </Section>
  );
};

export default SessionExperienceManager;

import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import useWindowSize from 'shared/hooks/useWindowSize';
import { size } from 'shared/styles/mediaQueries';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import theSessionOfficialBgImg from 'screens/sem/images/pick-up-referee-3.jpeg';

const Section = styled.section`
  .title {
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 36px;
      line-height: 36px;
    }
  }

  .subtitle {
    font-size: 33px;
    line-height: 33px;
    @media (min-width: 992px) {
      font-size: 52px;
      line-height: 52px;
    }
  }
`;

const TheSessionOfficial = () => {
  const env = runtimeEnv();
  const SO_LINK = env.REACT_APP_SO_APPLICANT_LINK;

  const [showModal, setShowModal] = useState(false);
  const { width: windowSize } = useWindowSize();

  const modalStyle = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 100,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      borderRadius: '0',
      transform: 'translate(-50%, -50%)',
      background: 'none',
      padding: 0,
      width: '80%',
      height: windowSize < size.desktop ? '25%' : '70%',
    },
  };

  return (
    <>
      <Section className="flex flex-col-reverse md:flex-row flex-wrap">
        <div
          className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center"
          style={{
            minHeight: '550px',
            backgroundImage: `url('${theSessionOfficialBgImg}')`,
          }}
        />
        <div className="w-full md:w-1/2 px-4 md:px-10 py-14 bg-cc-black text-white">
          <div className="w-min ml-auto font-shapiro95_super_wide whitespace-nowrap text-center mb-10">
            <div className="title text-transparent text-stroke-white">THE SESSION</div>
            <div className="subtitle">OFFICIAL</div>
          </div>
          <p className="mb-20 max-w-2xl text-right ml-auto">
            As a session official, you will have fun enforcing the Crosscourt rules and maintaining
            order on the court. This isn&apos;t your average referee role. We encourage getting to
            know our players, hitting a dance move in between sessions, or adding some flare to a
            foul call. You are a leader on the Crosscourt team and will work side by side with the
            SEM to deliver a seamless and enjoyable in session experience, every time.
          </p>
          <div className="flex justify-end">
            <PrimaryButton className="mr-4 md:mr-12" onClick={() => window.open(SO_LINK, '_blank')}>
              APPLY
            </PrimaryButton>
            <PrimaryButton onClick={() => setShowModal(true)} inverted bg="transparent">
              LEARN MORE
            </PrimaryButton>
          </div>
        </div>
      </Section>

      <ReactModal
        shouldCloseOnOverlayClick
        style={modalStyle}
        onRequestClose={() => setShowModal(false)}
        isOpen={showModal}
      >
        <ReactPlayer
          controls
          playing
          width="100%"
          height="100%"
          url="https://player.vimeo.com/video/438002745?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963"
        />
      </ReactModal>
    </>
  );
};

export default TheSessionOfficial;

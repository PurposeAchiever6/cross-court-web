import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import { size } from 'shared/styles/mediaQueries';

import theSessionOfficialImg from 'screens/sem/images/the-session-official.png';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';

const Section = styled.section`
  @media (min-width: 992px) {
    background-image: url('${theSessionOfficialImg}');
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
    color: white;
    font-family: shapiro95_super_wide;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 52px;
      line-height: 52px;
    }
  }

  .subtitle {
    color: white;
    font-family: shapiro95_super_wide;
    font-size: 38px;
    line-height: 38px;
    @media (min-width: 992px) {
      font-size: 75px;
      line-height: 75px;
    }
  }
`;

const TheSessionOfficial = () => {
  const env = runtimeEnv();
  const SO_LINK = env.REACT_APP_FOUNTAIN_SO_LINK;

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
      <Section className="flex flex-col items-end h-sreen bg-cc-black bg-no-repeat bg-cover justify-center text-white p-6">
        <div className="text-right">
          <p className="title">THE SESSION</p>
          <p className="subtitle">OFFICIAL</p>
          <p className="max-w-3xl my-10">
            As a session official, you will have fun enforcing the Crosscourt rules and maintaining
            order on the court. This isn&apos;t your average referee role. We encourage getting to
            know our players, hitting a dance move in between sessions, or adding some flare to a
            foul call. You are a leader on the Crosscourt team and will work side by side with the
            SEM to deliver a seamless and enjoyable in session experience, every time.
          </p>
        </div>
        <div className="flex justify-between w-full md:w-96">
          <PrimaryButton onClick={() => window.open(SO_LINK, '_blank')} w="100%">
            APPLY
          </PrimaryButton>
          <PrimaryButton onClick={() => setShowModal(true)} inverted w="100%" bg="transparent">
            <span className="text">LEARN MORE</span>
          </PrimaryButton>
        </div>
        <img alt="" className="mobile-image" src={theSessionOfficialImg} />
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

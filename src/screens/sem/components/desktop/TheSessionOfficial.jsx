import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import { size } from 'shared/styles/mediaQueries';

import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';

import theSessionOfficialImg from 'screens/sem/images/the-session-official.png';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #9999ff;
  background-image: none;
  background-position: top left;
  display: block;
  height: auto !important;
  @media (min-width: 992px) {
    background-image: url('${theSessionOfficialImg}');
    background-attachment: fixed;
    height: 100vh;
  }

  .title-and-description-block {
    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center !important;
    }
    .heading-sprite {
      background-position: 0px -96vw;
      display: inline-block;
      height: 15.6vw;
      text-align: right;
      width: 80vw;
      @media (min-width: 992px) {
        background-position: 0px -779px;
        height: 126px;
        width: 650px;
      }
    }
    .title-1 {
      font-family: 'shapiro97_air_extd';
      -webkit-text-stroke: 1px;
      font-size: 28px;
      line-height: 24px;
      margin-bottom: 0;
      @media (min-width: 992px) {
        font-size: 50px;
        line-height: 46px;
      }
    }
    .title-2 {
      font-family: 'shapiro95_super_wide';
      font-size: 46.7px;
      line-height: 42.7px;
      margin-bottom: 30px;
      @media (min-width: 992px) {
        font-size: 83.2px;
        line-height: 79.2px;
        margin-bottom: 60px;
      }
    }

    .description {
      margin-bottom: 50px;
    }

    .button-wrapper {
      .primary-button {
        display: block;
        margin: 0 auto;
        max-width: 200px;
        @media (min-width: 992px) {
          display: inline-block;
          margin: 0;
          max-width: none;
        }
      }
      .apply-button {
        width: 200px;
        margin-bottom: 20px;
        @media (min-width: 992px) {
          margin: 0 50px 0 0;
          width: auto;
        }
      }
    }

    .learn-more {
      width: 200px;
      @media (min-width: 992px) {
        width: auto;
      }
      .text {
        margin-left: 25px;
      }
      img {
        height: 22px;
        left: 12px;
        position: absolute;
        top: 6px;
        width: 22px;

        .play-button-white {
          display: none;
          :hover {
            display: inline-block;
          }
        }
        .play-button-purple {
          display: inline-block;
          :hover {
            display: none;
          }
        }
      }
    }
  }

  .mobile-image {
    display: block;
    height: auto;
    width: 100%;
    @media (min-width: 992px) {
      display: none;
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
      <Section className="section-block text-white">
        <section className="title-and-description-block shift-right">
          <p className="heading-sprite" />
          <p className="description">
            As a session official, you will have fun enforcing the Crosscourt rules and maintaining
            order on the court. This isn&apos;t your average referee role. We encourage getting to
            know our players, hitting a dance move in between sessions, or adding some flare to a
            foul call. You are a leader on the Crosscourt team and will work side by side with the
            SEM to deliver a seamless and enjoyable in session experience, every time.
          </p>
          <div className="button-wrapper">
            <PrimaryButton
              className="apply-button"
              onClick={() => window.open(SO_LINK, '_blank')}
              double
            >
              APPLY
            </PrimaryButton>
            <PrimaryButton className="learn-more" onClick={() => setShowModal(true)} double>
              <img alt="" className="play-button-white" src={playButtonWhiteIcon} />
              <img alt="" className="play-button-purple" src={playButtonPurpleIcon} />
              <span className="text">LEARN MORE</span>
            </PrimaryButton>
          </div>
        </section>
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

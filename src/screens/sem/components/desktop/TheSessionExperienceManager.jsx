import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import { size } from 'shared/styles/mediaQueries';

import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';

import theSessionExperienceManagerImg from 'screens/sem/images/the-session-experience-manager.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #fff;
  background-image: none;
  background-position: top right;
  display: block;
  height: auto;

  @media (min-width: 992px) {
     {
      background-image: url('${theSessionExperienceManagerImg}');
      background-attachment: fixed;
      height: 100vh;
    }
  }

  .title-and-description-block {
    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .heading-sprite {
      background-position: 0px -85.8vw;
      height: 10vw;
      width: 80vw;
      @media (min-width: 992px) {
        background-position: 0px -697px;
        height: 81px;
        width: 650px;
      }
    }

    .title-1 {
      font-family: 'shapiro97_air_extd';
      -webkit-text-stroke: 1px;
      font-size: 28.5px;
      line-height: 24.5px;
      margin-bottom: 0;
      @media (min-width: 992px) {
        font-size: 80px;
        line-height: 76px;
      }
    }

    .title-2 {
      font-family: 'shapiro95_super_wide';
      font-size: 18.9px;
      line-height: 14.9px;
      margin-bottom: 30px;
      @media (min-width: 992px) {
        font-size: 52.8px;
        line-height: 48.8px;
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

const SessionExperienceManager = () => {
  const env = runtimeEnv();
  const SEM_LINK = env.REACT_APP_FOUNTAIN_SEM_LINK;

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
      <Section className="section-block text-black">
        <section className="title-and-description-block shift-left">
          <p className="heading-sprite" />
          <p className="description">
            Crosscourt&apos;s SEMs are the face of Crosscourt at each session. Part host, part DJ,
            and part coordinator, you represent Crosscourt at each session you manage. You bring the
            energy and hold it in each session. If you are charismatic, empowering, and hospitable,
            then you may be a perfect Session Experience Manager.
          </p>
          <div className="button-wrapper">
            <PrimaryButton
              className="apply-button"
              double
              inverted
              onClick={() => window.open(SEM_LINK, '_blank')}
              w="100%"
            >
              APPLY
            </PrimaryButton>
            <PrimaryButton
              className="learn-more"
              onClick={() => setShowModal(true)}
              double
              inverted
              w="100%"
            >
              <img alt="" className="play-button-white" src={playButtonWhiteIcon} />
              <img alt="" className="play-button-purple" src={playButtonPurpleIcon} />
              <span className="text">LEARN MORE</span>
            </PrimaryButton>
          </div>
        </section>
        <img alt="" className="mobile-image" src={theSessionExperienceManagerImg} />
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
          url="https://player.vimeo.com/video/438002072?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963"
        />
      </ReactModal>
    </>
  );
};

export default SessionExperienceManager;

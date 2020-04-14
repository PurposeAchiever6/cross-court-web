import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import device, { size } from 'shared/styles/mediaQueries';

import HeroImage from '../images/hero-mobile.jpg';
import HeroDesktop from '../images/hero-desktop.jpg';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${colors.white};
  background-image: url(${HeroImage});
  box-shadow: inset 0 0 0 2000px ${colors.blackOverlay};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .hero-title {
    font-weight: 500;
    font-size: 2.25rem;
    letter-spacing: 0.64px;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }

  .hero-company {
    font-weight: bold;
  }

  .hero-text {
    font-weight: 500;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    width: 16.25rem;
    margin: 1rem 0;
  }

  .hero-find {
    margin-top: 3rem;
  }

  @media ${device.desktop} {
    background-image: url(${HeroDesktop});
    align-items: flex-start;
    padding-left: 10.875rem;

    .hero-title {
      font-size: 3.6rem;
    }

    .hero-text {
      display: block;
      width: initial;
      font-size: 1.75rem;
    }
  }
`;

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const { width: windowSize } = useWindowSize();

  const modalStyle = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
    <HeroSection>
      <div>
        <h1 className="hero-title">
          new to <span className="hero-company">crosscourt?</span>
        </h1>
        <p className="hero-text">Just sign up, show up and sweat.</p>
      </div>
      <div className="hero-find">
        <Button onClick={() => setShowModal(true)}>Watch Video</Button>
      </div>
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
          url={runtimeEnv().REACT_APP_VIDEO_URL}
        />
      </ReactModal>
    </HeroSection>
  );
};

export default Hero;

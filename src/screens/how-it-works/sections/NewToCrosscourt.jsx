import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';

import useWindowSize from 'shared/hooks/useWindowSize';
import { size } from 'shared/styles/mediaQueries';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';
import newToCrosscourtMobileImg from 'screens/how-it-works/images/new-to-crosscourt-mobile.png';

const NewToCrosscourt = () => {
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
    <section className="new-to-crosscourt section-block text-white">
      <section className="title-block">
        <p className="heading-sprite"></p>
      </section>
      <a
        className="ar-button double check-it-out animate__animated animate__bounce animate__delay-1s animate__slower animate__bounceInRight"
        onClick={e => {
          e.preventDefault();
          document.querySelector('.the-session-video').scrollIntoView({behavior: 'smooth'});
          document.querySelector('.the-session-video video').play();
        }}
        href="#modal"
      >
        <div className="ar-button-inner">
          <img className="play-button-white" src={playButtonWhiteIcon} />
          <img className="play-button-purple" src={playButtonPurpleIcon} />
          <span className="text">CHECK IT OUT</span>
        </div>
        <div className="double-drop"></div>
      </a>
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
          url="https://player.vimeo.com/video/438000525?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963"
        />
      </ReactModal>
      <img className="mobile-image" src={newToCrosscourtMobileImg}></img>
    </section>
  );
};

export default NewToCrosscourt;

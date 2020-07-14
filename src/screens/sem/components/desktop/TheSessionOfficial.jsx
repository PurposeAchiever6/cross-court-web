import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import { size } from 'shared/styles/mediaQueries';

import PlaySvg from 'shared/components/svg/PlaySvg';

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
    <section className="the-session-official section-block text-white">
      <section className="title-and-description-block shift-right">
        <p className="title-1">THE SESSION</p>
        <p className="title-2">OFFICIAL</p>
        <p className="description">
          As a session official, you will have fun enforcing the Crosscourt rules and maintaining
          order on the court. This isn&apos;t your average referee role. We encourage getting to
          know our players, hitting a dance move in between sessions, or adding some flare to a foul
          call. You are a leader on the Crosscourt team and will work side by side with the SEM to
          deliver a seamless and enjoyable in session experience, every time.
        </p>
        <div className="button-wrapper">
          <a
            className="ar-button double apply-button"
            href={SO_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="ar-button-inner">APPLY</div>
            <div class="double-drop"></div>
          </a>
          <a
            className="ar-button double inverted check-it-out"
            onClick={e => {
              e.preventDefault();
              setShowModal(true);
            }}
            href="#modal"
          >
            <div className="ar-button-inner">
              <PlaySvg />
              <span className="text">LEARN MORE</span>
            </div>
            <div class="double-drop"></div>
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
              url="https://player.vimeo.com/video/438002745?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963"
            />
          </ReactModal>
        </div>
      </section>
    </section>
  );
};

export default TheSessionOfficial;

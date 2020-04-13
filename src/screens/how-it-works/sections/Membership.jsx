import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';
import device, { size } from 'shared/styles/mediaQueries';

import MembershipImage from '../images/membership-mobile.jpg';
import MembershipDesktop from '../images/membership-desktop.jpg';

const MembershipSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${colors.white};
  background-image: url(${MembershipImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .membership-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .membership-title {
    font-weight: 500;
    font-size: 1.5rem;
  }

  .membership-text {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .membership-find {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 130px;
    justify-content: space-between;

    button {
      padding: 1rem 3rem;
      width: 100%;
    }
  }

  @media ${device.desktop} {
    background-image: url(${MembershipDesktop});

    .membership-title {
      font-size: 1.75rem;
    }

    .membership-text,
    button {
      font-size: 1.125rem;
    }
  }
`;

const Membership = () => {
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
    <MembershipSection>
      <div className="membership-info">
        <h2 className="membership-title">Sound good?</h2>
      </div>
      <div className="membership-find">
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
    </MembershipSection>
  );
};

export default Membership;

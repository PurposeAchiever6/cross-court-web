import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { not, equals } from 'ramda';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';

const BannerContainer = styled.div`
  display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
  flex-direction: column;
  background: #aaaff3;
  color: white;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  z-index: 100;
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  .secondary {
    font-weight: bold;
    font-size: 1.55rem;
    line-height: 32px;
    letter-spacing: 0.04rem;
  }
  .primary {
    font-family: Untitled Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 2.2rem;
    line-height: 50px;
    margin-bottom: 1rem;
  }
  button {
    background-color: black;
    color: #fff;
    font-weight: 400;
    padding: 1rem 5rem;
  }
  svg {
    right: 1rem;
    position: absolute;
    top: 1rem;
    font-size: 1.25rem;
    color: #000;
    cursor: pointer;
  }
`;

const FreeSessionBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeBannerHandler = () => setShowBanner(false);

  const showConfirmModalHandler = () => setShowConfirmModal(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  const { freeSessionState } = useSelector(getUserProfile);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const freeSessionNotUsed = not(equals(freeSessionState, 'used'));
  const freeSessionNotClaimed = not(equals(freeSessionState, 'claimed'));

  return (
    <>
      <Modal shouldClose closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal}>
        <FreeSessionConfirmModal closeHandler={hideConfirmModalHandler} />
      </Modal>
      <BannerContainer showBanner={showBanner && freeSessionNotUsed && freeSessionNotClaimed}>
        <FontAwesomeIcon icon={faTimes} onClick={closeBannerHandler} />
        <span className="secondary">First session</span>
        <span className="primary">FREE</span>
        {isAuthenticated ? (
          <Button onClick={showConfirmModalHandler}>Let&apos;s Sweat</Button>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <Button>Let&apos;s Sweat</Button>
          </Link>
        )}
      </BannerContainer>
    </>
  );
};

export default FreeSessionBanner;

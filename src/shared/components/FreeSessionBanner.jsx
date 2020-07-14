import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { not, equals } from 'ramda';
import styled from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import ArButton from 'shared/components/ArButton';
import Modal from 'shared/components/Modal';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';
import device from 'shared/styles/mediaQueries';

const BannerContainer = styled.div`
  display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
  flex-direction: column;
  background: #aaaff3;
  color: white;
  position: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 65 ? 'fixed' : 'absolute')};
  bottom: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 65 ? '2rem' : '6rem')};
  right: 3rem;
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  @media ${device.mobile} {
    right: 1rem;
    bottom: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 165 ? '2rem' : '12rem')};
    position: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 165 ? 'fixed' : 'absolute')};
  }
`;

const FreeSessionBanner = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showConfirmModalHandler = () => setShowConfirmModal(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  const { freeSessionState } = useSelector(getUserProfile);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const freeSessionNotUsed = not(equals(freeSessionState, 'used'));
  const freeSessionNotClaimed = not(equals(freeSessionState, 'claimed'));
  const scrollY = useScrollPosition();
  const scrollLimit = document.body.offsetHeight - window.innerHeight;

  return (
    <>
      <Modal shouldClose closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal}>
        <FreeSessionConfirmModal closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal} />
      </Modal>
      <BannerContainer
        showBanner={freeSessionNotUsed && freeSessionNotClaimed}
        scrollY={scrollY}
        scrollLimit={scrollLimit}
      >
        {isAuthenticated ? (
          <Button className="ar-button" onClick={showConfirmModalHandler}>
            <div className="ar-button-inner">FIRST SESSION FREE</div>
          </Button>
        ) : (
          <ArButton link={ROUTES.LOGIN}>FIRST SESSION FREE</ArButton>
        )}
      </BannerContainer>
    </>
  );
};

export default FreeSessionBanner;

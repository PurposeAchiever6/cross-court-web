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
  // display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
  // flex-direction: column;
  // background: #aaaff3;
  // color: white;
  // position: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 65 ? 'fixed' : 'absolute')};
  // bottom: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 65 ? '2rem' : '6rem')};
  // right: 3rem;
  // z-index: 100;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  // @media (max-width: 991px) {
  //   right: 1rem;
  //   bottom: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 165 ? '2rem' : '12rem')};
  //   position: ${({ scrollY, scrollLimit }) => (scrollLimit - scrollY > 165 ? 'fixed' : 'absolute')};
  // }
`;

const FreeSessionBannerAnimated = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showConfirmModalHandler = () => setShowConfirmModal(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  const { freeSessionState } = useSelector(getUserProfile);
  const isAuthenticated = useSelector(getIsAuthenticated);

  // const freeSessionNotUsed = not(equals(freeSessionState, 'used'));
  // const freeSessionNotClaimed = not(equals(freeSessionState, 'claimed'));
  const scrollY = useScrollPosition();
  const scrollLimit = document.body.offsetHeight - window.innerHeight;

  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const freeSessionExpirationDate = userInfo.freeSessionExpirationDate;
  const daysFromNow = function(input) {
    const oneDay = 24 * 60 * 60 * 1000;
    let parts = input.split('-');
    const firstDate = new Date();
    const secondDate = new Date(parts[0], parts[1]-1, parts[2]);
    let daysLeft = Math.floor(Math.abs((secondDate - firstDate) / oneDay));
    if (daysLeft === 0) {
      daysLeft = '< 1 DAY';
    } else if (daysLeft === 1) {
      daysLeft = '1 DAY';
    } else {
      daysLeft = daysLeft + ' DAYS';
    }
    return daysLeft;
  };
  const freeSessionCreditAdded = freeSessionNotExpired && freeSessionNotClaimed;
  const bannerText = freeSessionCreditAdded && freeSessionExpirationDate ?
    <span>FIRST FREE SESSION<br />EXPIRES IN {daysFromNow(freeSessionExpirationDate)}</span> :
    'FIRST SESSION FREE';

  return (
    <>
      <Modal shouldClose closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal}>
        <FreeSessionConfirmModal closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal} />
      </Modal>
      {/* <BannerContainer
        className="banner-container"
        showBanner={freeSessionNotUsed && freeSessionNotClaimed}
        scrollY={scrollY}
        scrollLimit={scrollLimit}
      > */}
      <BannerContainer
        className="banner-container"
        showBanner={true}
        scrollY={scrollY}
        scrollLimit={scrollLimit}
      >
        {isAuthenticated ? (
          <Button className="first-session-free-btn ar-button animate__animated animate__bounce animate__delay-3s animate__slower animate__bounceInLeft" onClick={showConfirmModalHandler}>
            <div className="ar-button-inner">{bannerText}</div>
          </Button>
        ) : (
          <ArButton className="first-session-free-btn animate__animated animate__bounce animate__delay-3s animate__slower animate__bounceInLeft" link={ROUTES.SIGNUP}>{bannerText}</ArButton>
        )}
      </BannerContainer>
    </>
  );
};

export default FreeSessionBannerAnimated;

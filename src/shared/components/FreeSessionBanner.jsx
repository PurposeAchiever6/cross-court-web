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

const FreeSessionBanner = () => {
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const showConfirmModalHandler = () => setShowConfirmModal(true);
  // const hideConfirmModalHandler = () => setShowConfirmModal(false);

  // const { freeSessionState } = useSelector(getUserProfile);
  const isAuthenticated = useSelector(getIsAuthenticated);

  // const freeSessionNotUsed = not(equals(freeSessionState, 'used'));
  // const freeSessionNotClaimed = not(equals(freeSessionState, 'claimed'));
  const scrollY = useScrollPosition();
  const scrollLimit = document.body.offsetHeight - window.innerHeight;

  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const freeSessionExpirationDate = userInfo.freeSessionExpirationDate;
  const daysFromNow = (input) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let parts = (input || '').split('-');
    const firstDate = new Date();
    const secondDate = new Date(parts[0], parts[1]-1, parts[2]);
    let daysLeft = Math.floor(Math.abs((secondDate - firstDate) / oneDay));

    if (daysLeft === 0) {
      daysLeft = <><span className="days">&lt; 1</span> DAY</>;
    } else if (daysLeft === 1) {
      daysLeft = <><span className="days">1</span> DAY</>;
    } else {
      daysLeft = <><span className="days">{daysLeft}</span> DAYS</>;
    }
    return daysLeft;
  };
  const freeSessionCreditAdded = freeSessionNotExpired && freeSessionNotClaimed;
  const freeSessionCreditClaimed = !freeSessionNotClaimed;
  const isFSFFlow = (freeSessionCreditAdded || window.location.search === '?testanimation');
  const bannerButtonTarget = isAuthenticated ? ROUTES.LOCATIONS : ROUTES.SIGNUP;
  const bannerText = isFSFFlow ?
    <span>FIRST FREE SESSION<br />EXPIRES IN {daysFromNow(freeSessionExpirationDate)}</span> :
    'FIRST SESSION FREE';

  return (
    <>
      {!freeSessionCreditClaimed &&
        <BannerContainer
          className="banner-container"
          showBanner={true}
          scrollY={scrollY}
          scrollLimit={scrollLimit}
        >
          <ArButton className="first-session-free-btn" link={bannerButtonTarget}>{bannerText}</ArButton>
        </BannerContainer>
      }
    </>
  );
};

export default FreeSessionBanner;

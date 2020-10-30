import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';

const BannerContainer = styled.div`
`;

const FreeSessionBanner = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  const scrollY = useScrollPosition();
  const scrollLimit = document.body.offsetHeight - window.innerHeight;

  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const freeSessionUsed = userInfo.freeSessionState === 'used';
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
  const isFSFFlow = (freeSessionCreditAdded || window.location.search === '?testanimation');
  const bannerButtonTarget = isAuthenticated ? ROUTES.LOCATIONS : ROUTES.SIGNUP;
  const bannerText = isFSFFlow ?
    <span>FIRST FREE SESSION<br />EXPIRES IN {daysFromNow(freeSessionExpirationDate)}</span> :
    'FIRST SESSION FREE';

  return (
    <>
      {!freeSessionUsed &&
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

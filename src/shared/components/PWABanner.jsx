import React from 'react';
import styled from 'styled-components';
import { isIOS, isMobileSafari, isChrome } from 'react-device-detect';
import SafariMenuImg from 'shared/images/safari-menu.png';

const PWABannerContainer = styled.div`
  position: fixed;
  bottom: -1rem;
  right: 0rem;
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-radius: 20px;
  padding: 1rem 0;
  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  .text-container {
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;
    border-radius: 20px;
  }

  span {
    padding: 1rem;
    font-size: 0.7rem;
  }
  .triangle {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #fff transparent transparent transparent;
  }
`;

const PWABanner = () => {
  console.log(isChrome);
  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (isIOS && isMobileSafari && !isInstalled) {
    return (
      <>
        <PWABannerContainer>
          <div className="text-container">
            <span>Install this webapp on your iPhone: tap and then Add to homescreen</span>
          </div>
          <div className="triangle" />
        </PWABannerContainer>
      </>
    );
  }

  if (isIOS && isChrome) {
    return (
      <>
        <PWABannerContainer>
          <div className="text-container">
            <span>You can install this page in your phone by using Safari browser.</span>
          </div>
          <div className="triangle" />
        </PWABannerContainer>
      </>
    );
  }

  return null;
};

export default PWABanner;

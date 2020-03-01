import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { not, equals } from 'ramda';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import device from 'shared/styles/mediaQueries';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';

const BannerContainer = styled.div`
  .mobile-container {
    display: none;
  }
  .desktop-container {
    display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
    flex-direction: column;
    background: #aaaff3;
    color: white;
    position: fixed;
    bottom: 2rem;
    right: 3rem;
    z-index: 100;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    button {
      background: #aaaff3;
      color: #fff;
      font-weight: 400;
      padding: 1rem 5rem;
      font-family: Space Mono;
      font-weight: bold;
      font-size: 21px;
      line-height: 31px;
      width: 100%;

      padding: 1rem;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  @media ${device.mobile} {
    .desktop-container {
      display: none;
    }
    .mobile-container {
      display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
      flex-direction: row;
      background: #aaaff3;
      color: white;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 100;
      border-radius: 6px;
      padding: 1rem;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      align-items: center;
      svg {
        font-size: 1.25rem;
        color: #000;
        cursor: pointer;
        margin-right: 1.5rem;
      }

      .text {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;

        .secondary {
          font-weight: bold;
          font-size: 30px;
          line-height: 37px;
          letter-spacing: 0.04rem;
        }
        .primary {
          font-family: Untitled Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
        }
      }
      button {
        background-color: black;
        color: #fff;
        font-weight: 400;
        padding: 1rem 1.5rem;
        font-size: 16px;
        line-height: 20px;
      }
    }
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
        <div className="desktop-container">
          {isAuthenticated ? (
            <Button onClick={showConfirmModalHandler}>First Session Free</Button>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button>First Session Free</Button>
            </Link>
          )}
        </div>
        <div className="mobile-container">
          <FontAwesomeIcon icon={faTimes} onClick={closeBannerHandler} />
          <div className="text">
            <span className="primary">First session</span>
            <span className="secondary">FREE</span>
          </div>
          {isAuthenticated ? (
            <Button onClick={showConfirmModalHandler}>Try it Out</Button>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button>Try it Out</Button>
            </Link>
          )}
        </div>
      </BannerContainer>
    </>
  );
};

export default FreeSessionBanner;

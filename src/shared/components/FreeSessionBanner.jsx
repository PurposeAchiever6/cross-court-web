import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { not, equals } from 'ramda';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import ROUTES from 'shared/constants/routes';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';
import device from 'shared/styles/mediaQueries';

const BannerContainer = styled.div`
  display: ${({ showBanner }) => (showBanner ? 'flex' : 'none')};
  flex-direction: column;
  background: #aaaff3;
  color: white;
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  button {
    background: #aaaff3;
    color: #fff;
    font-weight: 400;
    padding: 1rem 5rem;
    font-family: Space Mono;
    //font-weight: bold;
    font-size: 21px;
    line-height: 31px;
    width: 100%;

    padding: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    font-family: Untitled Sans;
    i {
      font-weight: bold;
    }
  }

  @media ${device.mobile} {
    right: 1rem;
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

  return (
    <>
      <Modal shouldClose closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal}>
        <FreeSessionConfirmModal closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal} />
      </Modal>
      <BannerContainer showBanner={freeSessionNotUsed && freeSessionNotClaimed}>
        {isAuthenticated ? (
          <Button onClick={showConfirmModalHandler}>First Session Free</Button>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <Button>
              First Session <b>Free</b>
            </Button>
          </Link>
        )}
      </BannerContainer>
    </>
  );
};

export default FreeSessionBanner;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { not, equals } from 'ramda';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import Button from 'shared/components/Button';

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

const FreeSessionBanner = ({ modalHandler, claimFreeSession }) => {
  const [showBanner, setShowBanner] = useState(true);
  
  const userProfile = useSelector(getUserProfile);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isFreeSessionUsed = not(equals(userProfile.freeSessionState, 'used'));

  return (
    <BannerContainer showBanner={showBanner && isFreeSessionUsed}>
      <FontAwesomeIcon icon={faTimes} onClick={() => setShowBanner(false)} />
      <span className="secondary">First session</span>
      <span className="primary">FREE</span>
      {isAuthenticated ? (
        <Button onClick={modalHandler}>Let's Sweat</Button>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <Button onClick={modalHandler}>Let's Sweat</Button>
        </Link>
      )}
    </BannerContainer>
  );
};

export default FreeSessionBanner;

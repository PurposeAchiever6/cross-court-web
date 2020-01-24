import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <BannerContainer showBanner={showBanner && !claimFreeSession}>
      <FontAwesomeIcon icon={faTimes} onClick={() => setShowBanner(false)} />
      <span className="secondary">First session</span>
      <span className="primary">FREE</span>
      <Button onClick={modalHandler}>Let's Sweat</Button>
    </BannerContainer>
  );
};

export default FreeSessionBanner;

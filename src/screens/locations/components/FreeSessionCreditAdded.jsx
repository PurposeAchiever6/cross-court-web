import React from 'react';
import styled from 'styled-components';
import freeSessionImg from 'screens/locations/images/FreeSessionCreditAddedToAccount.png';

const FreeSessionCreditAddedContainer = styled.div`
`;

const FreeSessionCreditAdded = () => {
  return (
    <FreeSessionCreditAddedContainer className="free-session-credit-added">
      {/* <p className="title">FREE SESSION CREDIT ADDED TO ACCOUNT!</p> */}
      <img className="title" src={freeSessionImg} />
      <div className="bottom">
        <span className="vertical-line"></span>
        <p className="scroll-text">SCROLL TO BOOK SESSION</p>
      </div>
    </FreeSessionCreditAddedContainer>
  );
};

export default FreeSessionCreditAdded;

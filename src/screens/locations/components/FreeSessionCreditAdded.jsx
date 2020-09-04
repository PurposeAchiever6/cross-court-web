import React from 'react';
import styled from 'styled-components';

const FreeSessionCreditAddedContainer = styled.div`
`;

const FreeSessionCreditAdded = () => {
  return (
    <FreeSessionCreditAddedContainer className="free-session-credit-added">
      <p className="title">FREE SESSION CREDIT ADDED TO ACCOUNT!</p>
      <div className="bottom">
        <span className="vertical-line"></span>
        <p className="scroll-text">SCROLL TO FIND SESSION</p>
      </div>
    </FreeSessionCreditAddedContainer>
  );
};

export default FreeSessionCreditAdded;

import React from 'react';
import styled from 'styled-components';
import noSessionCreditsImg from 'screens/series/images/NoSessionCreditsLeftBuySeriesToReserve.png';

const NoSessionCreditsContainer = styled.div`
`;

const NoSessionCredits = () => {
  return (
    <NoSessionCreditsContainer className="no-session-credits">
      {/* <p className="title">NO SESSION CREDITS LEFT</p> */}
      <img className="title" src={noSessionCreditsImg} />
      <div className="bottom">
        <span className="vertical-line"></span>
        <p className="scroll-text">SCROLL TO SEE SERIES</p>
      </div>
    </NoSessionCreditsContainer>
  );
};

export default NoSessionCredits;

import React from 'react';
import noSessionCreditsImg from 'screens/products/images/NoSessionCreditsLeftBuySeriesToReserve.png';

const NoSessionCredits = () => {
  return (
    <div className="no-session-credits">
      <img className="title" src={noSessionCreditsImg} alt="No Session Credits!" />
      <div className="bottom">
        <span className="vertical-line"></span>
        <p className="scroll-text">SCROLL TO SEE MEMBERSHIPS</p>
      </div>
    </div>
  );
};

export default NoSessionCredits;

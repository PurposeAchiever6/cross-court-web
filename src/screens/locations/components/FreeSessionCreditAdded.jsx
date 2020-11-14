import React from 'react';
import freeSessionImg from 'screens/locations/images/FreeSessionCreditAddedToAccount.png';

const FreeSessionCreditAdded = () => {
  return (
    <div className="free-session-credit-added">
      <img className="title" src={freeSessionImg} alt="Free Session Added!" />
      <div className="bottom">
        <span className="vertical-line"></span>
        <p className="scroll-text">SCROLL TO BOOK SESSION</p>
      </div>
    </div>
  );
};

export default FreeSessionCreditAdded;

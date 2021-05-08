import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const MyCreditsContainer = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
  }
  .sessions-number-container {
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;

    .session-number {
      font-weight: 500;
      font-size: 57px;
      line-height: 47px;
      margin-bottom: 0.75rem;
    }
  }
  a {
    width: 100%;
  }
  .btn {
    background-color: #000;
    color: #fff;
    width: 100%;
  }
  .alt-btn {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    margin-top: 2rem;
    width: 100%;
  }
`;

const MyCredits = ({ credits }) => {
  return (
    <MyCreditsContainer className="my-credits">
      <h3>SERIES</h3>
      <div className="sessions-number-container">
        <span className="session-number">{credits}</span>
        <span className="session-title-block">
          <span className="session-title-1">SESSIONS</span>
          <span className="session-title-2">LEFT</span>
        </span>
      </div>
      <PrimaryButton className="buy-series-button" to="/series" w="100%">
        BUY SERIES
      </PrimaryButton>
      <PrimaryButton to="/purchase-history" inverted w="100%">
        PURCHASE HISTORY
      </PrimaryButton>
    </MyCreditsContainer>
  );
};

MyCredits.propTypes = {
  credits: number.isRequired,
};

export default MyCredits;

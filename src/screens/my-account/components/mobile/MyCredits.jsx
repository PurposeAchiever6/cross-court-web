import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import ArButton from 'shared/components/ArButton';

const MyCreditsContainer = styled.div`
  padding: 1rem;
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;

  * {
    flex: 1;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
  .sessions-number-container {
    text-align: center;
    margin-right: 1rem;

    .session-number {
      font-weight: 500;
      font-size: 57px;
      margin-bottom: 0.75rem;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn {
    background-color: ${colors.black};
    color: ${colors.white};
    width: 100%;
    padding: 1rem 1rem;
  }
  .alt-btn {
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.black};
    width: 100%;
    padding: 0.7rem 1rem;
    height: 100%;
  }
`;

const MyCredits = ({ credits }) => (
  <MyCreditsContainer>
    <div className="sessions-number-container">
      <span className="session-number">{credits}</span>
      <span className="sessions-left">
        SESSIONS
        <br />
        LEFT
      </span>
    </div>
    <div className="links">
      <ArButton className="buy-series-btn" link={ROUTES.SERIES}>
        BUY SERIES
      </ArButton>
      <ArButton link={ROUTES.PURCHASEHISTORY}>PURCHASE HISTORY</ArButton>
    </div>
  </MyCreditsContainer>
);

MyCredits.propTypes = {
  credits: number,
};

export default MyCredits;

import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const MyCreditsContainer = styled.div`
  padding: 1rem;
  margin-top: 1.5rem;

  .session-number {
    display: block;
    font-family: 'shapiro95_super_wide';
    font-size: 57px;
    line-height: 63px;
    margin-right: 0.5rem;
  }

  .sessions-left {
    display: block;
    font-family: 'shapiro95_super_wide';
    font-size: 18px;
    line-height: 16px;
    max-width: 216px;
    margin: 0 auto;
  }
`;

const MyCredits = ({ dropinCredits, subscriptionCredits }) => (
  <MyCreditsContainer>
    <div className="flex justify-between mb-8">
      <div className="text-center">
        <span className="session-number">{dropinCredits}</span>
        <span className="sessions-left">
          SESSIONS
          <br />
          LEFT
        </span>
      </div>
      <div className="text-center">
        <span className="session-number">{subscriptionCredits}</span>
        <span className="sessions-left">SESSIONS LEFT PER MONTH</span>
      </div>
    </div>
    <div>
      <PrimaryButton className="mb-1" to={ROUTES.SERIES} w="100%">
        BUY SERIES
      </PrimaryButton>
      <PrimaryButton to={ROUTES.PURCHASEHISTORY} w="100%">
        PURCHASE HISTORY
      </PrimaryButton>
    </div>
  </MyCreditsContainer>
);

MyCredits.propTypes = {
  dropinCredits: number.isRequired,
  subscriptionCredits: number.isRequired,
};

export default MyCredits;

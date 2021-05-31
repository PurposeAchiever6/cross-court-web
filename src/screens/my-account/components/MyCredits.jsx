import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const MyCreditsContainer = styled.div`
  padding: 2.5rem;

  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
    font-family: 'shapiro95_super_wide';
  }

  .session-number {
    font-family: 'shapiro95_super_wide';
    font-size: 76px;
    line-height: 63px;
    margin-right: 0.5rem;
  }

  .dropin-title-1,
  .subscription-title-1 {
    display: block;
    font-family: 'shapiro95_super_wide';
  }

  .dropin-title-2,
  .subscription-title-2 {
    display: block;
    font-family: 'shapiro97_air_extd';
    -webkit-text-stroke: 1px;
  }

  .dropin-title-1 {
    font-size: 22px;
    line-height: 18px;
  }

  .dropin-title-2 {
    font-size: 49px;
    line-height: 45px;
  }

  .subscription-title-1 {
    font-size: 24px;
    line-height: 20px;
    white-space: nowrap;
  }

  .subscription-title-2 {
    font-size: 34px;
    line-height: 45px;
    white-space: nowrap;
  }
`;

const MyCredits = ({ dropinCredits, subscriptionCredits }) => {
  return (
    <MyCreditsContainer className="my-credits">
      <h3>SERIES</h3>
      <div className="mb-4">
        <div className="flex mb-4">
          <span className="session-number">{dropinCredits || 0}</span>
          <span>
            <span className="dropin-title-1">SESSIONS</span>
            <span className="dropin-title-2">LEFT</span>
          </span>
        </div>
        <div className="flex">
          <span className="session-number">{subscriptionCredits || 0}</span>
          <span>
            <span className="subscription-title-1">SESSIONS LEFT</span>
            <span className="subscription-title-2">PER MONTH</span>
          </span>
        </div>
      </div>
      <PrimaryButton className="mb-1" to="/series" w="100%">
        BUY SERIES
      </PrimaryButton>
      <PrimaryButton to="/purchase-history" inverted w="100%">
        PURCHASE HISTORY
      </PrimaryButton>
    </MyCreditsContainer>
  );
};

MyCredits.propTypes = {
  dropinCredits: number.isRequired,
  subscriptionCredits: number.isRequired,
};

export default MyCredits;

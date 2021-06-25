import React from 'react';
import { number, bool } from 'prop-types';
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

const MyCredits = ({ isUnlimited, credits, hasActiveSubscription }) => {
  const sessionPluralize = credits === 1 ? 'SESSION' : 'SESSIONS';

  return (
    <MyCreditsContainer>
      <div className="text-center pt-4 mb-16">
        {isUnlimited ? (
          <span className="sessions-left">
            UNLIMITED
            <br />
            SESSIONS
          </span>
        ) : (
          <>
            <span className="session-number">{credits}</span>
            {hasActiveSubscription ? (
              <span className="sessions-left">
                {`${sessionPluralize} LEFT`}
                <br />
                THIS MONTH
              </span>
            ) : (
              <span className="sessions-left">
                {sessionPluralize}
                <br />
                LEFT
              </span>
            )}
          </>
        )}
      </div>
      <div>
        <PrimaryButton className="mb-1 block" to={ROUTES.MEMBERSHIPS} w="100%">
          {hasActiveSubscription ? 'Manage Membership' : 'See Memberships'}
        </PrimaryButton>
        <PrimaryButton to={ROUTES.PURCHASEHISTORY} w="100%">
          PURCHASE HISTORY
        </PrimaryButton>
      </div>
    </MyCreditsContainer>
  );
};

MyCredits.propTypes = {
  isUnlimited: bool,
  credits: number,
  hasActiveSubscription: bool.isRequired,
};

export default MyCredits;

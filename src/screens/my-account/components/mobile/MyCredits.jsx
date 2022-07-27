import React from 'react';
import { number, bool, object } from 'prop-types';
import styled from 'styled-components';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';

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

const MyCredits = ({
  isUnlimited,
  credits,
  isUnlimitedSkillSession,
  skillSessionCredits,
  activeSubscription,
}) => {
  const sessionPluralize = credits === 1 ? 'SESSION' : 'SESSIONS';
  const skillSessionPluralize = skillSessionCredits === 1 ? 'SKILL SESSION' : 'SKILL SESSIONS';

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
            {activeSubscription ? (
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
        {activeSubscription && (
          <>
            <div className="mt-4">
              {isUnlimitedSkillSession ? (
                <span className="sessions-left">
                  UNLIMITED
                  <br />
                  SKILL SESSIONS
                </span>
              ) : (
                <>
                  <span className="session-number">{skillSessionCredits}</span>
                  <span className="sessions-left">
                    {skillSessionPluralize}
                    <br />
                    <span className="whitespace-nowrap">LEFT THIS MONTH</span>
                  </span>
                </>
              )}
            </div>
            <div className="text-sm mt-10">
              <div className="mb-4">
                <div className="font-shapiro95_super_wide uppercase mr-2">Current Membership</div>
                <div>
                  {activeSubscription.product.name}
                  {activeSubscription.paused && <span className="ml-1 text-xs">(paused)</span>}
                </div>
              </div>
              <div>
                <div className="font-shapiro95_super_wide uppercase mr-2">Billing Period</div>
                <div>
                  {`${subscriptionPeriodFormattedDate(
                    activeSubscription.currentPeriodStart
                  )} - ${subscriptionPeriodFormattedDate(activeSubscription.currentPeriodEnd)}`}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <PrimaryButton
          className="mb-1 block"
          to={activeSubscription ? ROUTES.MANAGE_MEMBERSHIP : ROUTES.MEMBERSHIPS}
          w="100%"
        >
          {activeSubscription ? 'Manage Membership' : 'See Memberships'}
        </PrimaryButton>
        <PrimaryButton to={ROUTES.PAYMENT_HISTORY} w="100%">
          PAYMENT HISTORY
        </PrimaryButton>
      </div>
    </MyCreditsContainer>
  );
};

MyCredits.defaultProps = {
  activeSubscription: null,
};

MyCredits.propTypes = {
  isUnlimited: bool,
  credits: number,
  isUnlimitedSkillSession: bool.isRequired,
  skillSessionCredits: number.isRequired,
  activeSubscription: object,
};

export default MyCredits;

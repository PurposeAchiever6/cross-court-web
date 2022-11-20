import React from 'react';
import { number, bool, object } from 'prop-types';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import { pluralize } from 'shared/utils/helpers';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Badge from 'shared/components/Badge';
import { ZERO_SKLZ_CREDITS_NOTICE } from 'screens/my-account/constants';

const MyCreditsContainer = styled.div`
  padding: 2.5rem;

  h3 {
    font-size: 1.75rem;
    font-family: 'shapiro95_super_wide';
  }

  .session-number {
    font-family: 'shapiro95_super_wide';
    font-size: 76px;
    line-height: 63px;
    margin-right: 0.5rem;
  }

  .dropin-title-1,
  .subscription-title-1,
  .unlimited-title-1 {
    display: block;
    font-family: 'shapiro95_super_wide';
  }

  .dropin-title-2,
  .subscription-title-2,
  .unlimited-title-2,
  .unlimited-skill-title-2 {
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

  .unlimited-title-1 {
    font-size: 38px;
    line-height: 35px;
    letter-spacing: 0.5px;
  }

  .unlimited-title-2,
  .unlimited-skill-title-2 {
    font-size: 35px;
    line-height: 30px;
  }

  .unlimited-skill-title-2 {
    white-space: nowrap;
  }
`;

const MyCredits = ({
  isUnlimited,
  credits,
  isUnlimitedSkillSession,
  skillSessionCredits,
  activeSubscription,
  scoutingCredits,
}) => {
  const sessionPluralize = pluralize('SESSION', credits, 'S');
  const skillSessionPluralize = pluralize('SKLZ SESSION', skillSessionCredits, 'S');

  return (
    <MyCreditsContainer className="my-credits">
      <div className="mb-6">
        {isUnlimited ? (
          <div className="mb-6">
            <span className="unlimited-title-1">UNLIMITED</span>
            <span className="unlimited-title-2">SESSIONS</span>
          </div>
        ) : (
          <div className="flex mb-6">
            <span className="session-number">{credits}</span>
            <span>
              {activeSubscription ? (
                <>
                  <span className="subscription-title-1">{`${sessionPluralize} LEFT`}</span>
                  <span className="subscription-title-2">THIS MONTH</span>
                </>
              ) : (
                <>
                  <span className="dropin-title-1">{sessionPluralize}</span>
                  <span className="dropin-title-2">LEFT</span>
                </>
              )}
            </span>
          </div>
        )}
        {activeSubscription && (
          <>
            {isUnlimitedSkillSession ? (
              <div className="mb-6">
                <span className="unlimited-title-1">UNLIMITED</span>
                <span className="unlimited-skill-title-2">SKLZ SESSIONS</span>
              </div>
            ) : (
              <div className="flex mb-6">
                <span className="session-number">{skillSessionCredits}</span>
                <span>
                  <span className="subscription-title-1">{`${skillSessionPluralize} LEFT`}</span>
                  <span>
                    <div className="subscription-title-2">THIS MONTH</div>
                    {skillSessionCredits === 0 && (
                      <div className="text-xs font-semibold mt-2">{ZERO_SKLZ_CREDITS_NOTICE}</div>
                    )}
                  </span>
                </span>
              </div>
            )}
            <div className="text-sm mt-4">
              <div>
                <span className="font-shapiro95_super_wide uppercase whitespace-nowrap mr-2">
                  Current Membership:
                </span>
                <span>{activeSubscription.product.name}</span>
                {activeSubscription.paused && <span className="ml-1 text-xs">(paused)</span>}
              </div>
              <div>
                <span className="font-shapiro95_super_wide uppercase whitespace-nowrap mr-2">
                  Billing Period:
                </span>
                <span>
                  {`${subscriptionPeriodFormattedDate(
                    activeSubscription.currentPeriodStart
                  )} - ${subscriptionPeriodFormattedDate(activeSubscription.currentPeriodEnd)}`}
                </span>
              </div>
              {activeSubscription.canceled && (
                <Badge variant="black" size="sm" className="inline-block uppercase mt-4 py-2">
                  Canceled at end of billing period
                </Badge>
              )}
            </div>
          </>
        )}
        {scoutingCredits > 0 && (
          <div className="text-sm">
            <span className="font-shapiro95_super_wide uppercase whitespace-nowrap mr-2">
              Scouting Credits:
            </span>
            <span>
              {scoutingCredits} {pluralize('credit', scoutingCredits)}
            </span>
          </div>
        )}
      </div>
      <PrimaryButton
        className="mb-1 block"
        to={activeSubscription ? ROUTES.MANAGE_MEMBERSHIP : ROUTES.MEMBERSHIPS}
        w="100%"
      >
        {activeSubscription ? 'Manage Membership' : 'See Memberships'}
      </PrimaryButton>
      <PrimaryButton to={ROUTES.PAYMENT_HISTORY} inverted w="100%">
        Payment History
      </PrimaryButton>
    </MyCreditsContainer>
  );
};

MyCredits.defaultProps = {
  activeSubscription: null,
};

MyCredits.propTypes = {
  isUnlimited: bool.isRequired,
  credits: number.isRequired,
  isUnlimitedSkillSession: bool.isRequired,
  skillSessionCredits: number.isRequired,
  activeSubscription: object,
  scoutingCredits: number.isRequired,
};

export default MyCredits;

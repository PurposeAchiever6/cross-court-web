import React from 'react';
import { number, bool, object } from 'prop-types';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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
  .unlimited-title-2 {
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

  .unlimited-title-2 {
    font-size: 35px;
    line-height: 30px;
  }
`;

const MyCredits = ({ isUnlimited, credits, activeSubscription }) => {
  const sessionPluralize = credits === 1 ? 'SESSION' : 'SESSIONS';

  return (
    <MyCreditsContainer className="my-credits">
      <div className="mb-6">
        {isUnlimited ? (
          <div className="-mt-4s">
            <span className="unlimited-title-1">UNLIMITED</span>
            <span className="unlimited-title-2">SESSIONS</span>
          </div>
        ) : (
          <div className="flex mb-4">
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
  activeSubscription: object,
};

export default MyCredits;

import React from 'react';
import dayjs from 'dayjs';

import { formatSessionDate } from 'shared/utils/date';
import { isUserInLegalAge, userOutsideOfSessionSkillLevel } from 'shared/utils/user';

export const reserveTeamReservationAllowed = (session) => {
  const { startTime, time, past, isPrivate, isOpenClub, reservationsCount } = session;
  const sessionDate = formatSessionDate(startTime);

  if (isOpenClub || past || isPrivate) {
    return true;
  }

  const currentDate = dayjs().toDate();
  const formatedSessionDate = dayjs(
    `${sessionDate} ${time.split('T')[1].split('Z')[0]}`,
    'MM/DD/YY HH:MM:SS'
  ).toDate();

  const sessionStartsIn = parseInt(Math.abs(currentDate - formatedSessionDate) / 36e5, 10);

  if (sessionStartsIn > 5 && sessionStartsIn <= 10 && reservationsCount < 5) {
    return true;
  }

  if (sessionStartsIn > 1 && sessionStartsIn <= 5 && reservationsCount < 10) {
    return true;
  }

  if (sessionStartsIn <= 1 && reservationsCount < 13) {
    return true;
  }

  return false;
};

export const sessionReservationInfo = (session, userProfile) => {
  const userHasLegalAge = isUserInLegalAge(userProfile);
  const {
    full,
    spotsLeft,
    reserved,
    past,
    onWaitlist,
    skillLevel,
    isOpenClub,
    comingSoon,
    costCredits,
  } = session;

  if (comingSoon || reserved || past || onWaitlist) {
    return { disabled: false };
  }

  if (!userHasLegalAge) {
    return { disabled: true, warningIcon: true, text: 'Must be 18+' };
  }

  if (isOpenClub) {
    if (!userProfile.activeSubscription) {
      return { disabled: true, warningIcon: true, text: 'Members only' };
    }

    return { disabled: false };
  }

  if (session.membersOnly) {
    if (!userProfile.activeSubscription) {
      return { disabled: true, warningIcon: true, text: 'Members only' };
    }

    if (session.allowedProducts) {
      const userSubscriptionProductId = userProfile.activeSubscription.product.id;
      const allowedProductIds = session.allowedProducts.map(
        (allowedProduct) => allowedProduct.productId
      );

      if (!allowedProductIds.includes(userSubscriptionProductId)) {
        const allowedProductsNames = session.allowedProducts
          .map((allowedProduct) => allowedProduct.name)
          .join(' & ');

        return {
          disabled: true,
          warningIcon: true,
          text: (
            <>
              {allowedProductsNames} <br />
              members only
            </>
          ),
        };
      }
    }
  }

  if (userProfile.reserveTeam && !reserveTeamReservationAllowed(session)) {
    return {
      disabled: true,
      warningIcon: true,
      text: (
        <>
          Reserve team <br />
          restricted
        </>
      ),
    };
  }

  if (!session.allSkillLevelsAllowed && userOutsideOfSessionSkillLevel(userProfile, session)) {
    return { disabled: true, warningIcon: true, text: skillLevel?.name };
  }

  if (full) {
    return { disabled: false, warningIcon: true, text: 'Session full' };
  }

  if (costCredits === 0) {
    return {
      disabled: false,
      warningIcon: false,
      text: (
        <>
          No credit <br className="sm:hidden" /> required
        </>
      ),
      tooltip:
        'For a limited time only, certain sessions and experiences will be included ' +
        'with your membership and will not require a credit when signing up',
    };
  }

  if (spotsLeft <= 5) {
    return { disabled: false, warningIcon: true, text: 'Few spots left' };
  }

  return { disabled: false };
};

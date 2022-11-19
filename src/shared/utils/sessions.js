import React from 'react';
import dayjs from 'dayjs';

import { formatSessionDate } from 'shared/utils/date';
import { isUserInLegalAge, userOutsideOfSessionSkillLevel } from 'shared/utils/user';

export const isNormalSession = (session) => !session.isOpenClub && !session.skillSession;

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
  const { full, spotsLeft, reserved, past, onWaitlist, skillLevel, isOpenClub, comingSoon } =
    session;

  if (comingSoon || reserved || past || onWaitlist) {
    return { disabled: false };
  }

  if (!userHasLegalAge) {
    return { disabled: true, warning: 'Must be 18+' };
  }

  if (isOpenClub) {
    if (!userProfile.activeSubscription) {
      return { disabled: true, warning: 'Members only' };
    }

    return { disabled: false };
  }

  if (!userProfile.activeSubscription && session.membersOnly) {
    return { disabled: true, warning: 'Members only' };
  }

  if (userProfile.reserveTeam && !reserveTeamReservationAllowed(session)) {
    return {
      disabled: true,
      warning: (
        <>
          Reserve team <br />
          restricted
        </>
      ),
    };
  }

  if (!session.allSkillLevelsAllowed && userOutsideOfSessionSkillLevel(userProfile, session)) {
    return { disabled: true, warning: skillLevel?.name };
  }

  if (full) {
    return { disabled: false, warning: 'Session full' };
  }

  if (spotsLeft <= 5) {
    return { disabled: false, warning: 'Few spots left' };
  }

  return { disabled: false };
};

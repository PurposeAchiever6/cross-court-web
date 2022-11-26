import React from 'react';

import { pluralize } from 'shared/utils/helpers';
import { longSessionDate, hourRange } from 'shared/utils/date';

export const getSessionsMessageContainerText = (
  isSessionComplete,
  isSessionFull,
  isSkillSession,
  isAuthenticated,
  userProfile
) => {
  const {
    activeSubscription,
    totalCredits,
    subscriptionSkillSessionCredits,
    unlimitedCredits,
    unlimitedSkillSessionCredits,
  } = userProfile;

  if (isSessionComplete) {
    return 'SESSION COMPLETE';
  }
  if (isSessionFull) {
    return 'SESSION FULL';
  }

  if (!isAuthenticated) {
    return '';
  }

  if (isSkillSession) {
    if (unlimitedCredits || unlimitedSkillSessionCredits) {
      return 'YOU HAVE UNLIMITED SKLZ SESSIONS';
    }

    const totalSkillSessionCredits = totalCredits + subscriptionSkillSessionCredits;

    return `YOU HAVE ${totalSkillSessionCredits} SKLZ ${pluralize(
      'SESSION',
      totalSkillSessionCredits,
      'S'
    )} LEFT THIS MONTH`;
  }

  if (unlimitedCredits) {
    return 'YOU HAVE UNLIMITED SESSIONS';
  }

  if (totalCredits) {
    return `YOU HAVE ${totalCredits} ${pluralize('SESSION', totalCredits, 'S')} ${
      activeSubscription ? 'LEFT THIS MONTH' : 'AVAILABLE'
    }`;
  }

  return '';
};

export const sessionData = (date, sessionInfo) => [
  { title: 'DATE', value: longSessionDate(date) },
  { title: 'TIME', value: hourRange(sessionInfo.time, sessionInfo.durationMinutes) },
  {
    title: 'LOCATION',
    value: [
      `${sessionInfo?.location?.address}`,
      <br key="br" />,
      `${sessionInfo?.location?.city}, ${sessionInfo?.location?.state} ${sessionInfo?.location?.zipcode}`,
    ],
  },
];

export const sessionGuestsAllowed = (session) => {
  return (
    (session?.isOpenClub || session?.skillSession) && session?.guestsAllowed > 0 && !session?.full
  );
};

export const sessionGuestsAllowedForUser = (session) => {
  const sessionGuests = session?.userSession?.sessionGuests ?? [];

  return sessionGuestsAllowed(session) && session?.guestsAllowedPerUser > sessionGuests.length;
};

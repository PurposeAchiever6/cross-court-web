import React from 'react';
import { longSessionDate, hourRange } from 'shared/utils/date';

export const getSessionsMessageContainerText = (
  isSessionComplete,
  isSessionFull,
  isAuthenticated,
  userProfile
) => {
  let text = '';
  const { totalCredits, activeSubscription, unlimitedCredits } = userProfile;

  if (isSessionComplete) {
    text = `SESSION COMPLETE`;
  } else if (isSessionFull) {
    text = `SESSION FULL`;
  } else {
    if (isAuthenticated) {
      if (unlimitedCredits) {
        text = 'YOU HAVE UNLIMITED SESSIONS';
      } else if (totalCredits) {
        text = `YOU HAVE ${totalCredits} SESSION${totalCredits === 1 ? '' : 'S'} ${
          activeSubscription ? 'LEFT THIS MONTH' : 'AVAILABLE'
        }`;
      }
    }
  }

  return text;
};

export const sessionData = (date, sessionInfo) => [
  { title: 'DATE', value: longSessionDate(date) },
  { title: 'TIME', value: hourRange(sessionInfo.time) },
  {
    title: 'LOCATION',
    value: [
      `${sessionInfo?.location?.address}`,
      <br key="br" />,
      `${sessionInfo?.location?.city}, ${sessionInfo?.location?.state} ${sessionInfo?.location?.zipcode}`,
    ],
  },
];

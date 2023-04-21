import React from 'react';
import dayjs from 'dayjs';

import { titleize } from 'shared/utils/helpers';
import { isUserInLegalAge, userOutsideOfSessionSkillLevel } from 'shared/utils/user';
import { formatSessionDate, longSessionDate, hourRange } from 'shared/utils/date';
import InfoTooltip from 'shared/components/InfoTooltip';

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

  const sessionStartsInHours = parseInt(Math.abs(currentDate - formatedSessionDate) / 36e5, 10);

  if (sessionStartsInHours > 5 && sessionStartsInHours <= 10 && reservationsCount < 5) {
    return true;
  }

  if (sessionStartsInHours > 1 && sessionStartsInHours <= 5 && reservationsCount < 10) {
    return true;
  }

  if (sessionStartsInHours <= 1 && reservationsCount < 13) {
    return true;
  }

  return false;
};

export const validateBooking = (session, currentUser) => {
  const userHasLegalAge = isUserInLegalAge(currentUser);
  const {
    skillLevel,
    allSkillLevelsAllowed,
    membersOnly,
    allowedProducts,
    isOpenClub,
    backToBackRestricted,
  } = session;

  const { activeSubscription, reserveTeam } = currentUser;

  if (!userHasLegalAge) {
    return {
      canBook: false,
      errorTitle: '18+',
      errorDescription: 'Must be 18 or older to book a session.',
    };
  }

  if (activeSubscription?.paused) {
    return {
      canBook: false,
      errorTitle: 'Paused Membership',
      errorDescription: "You can't reserve when your membership is paused.",
    };
  }

  if ((isOpenClub || membersOnly) && !activeSubscription) {
    let errorDescription = 'This session can not be booked.';

    if (allowedProducts) {
      const allowedProductsNames = allowedProducts
        .map((allowedProduct) => titleize(allowedProduct.name))
        .join(' and ');

      errorDescription = `This session can not be booked. ${allowedProductsNames} membership allowed only.`;
    }

    return {
      canBook: false,
      errorTitle: 'Members Only',
      errorDescription,
    };
  }

  if (reserveTeam && !reserveTeamReservationAllowed(session)) {
    return {
      canBook: false,
      errorTitle: 'Reserve Team Restriced',
      errorDescription: 'This session can not be booked by the reserve team.',
    };
  }

  if (!allSkillLevelsAllowed && userOutsideOfSessionSkillLevel(currentUser, session)) {
    return {
      canBook: false,
      errorTitle: 'Outside Skill Level',
      errorDescription: `This session is reserved for level ${skillLevel.min}-${skillLevel.max} players.`,
    };
  }

  if (backToBackRestricted) {
    return {
      canBook: false,
      errorTitle: 'Session Not Available',
      errorDescription:
        'This session is not eligible for back-to-back bookings. Tap Show More to see which sessions are back-to-back eligible.',
    };
  }

  return { canBook: true };
};

export const sessionInformation = (session) => {
  const information = [];

  const {
    isOpenClub,
    costCredits,
    allowBackToBackReservations,
    allSkillLevelsAllowed,
    guestsAllowed,
    ccCashEarned,
  } = session;

  const sessionCcCashEarned = Number(ccCashEarned);

  if (costCredits === 0 || isOpenClub) {
    information.push('No Credit Required');
  }

  if (costCredits > 1) {
    information.push(`${costCredits} Credits Required`);
  }

  if (allowBackToBackReservations) {
    information.push('Back To Back Eligible');
  }

  if (allSkillLevelsAllowed) {
    information.push('All Levels Eligible');
  }

  if (guestsAllowed && guestsAllowed > 0) {
    information.push('Guest Pass Eligible');
  }

  if (sessionCcCashEarned > 0) {
    information.push(
      <>
        Earn ${sessionCcCashEarned}
        <InfoTooltip
          place="bottom"
          info={`Receive $${sessionCcCashEarned} in CC Cash when you attend this session`}
          className="ml-2"
        />
      </>
    );
  }

  return information;
};

export const sessionRestrictions = (session) => {
  const restrictions = [];
  const {
    isOpenClub,
    membersOnly,
    allowedProducts,
    womenOnly,
    backToBackRestricted,
    allSkillLevelsAllowed,
    skillLevel,
    isPrivate,
  } = session;

  if (isOpenClub || membersOnly) {
    if (allowedProducts) {
      const allowedProductsNames = allowedProducts
        .map((allowedProduct) => allowedProduct.name)
        .join(' & ');

      restrictions.push(`${allowedProductsNames} Members Only`);
    } else {
      restrictions.push('Members Only');
    }
  }

  if (womenOnly) {
    restrictions.push('Women Only');
  }

  if (backToBackRestricted) {
    restrictions.push('Back To Back Restricted');
  }

  if (!allSkillLevelsAllowed && skillLevel) {
    restrictions.push(`${skillLevel.name} Players Only`);
  }

  if (isPrivate) {
    restrictions.push('Private');
  }

  return restrictions;
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

export const sessionGuestsAllowed = (session) =>
  (session?.isOpenClub || session?.skillSession) && session?.guestsAllowed > 0 && !session?.full;

export const sessionGuestsAllowedForUser = (session) => {
  const sessionGuests = session?.userSession?.sessionGuests ?? [];

  return sessionGuestsAllowed(session) && session?.guestsAllowedPerUser > sessionGuests.length;
};

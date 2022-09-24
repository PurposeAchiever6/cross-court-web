import dayjs from 'dayjs';

export const reserveTeamReservationAllowed = ({
  sessionTime,
  sessionDate,
  reservationsCount,
  isOpenClub,
  past,
  isReserveTeam,
  isPrivate,
}) => {
  if (isOpenClub || past || !isReserveTeam || isPrivate) {
    return true;
  }

  const currentDate = dayjs().toDate();
  const formatedSessionDate = dayjs(
    `${sessionDate} ${sessionTime.split('T')[1].split('Z')[0]}`,
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

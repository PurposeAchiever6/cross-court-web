export const isUserInFirstFreeSessionFlow = (userProfile) => {
  if (!userProfile) return false;

  const freeSessionNotExpired = new Date(userProfile.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userProfile.freeSessionState === 'not_claimed';

  return freeSessionNotExpired && freeSessionNotClaimed;
};

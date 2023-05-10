import { SIGNUP_STATE_COMPLETED } from 'screens/onboarding/constants';
import { yearsFrom } from 'shared/utils/date';

export const isUserInFirstSessionFlow = (userProfile) => {
  if (!userProfile) return false;

  return !userProfile.hasReserveAnySession;
};

export const isUserInFirstFreeSessionFlow = (userProfile) => {
  if (!userProfile) return false;

  const freeSessionNotExpired = new Date(userProfile.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userProfile.freeSessionState === 'not_claimed';

  return freeSessionNotExpired && freeSessionNotClaimed;
};

export const isUserInLegalAge = (userProfile) => {
  if (!userProfile.birthday) {
    // If user not logged in it should return true
    // If user does not have a birthday value, that means is an old system user
    // who are considered adults
    return true;
  }

  const userAge = yearsFrom(new Date(userProfile.birthday));

  return userAge >= 18;
};

export const userHasCreditsForSession = (userProfile, session) => {
  const { costCredits } = session;

  if (session.isOpenClub) {
    return true;
  }

  if (userProfile.unlimitedCredits || userProfile.totalCredits >= costCredits) {
    return true;
  }

  if (!session.skillSession) {
    return false;
  }

  return (
    userProfile.unlimitedSkillSessionCredits ||
    userProfile.subscriptionSkillSessionCredits >= costCredits
  );
};

export const userOutsideOfSessionSkillLevel = (userProfile, session) => {
  if (!userProfile.skillRating) {
    return false;
  }

  const { skillLevel } = session;
  const userSkillRating = parseInt(userProfile.skillRating, 10);

  return skillLevel && (userSkillRating < skillLevel.min || userSkillRating > skillLevel.max);
};

export const restrictOnboardingAccess = (userProfile) =>
  userProfile.signupState === SIGNUP_STATE_COMPLETED ||
  userProfile.activeSubscription ||
  !isUserInFirstSessionFlow(userProfile);

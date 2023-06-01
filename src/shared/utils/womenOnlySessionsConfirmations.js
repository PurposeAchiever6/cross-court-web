const WOMEN_ONLY_SESSIONS_CONFIRMATIONS_KEY = 'women-only-sessions-confirmations';

const getWomenOnlySessionsConfirmations = () =>
  JSON.parse(localStorage.getItem(WOMEN_ONLY_SESSIONS_CONFIRMATIONS_KEY) || '[]');

const setWomenOnlySessionConfirm = (userId) => {
  localStorage.setItem(
    WOMEN_ONLY_SESSIONS_CONFIRMATIONS_KEY,
    JSON.stringify([...getWomenOnlySessionsConfirmations(), userId])
  );
};

const confirmWomenOnlySessions = (userProfile) => {
  setWomenOnlySessionConfirm(userProfile.id);
};

const hasConfirmWomenOnlySessions = (userProfile) =>
  getWomenOnlySessionsConfirmations().includes(userProfile.id);

export { confirmWomenOnlySessions, hasConfirmWomenOnlySessions };

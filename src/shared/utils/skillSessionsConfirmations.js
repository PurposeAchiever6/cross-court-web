const SKILL_SESSIONS_CONFIRMATIONS_KEY = 'skill-sessions-confirmations';

const getSkillSessionsConfirmations = () =>
  JSON.parse(localStorage.getItem(SKILL_SESSIONS_CONFIRMATIONS_KEY) || '[]');

const setSkillSessionConfirm = (userId) => {
  localStorage.setItem(
    SKILL_SESSIONS_CONFIRMATIONS_KEY,
    JSON.stringify([...getSkillSessionsConfirmations(), userId])
  );
};

const confirmSkillSession = (userProfile) => {
  setSkillSessionConfirm(userProfile.id);
};

const hasConfirmSkillSession = (userProfile) =>
  getSkillSessionsConfirmations().includes(userProfile.id);

export { confirmSkillSession, hasConfirmSkillSession };

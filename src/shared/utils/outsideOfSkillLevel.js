const OUTSIDE_SKILL_LEVEL_KEY = 'outside-skill-level-key';

const getOutsideOfSkillLevelConfirmations = () => {
  return JSON.parse(localStorage.getItem(OUTSIDE_SKILL_LEVEL_KEY) || '[]');
};

const setOutsideOfSkillLevelConfirm = (userId) => {
  localStorage.setItem(
    OUTSIDE_SKILL_LEVEL_KEY,
    JSON.stringify([...getOutsideOfSkillLevelConfirmations(), userId])
  );
};

const confirmOutsideOfSkillLevelSession = (userProfile) => {
  setOutsideOfSkillLevelConfirm(userProfile.id);
};

const hasConfirmOutsideOfSkillLevelSession = (userProfile) => {
  return getOutsideOfSkillLevelConfirmations().includes(userProfile.id);
};

export { confirmOutsideOfSkillLevelSession, hasConfirmOutsideOfSkillLevelSession };

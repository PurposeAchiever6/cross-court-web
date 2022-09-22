const CODE_OF_CONDUCT_KEY = 'code-of-conduct-confirmations';

const getCodeOfConductConfirmations = () =>
  JSON.parse(localStorage.getItem(CODE_OF_CONDUCT_KEY) || '[]');

const setCodeOfConductConfirm = (userId) => {
  localStorage.setItem(
    CODE_OF_CONDUCT_KEY,
    JSON.stringify([...getCodeOfConductConfirmations(), userId])
  );
};

const confirmCodeOfConduct = (userProfile) => {
  setCodeOfConductConfirm(userProfile.id);
};

const hasConfirmCodeOfConduct = (userProfile) =>
  getCodeOfConductConfirmations().includes(userProfile.id);

export { confirmCodeOfConduct, hasConfirmCodeOfConduct };

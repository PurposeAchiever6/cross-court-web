const saveSession = payload => {
  localStorage.setItem('SAVED_SESSION_ID', payload.sessionId);
  localStorage.setItem('SAVED_SESSION_DATE', payload.date);
};

const getSavedSession = () => {
  const SAVED_SESSION_ID = localStorage.getItem('SAVED_SESSION_ID');
  const SAVED_SESSION_DATE = localStorage.getItem('SAVED_SESSION_DATE');

  return {
    id: SAVED_SESSION_ID,
    date: SAVED_SESSION_DATE,
  };
};

const removeSavedSession = () => {
  localStorage.removeItem('SAVED_SESSION_ID');
  localStorage.removeItem('SAVED_SESSION_DATE');
};

export default {
  saveSession,
  getSavedSession,
  removeSavedSession,
};

const USER_SOURCE_KEY = 'user-source';

const getUserSource = () => {
  return localStorage.getItem(USER_SOURCE_KEY);
};

const setUserSource = (source) => {
  localStorage.setItem(USER_SOURCE_KEY, source);
};

const removeUserSource = () => {
  localStorage.removeItem(USER_SOURCE_KEY);
};

export { getUserSource, setUserSource, removeUserSource };

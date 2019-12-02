const setTokens = loginPayload => {
  localStorage.setItem('CLIENT', loginPayload.client);
  localStorage.setItem('UID', loginPayload.uid);
  localStorage.setItem('ACCESS-TOKEN', loginPayload.accessToken);
  localStorage.setItem('isAuthenticated', true);
};

const getTokens = () => {
  const CLIENT = localStorage.getItem('CLIENT');
  const UID = localStorage.getItem('UID');
  const ACCESS_TOKEN = localStorage.getItem('ACCESS-TOKEN');

  return {
    uid: UID,
    client: CLIENT,
    accessToken: ACCESS_TOKEN,
  };
};

export const getHeaders = (extraStuff = {}) => {
  const { uid, client, accessToken } = getTokens();

  const headers = {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    uid,
    client,
    'access-token': accessToken,
  };

  return { ...headers, ...extraStuff };
};

export default {
  setTokens,
  getHeaders,
};

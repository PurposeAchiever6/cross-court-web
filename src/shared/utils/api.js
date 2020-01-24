import AuthUtils from './auth';

export const getHeaders = (extraStuff = {}) => {
  const { uid, client, accessToken } = AuthUtils.getTokens();

  const headers = {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    uid,
    client,
    'access-token': accessToken,
  };

  return { ...headers, ...extraStuff };
};

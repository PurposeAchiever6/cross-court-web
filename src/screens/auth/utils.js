function setTokens(loginPayload) {
  localStorage.setItem('CLIENT', loginPayload.client);
  localStorage.setItem('UID', loginPayload.uid);
  localStorage.setItem('ACCESS-TOKEN', loginPayload.accessToken);
  localStorage.setItem('isAuthenticated', true);
}

export default {
  setTokens,
};

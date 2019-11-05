function setAuthState(state) {
  localStorage.setItem('isAuthenticated', state);
}

function setAuthToken(loginPayload) {
  localStorage.setItem('CLIENT', loginPayload.client);
  localStorage.setItem('UID', loginPayload.uid);
  localStorage.setItem('ACCESS-TOKEN', loginPayload.accessToken);
  return loginPayload ? setAuthState(true) : setAuthState(false);
}

function setLocalStorage(loginPayload) {
  setAuthToken(loginPayload);
}

export default {
  setLocalStorage,
};

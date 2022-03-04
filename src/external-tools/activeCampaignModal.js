import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

if (
  env.REACT_APP_AC_MODAL_ENABLED === 'true' &&
  window.localStorage.getItem('isAuthenticated') !== 'true' &&
  window.localStorage.getItem('hasLoggedIn') !== 'true'
) {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = env.REACT_APP_AC_MODAL_URL;

  document.body.appendChild(script);
}

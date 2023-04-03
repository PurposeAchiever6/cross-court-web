if (
  import.meta.env.VITE_AC_MODAL_ENABLED === 'true' &&
  window.localStorage.getItem('isAuthenticated') !== 'true' &&
  window.localStorage.getItem('hasLoggedIn') !== 'true'
) {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = import.meta.env.VITE_AC_MODAL_URL;

  document.body.appendChild(script);
}

import ROUTES from 'shared/constants/routes';

export const showChatWidget = () => {
  window._chatlio.show();
};

export const hideChatWidget = () => {
  window._chatlio.hide();
};

export const toggleChatWidget = (pathname) => {
  const shouldShowWidget = [
    ROUTES.HOME,
    ROUTES.HOWITWORKS,
    ROUTES.LOCATIONS,
    ROUTES.MEMBERSHIPS,
    ROUTES.SEM,
  ].includes(pathname);

  if (shouldShowWidget) {
    showChatWidget();
  } else {
    hideChatWidget();
  }
};

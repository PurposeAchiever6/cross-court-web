import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import CrossSvg from 'shared/components/svg/CrossSvg';
import Button from 'shared/components/Button';

const BUTTON_ENABLED_ROUTES = [ROUTES.HOME, ROUTES.MEMBERSHIPS, ROUTES.WHY_JOIN];

const ScheduleTourButton = () => {
  const { pathname } = useLocation();
  const scheduleTourLink = import.meta.env.VITE_SCHEDULE_TOUR_LINK;

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);

  const [closeButton, setCloseButton] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const buttonEnabled =
    BUTTON_ENABLED_ROUTES.includes(pathname) &&
    !closeButton &&
    (!isAuthenticated || !currentUser?.hasReserveAnySession);

  useEffect(() => {
    if (!buttonEnabled) {
      return;
    }

    const setScroll = () => {
      const startScroll = window.screen.height * 0.75;
      const endScroll =
        document.body.scrollHeight -
        window.innerHeight -
        document.getElementById('page-footer').clientHeight -
        50;

      setShowButton(window.scrollY > startScroll && window.scrollY < endScroll);
    };

    document.addEventListener('scroll', setScroll);

    return () => {
      document.removeEventListener('scroll', setScroll);
    };
  }, [buttonEnabled]);

  if (!buttonEnabled) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-1/2 translate-y- md:right-5 translate-x-1/2 md:translate-x-0 transition-transform ${
        showButton ? 'duration-500' : 'translate-y-20'
      }`}
    >
      <Button to={scheduleTourLink} isExternal target="_blank">
        Schedule a tour
      </Button>
      <button
        className="absolute -top-1 -right-1 rounded-full p-1 bg-cc-purple-700 hover:bg-cc-purple-900 transition-all"
        onClick={() => setCloseButton(true)}
        type="button"
      >
        <CrossSvg className="w-2" />
      </button>
    </div>
  );
};

export default ScheduleTourButton;

/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initialLoadInit } from 'screens/locations/actionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ROUTES from 'shared/constants/routes';

import { isIOS, isMobileSafari, isChrome, isAndroid } from 'react-device-detect';

const PWAPage = () => {
  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const androidChrome = isAndroid && isChrome;
  const iosSafari = isIOS && isMobileSafari;
  const pwaSupported = androidChrome || iosSafari;
  const pwaAndroidChromeMessage = <span>GO TO SETTINGS AND ADD TO HOME SCREEN</span>;
  const pwaIOSSafariMessage = (
    <span>
      TAP <span className="home-icon" /> AND CLICK "ADD TO HOME SCREEN"
    </span>
  );
  const pwaMessage = pwaSupported
    ? androidChrome
      ? pwaAndroidChromeMessage
      : pwaIOSSafariMessage
    : false;
  const dispatch = useDispatch();
  const history = useHistory();
  const closeHandler = () => {
    history.push(ROUTES.HOME);
  };

  useEffect(() => {
    dispatch(initialLoadInit());

    if (isInstalled || !pwaSupported) {
      history.push(ROUTES.HOME);
    }
  }, [dispatch, history, isInstalled, pwaSupported]);

  return (
    <div className="pwa">
      <FontAwesomeIcon className="close-btn" icon={faTimes} onClick={closeHandler} />
      <div className="install-wrapper">
        <p className="install">INSTALL</p>
        <p className="application">APPLICATION</p>
      </div>
      <p className="message">{pwaMessage}</p>
    </div>
  );
};

export default PWAPage;

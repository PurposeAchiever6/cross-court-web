import React, { useEffect } from 'react';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initialLoadInit } from 'screens/locations/actionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ROUTES from 'shared/constants/routes';

import { isIOS, isMobileSafari, isChrome, isAndroid } from 'react-device-detect';

const PWAPage = () => {
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const closeHandler = () => {
    history.push(ROUTES.HOME);
  };

  useEffect(() => {
    dispatch(initialLoadInit());

    if (isInstalled || (!isIOS && !isAndroid)) {
      history.push(ROUTES.HOME);
    }
  }, []);

  return (
    <div className="pwa">
      <FontAwesomeIcon className="close-btn" icon={faTimes} onClick={closeHandler} />
      <div className="install-wrapper">
        <p className="install">INSTALL</p>
        <p className="application">APPLICATION</p>
      </div>
      <p className="message">{ isIOS && <span>TAP <span className="home-icon"></span> AND</span> } CLICK "ADD TO HOME SCREEN"</p>
    </div>
  );
}

export default PWAPage;
  
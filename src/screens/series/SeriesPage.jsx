import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import FreeSessionBanner from 'shared/components/FreeSessionBanner';
import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { identify, startedCheckout } from 'shared/utils/klaviyo';
import { initialLoad, setSelectedProduct } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import { getSessionInfo } from 'screens/sessions/reducer';

import Plans from './components/Plans';
import Series from './components/Series';

import NoSessionCredits from './components/NoSessionCredits';

const SeriesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const { email } = useSelector(getUserProfile);
  const userProfile = useSelector(getUserProfile);
  const sessionInfo = useSelector(getSessionInfo);

  const selectProductHandler = product => {
    dispatch(setSelectedProduct(product));
    if (isAuthenticated) {
      identify(email);
      startedCheckout(product);
    }
    history.push(ROUTES.PAYMENTS);
  };

  const showAnimation = function() {
    return userProfile.credits === 0 && window.sessionStorage.getItem('previousPage').indexOf('session-') !== -1;
    // let  result = (userProfile.credits === 0 &&
    //   (
    //     (sessionInfo.userSession && ['reserved', 'confirmed'].indexOf(sessionInfo.userSession.state) === -1)
    //   )
    // ) || window.location.search === '?testanimation';
    // console.log('RESULT', result, userProfile.credits, sessionInfo);
    // return result;
    /*window.sessionStorage.getItem('seriesAnimation') === 'true'*/
  };

  useEffect(() => {
    dispatch(initialLoad());

    if (showAnimation()) {
      //window.sessionStorage.removeItem('seriesAnimation');
      document.body.setAttribute('data-page', 'no-session-credits');
      //console.log('DEBUG: series');
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <FreeSessionBanner /> */}
      {showAnimation() && <NoSessionCredits />}
      <Plans selectProductHandler={selectProductHandler} availableProducts={availableProducts} />
      <Series />
    </div>
  );
};

export default SeriesPage;

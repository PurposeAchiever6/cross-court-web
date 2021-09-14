import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { identify, startedCheckout } from 'shared/utils/klaviyo';
import { initialLoad, setSelectedProduct, cancelSubscription } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Plans from './components/Plans';
import FacilityRentals from './components/FacilityRentals';
import NoSessionCredits from './components/NoSessionCredits';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const env = runtimeEnv();
  const APP_URL = env.REACT_APP_URL;

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const cancelSubscriptionAction = async () =>
    dispatch(cancelSubscription(userProfile.activeSubscription));

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));

    if (isAuthenticated) {
      identify(userProfile.email);
      startedCheckout(product, `${APP_URL}${ROUTES.MEMBERSHIPS}`);
    }
    history.push(ROUTES.PAYMENTS);
  };

  const cancelMembership = () => {
    setShowCancelModal(true);
  };

  const showAnimation =
    userProfile.totalCredits === 0 &&
    window.localStorage.getItem('previousPage').indexOf('session-') !== -1;

  useEffect(() => {
    dispatch(initialLoad());
    if (showAnimation) {
      document.body.setAttribute('data-page', 'no-session-credits');
    }
  }, [dispatch, showAnimation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-cc-black">
        <div className="min-h-screen">
          {showAnimation && <NoSessionCredits />}
          <Plans
            selectProductHandler={selectProductHandler}
            cancelMembership={cancelMembership}
            availableProducts={availableProducts}
            activeSubscription={userProfile.activeSubscription}
          />
        </div>
        <FacilityRentals />
      </div>
      <CancelMembershipModal
        cancelSubscriptionAction={cancelSubscriptionAction}
        shouldClose
        isOpen={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        closeHandler={() => setShowCancelModal(false)}
      />
    </>
  );
};

export default ProductsPage;

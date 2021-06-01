import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { identify, startedCheckout } from 'shared/utils/klaviyo';
import { initialLoad, setSelectedProduct, cancelSubscription } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Plans from './components/Plans';
import NoSessionCredits from './components/NoSessionCredits';
import CancelMembershipModal from './components/CancelMembershipModal';

const SeriesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      startedCheckout(product);
    }
    history.push(ROUTES.PAYMENTS);
  };

  const cancelMembership = () => {
    setShowCancelModal(true);
  };

  const showAnimation = () => {
    return (
      userProfile.credits === 0 &&
      window.localStorage.getItem('previousPage').indexOf('session-') !== -1
    );
  };

  useEffect(() => {
    dispatch(initialLoad());
    if (showAnimation()) {
      document.body.setAttribute('data-page', 'no-session-credits');
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-cc-black min-h-screen">
        {showAnimation() && <NoSessionCredits />}
        <Plans
          selectProductHandler={selectProductHandler}
          cancelMembership={cancelMembership}
          availableProducts={availableProducts}
          activeSubscription={userProfile.activeSubscription}
        />
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

export default SeriesPage;

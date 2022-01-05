import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { startedCheckout } from 'shared/utils/activeCampaign';
import {
  initialLoad,
  setSelectedProduct,
  cancelSubscription,
  reactivateSubscription,
} from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Landing from './components/Landing';
import Plans from './components/Plans';
import FAQ from './components/FAQ';
import NoSessionCredits from './components/NoSessionCredits';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';

const ProductsPage = () => {
  const plansRef = useRef(null);
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
      startedCheckout({ email: userProfile.email, product });
    }
    history.push(ROUTES.PAYMENTS);
  };

  const cancelMembership = () => {
    setShowCancelModal(true);
  };

  const reactivateMembership = () => {
    dispatch(reactivateSubscription(userProfile.activeSubscription));
  };

  const scrollToPlans = () => {
    window.scroll({ top: plansRef.current.offsetTop - 50 });
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
      <div className="bg-cc-black border-b border-gray-500">
        {showAnimation && <NoSessionCredits />}
        <Landing scrollToPlans={scrollToPlans} />
        <Plans
          selectProductHandler={selectProductHandler}
          cancelMembership={cancelMembership}
          availableProducts={availableProducts}
          activeSubscription={userProfile.activeSubscription}
          reactivateMembership={reactivateMembership}
          ref={plansRef}
        />
        <FAQ />
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

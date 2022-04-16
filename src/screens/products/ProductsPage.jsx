import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Memberships from './components/Memberships';
import DropIns from './components/DropIns';

import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import ToggleButton from 'shared/components/ToggleButton';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { initialLoad, setSelectedProduct, reactivateSubscription } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';
import Perks from './components/Perks';
import FAQ from './components/FAQ';
import NoSessionCredits from './components/NoSessionCredits';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDropIns, setDropIns] = useState(false);

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));

    if (isAuthenticated) {
      startedCheckout({ email: userProfile.email, product });
    }

    history.push(ROUTES.PAYMENT_METHODS_SELECT);
  };

  const cancelMembership = () => {
    setShowCancelModal(true);
  };

  const reactivateMembership = () => {
    dispatch(reactivateSubscription(userProfile.activeSubscription));
  };

  const showAnimation = state?.showNoCreditsAnimation;

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
      <div className="bg-cc-black border-b border-gray-400 pt-16">
        {showAnimation && <NoSessionCredits />}
        <ToggleButton
          offLabel="Memberships"
          onLabel="A la carte"
          size="4xl"
          value={showDropIns}
          onChange={setDropIns}
          className="w-full mt-4 flex justify-center items-center text-white lg:text-xl"
        />

        {!showDropIns && (
          <Memberships
            selectProductHandler={selectProductHandler}
            cancelMembership={cancelMembership}
            availableProducts={availableProducts}
            activeSubscription={userProfile.activeSubscription}
            reactivateMembership={reactivateMembership}
          />
        )}
        {showDropIns && (
          <DropIns
            selectProductHandler={selectProductHandler}
            cancelMembership={cancelMembership}
            availableProducts={availableProducts}
            activeSubscription={userProfile.activeSubscription}
            reactivateMembership={reactivateMembership}
          />
        )}
        <Perks />
        <div className="w-full flex justify-center mb-16">
          <h2 className="dharma_gothic_cheavy_italic text-6xl lg:text-8xl text-cc-purple">
            HAVE A QUESTION? REACH OUT BELOW
          </h2>
        </div>
        <FAQ />
      </div>
      <CancelMembershipModal
        isOpen={showCancelModal}
        closeHandler={() => setShowCancelModal(false)}
      />
    </>
  );
};

export default ProductsPage;

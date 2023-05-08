/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getAvailableProducts, getPageLoading } from 'screens/products/reducer';
import {
  getShowAddPaymentMethodModal,
  getShowSelectPaymentMethodModal,
} from 'screens/checkout/reducer';
import {
  showAddPaymentMethodModal,
  closeAddPaymentMethodModal,
  showSelectPaymentMethodModal,
  closeSelectPaymentMethodModal,
} from 'screens/checkout/actionCreators';
import { dropInProducts } from 'screens/products/utils';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  initialLoad,
  setSelectedProduct,
  reactivateSubscription,
} from 'screens/products/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Loading from 'shared/components/Loading';
import MembershipIsPausedModal from 'screens/memberships/components/MembershipIsPausedModal';
import Memberships from 'screens/products/components/Memberships';
import ReserveTeamMemberships from 'screens/products/components/reserve-team/Memberships';
import ReserveTeamMembershipsFeatures from 'screens/products/components/reserve-team/MembershipsFeatures';
import MembershipsFeatures from 'screens/products/components/MembershipsFeatures';
import DropIns from 'screens/products/components/DropIns';
import SeasonPass from 'screens/products/components/SeasonPass';
import Scoutings from 'screens/products/components/Scoutings';
import FAQ from 'screens/products/components/FAQ';
import NoSessionCredits from 'screens/products/components/NoSessionCredits';
import NoFreeSessionInformationModal from 'screens/products/components/NoFreeSessionInformationModal';
import EndMembershipModal from 'shared/components/EndMembershipModal';
import SelectPaymentMethodModal from 'screens/checkout/components/SelectPaymentMethodModal';
import PurchaseDetailsModal from 'screens/checkout/components/PurchaseDetailsModal';
import AddPaymentMethodModal from 'screens/checkout/components/AddPaymentMethodModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const addPaymentMethodModalOpen = useSelector(getShowAddPaymentMethodModal);
  const selectPaymentMethodModalOpen = useSelector(getShowSelectPaymentMethodModal);
  const { activeSubscription, reserveTeam } = userProfile;

  const showNoFreeSessionInformation = state?.showNoFreeSessionInformation;
  const showAnimation = state?.showNoCreditsAnimation;
  const comesFromCancelModal = state?.comesFromCancelModal;
  const showScouting = state?.showScouting;
  const priceForFirstTimersNoFreeSession =
    dropInProducts(availableProducts)[0]?.priceForFirstTimersNoFreeSession;

  const [showEndMembershipModal, setShowEndMembershipModal] = useState(false);
  const [showNoFreeSessionInformationModal, setShowNoFreeSessionInformationModal] = useState(
    !!showNoFreeSessionInformation
  );
  const [showMembershipIsPausedModal, setShowMembershipIsPausedModal] = useState(false);
  const [showPurchaseDetailsModal, setShowPurchaseDetailsModal] = useState(false);

  const showMemberships = !comesFromCancelModal && !showScouting;

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));

    if (isAuthenticated) {
      startedCheckout({ email: userProfile.email, product });
    }

    dispatch(showSelectPaymentMethodModal());
  };

  const selectProductDropInHandler = (product) => {
    const subscriptionPaused = activeSubscription?.paused;

    if (subscriptionPaused) {
      setShowMembershipIsPausedModal(true);
    } else {
      selectProductHandler(product);
    }
  };

  const cancelMembership = () => {
    setShowEndMembershipModal(true);
  };

  const reactivateMembership = () => {
    dispatch(reactivateSubscription(activeSubscription));
  };

  const onSubmit = (isActiveSubscription, product) => {
    if (isActiveSubscription) {
      activeSubscription.canceled ? reactivateMembership() : cancelMembership();
    } else {
      selectProductHandler(product);
    }
  };

  const getSubmitText = (isActiveSubscription, activeSubscription) => {
    if (isActiveSubscription) {
      return activeSubscription.canceled ? 'Reactivate' : 'Cancel';
    }

    return activeSubscription ? 'Select' : 'Join';
  };

  useEffect(() => {
    dispatch(initialLoad());
    if (showAnimation) {
      document.body.setAttribute('data-page', 'no-session-credits');
    }
  }, [dispatch, showAnimation]);

  useEffect(() => {
    if (comesFromCancelModal) {
      window.scrollTo({ top: 0 });
    }
  }, [comesFromCancelModal]);

  if (isLoading) {
    return <Loading />;
  }

  const pageTitle = (() => {
    if (comesFromCancelModal) {
      return 'Season Pass';
    }

    if (showScouting) {
      return 'Player Evaluation';
    }

    if (reserveTeam) {
      return 'Reserve Team Memberships';
    }

    return 'Memberships';
  })();

  return (
    <>
      <PageLayout>
        {showAnimation && <NoSessionCredits />}
        <SectionLayout className="md:mt-12 mb-24">
          <h2 className="font-shapiro95_super_wide uppercase text-3xl sm:text-4xl mb-6 sm:mb-10">
            {pageTitle}
          </h2>
          <div className="flex flex-col lg:flex-row">
            {comesFromCancelModal && (
              <SeasonPass
                selectProductHandler={selectProductHandler}
                availableProducts={availableProducts}
              />
            )}
            {showScouting && (
              <Scoutings
                selectProductHandler={selectProductHandler}
                availableProducts={availableProducts}
              />
            )}
            {showMemberships && (
              <>
                <DropIns
                  selectProductHandler={selectProductDropInHandler}
                  availableProducts={availableProducts}
                />
                {reserveTeam ? (
                  <ReserveTeamMemberships
                    onSubmit={onSubmit}
                    availableProducts={availableProducts}
                    activeSubscription={activeSubscription}
                    getSubmitText={getSubmitText}
                  />
                ) : (
                  <Memberships
                    onSubmit={onSubmit}
                    availableProducts={availableProducts}
                    activeSubscription={activeSubscription}
                    getSubmitText={getSubmitText}
                  />
                )}
              </>
            )}
          </div>
        </SectionLayout>
        {showMemberships && (
          <>{reserveTeam ? <ReserveTeamMembershipsFeatures /> : <MembershipsFeatures />}</>
        )}
        {showMemberships && <FAQ />}
      </PageLayout>
      <MembershipIsPausedModal
        isOpen={showMembershipIsPausedModal}
        closeHandler={() => setShowMembershipIsPausedModal(false)}
      />
      <EndMembershipModal
        isOpen={showEndMembershipModal}
        closeHandler={() => setShowEndMembershipModal(false)}
      />
      <NoFreeSessionInformationModal
        price={priceForFirstTimersNoFreeSession}
        isOpen={showNoFreeSessionInformationModal}
        closeHandler={() => setShowNoFreeSessionInformationModal(false)}
      />
      <SelectPaymentMethodModal
        isOpen={selectPaymentMethodModalOpen}
        closeHandler={() => dispatch(closeSelectPaymentMethodModal())}
        openPurchaseDetailsModal={() => setShowPurchaseDetailsModal(true)}
        openAddPaymentMethodModal={() => dispatch(showAddPaymentMethodModal())}
      />
      <PurchaseDetailsModal
        isOpen={showPurchaseDetailsModal}
        closeHandler={() => setShowPurchaseDetailsModal(false)}
      />
      <AddPaymentMethodModal
        isOpen={addPaymentMethodModalOpen}
        closeHandler={() => dispatch(closeAddPaymentMethodModal())}
        openSelectPaymentMethodModal={() => dispatch(showSelectPaymentMethodModal())}
      />
    </>
  );
};

export default ProductsPage;

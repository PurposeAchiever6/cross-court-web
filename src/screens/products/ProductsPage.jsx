/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getAvailableProducts, getPageLoading } from 'screens/products/reducer';
import { dropInProducts, thisYearFreeFinishedSubscriptionPauses } from 'screens/products/utils';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  initialLoad,
  setSelectedProduct,
  reactivateSubscription,
  pauseSubscription,
} from 'screens/products/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import MembershipIsPausedModal from 'screens/memberships/components/MembershipIsPausedModal';
import PauseMembershipModal from 'screens/memberships/components/PauseMembershipModal';
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

const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const { activeSubscription, reserveTeam } = userProfile;

  const showNoFreeSessionInformation = state?.showNoFreeSessionInformation;
  const showAnimation = state?.showNoCreditsAnimation;
  const comesFromCancelModal = state?.comesFromCancelModal;
  const showScouting = state?.showScouting;
  const priceForFirstTimersNoFreeSession =
    dropInProducts(availableProducts)[0]?.priceForFirstTimersNoFreeSession;

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showNoFreeSessionInformationModal, setShowNoFreeSessionInformationModal] = useState(
    !!showNoFreeSessionInformation
  );

  const [showMembershipIsPausedModal, setShowMembershipIsPausedModal] = useState(false);

  const showMemberships = !comesFromCancelModal && !showScouting;
  const canFreePause = activeSubscription?.canFreePause;
  const thisYearFreeFinishedPauses = thisYearFreeFinishedSubscriptionPauses(activeSubscription);

  const pauseSubscriptionAction = (reason) =>
    dispatch(pauseSubscription(activeSubscription, reason));

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));

    if (isAuthenticated) {
      startedCheckout({ email: userProfile.email, product });
    }

    history.push(ROUTES.PAYMENT_METHODS_SELECT);
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
    setShowCancelModal(true);
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
      <CancelMembershipModal
        isOpen={showCancelModal}
        closeHandler={() => setShowCancelModal(false)}
        activeSubscription={activeSubscription}
        setShowPauseModal={setShowPauseModal}
      />
      <NoFreeSessionInformationModal
        price={priceForFirstTimersNoFreeSession}
        isOpen={showNoFreeSessionInformationModal}
        closeHandler={() => setShowNoFreeSessionInformationModal(false)}
      />
      <PauseMembershipModal
        isOpen={showPauseModal}
        closeHandler={() => setShowPauseModal(false)}
        activeSubscription={activeSubscription}
        pauseSubscriptionAction={pauseSubscriptionAction}
        canFreePause={canFreePause}
        thisYearFreeFinishedPauses={thisYearFreeFinishedPauses}
      />
    </>
  );
};

export default ProductsPage;

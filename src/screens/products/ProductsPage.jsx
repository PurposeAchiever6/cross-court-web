/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getAvailableProducts, getPageLoading } from 'screens/products/reducer';
import { thisYearFreeFinishedSubscriptionPauses } from 'screens/products/utils';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  initialLoad,
  setSelectedProduct,
  reactivateSubscription,
  pauseSubscription,
} from 'screens/products/actionCreators';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import MembershipsFeatures from 'shared/components/MembershipsFeatures';
import VideoPlayer from 'shared/components/VideoPlayer';
import MembershipIsPausedModal from 'screens/memberships/components/MembershipIsPausedModal';
import PauseMembershipModal from 'screens/memberships/components/PauseMembershipModal';

import Memberships from './components/Memberships';
import ReserveTeamMemberships from './components/reserve-team/Memberships';
import ReserveTeamMembershipsFeatures from './components/reserve-team/MembershipsFeatures';
import DropIns from './components/DropIns';
import SeasonPass from './components/SeasonPass';
import Scoutings from './components/Scoutings';
import FAQ from './components/FAQ';
import NoSessionCredits from './components/NoSessionCredits';
import NoFreeSessionInformationModal from './components/NoFreeSessionInformationModal';

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

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const [showNoFreeSessionInformationModal, setShowNoFreeSessionInformationModal] = useState(
    !!showNoFreeSessionInformation
  );

  const [showMembershipIsPausedModal, setShowMembershipIsPausedModal] = useState(false);

  const showMemberships = !comesFromCancelModal && !showScouting;
  const canFreePause = activeSubscription?.canFreePause;
  const thisYearFreeFinishedPauses = thisYearFreeFinishedSubscriptionPauses(activeSubscription);

  const pauseSubscriptionAction = (months, reason) =>
    dispatch(pauseSubscription(activeSubscription, months, reason));

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

  return (
    <>
      <div className="bg-cc-black pt-16 pb-10">
        {showAnimation && <NoSessionCredits />}
        <div className="flex flex-col lg:flex-row p-4">
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
        {showMemberships && (
          <>
            {reserveTeam ? (
              <ReserveTeamMembershipsFeatures setWatchVideo={setWatchVideo} />
            ) : (
              <MembershipsFeatures setWatchSkillsVideo={setWatchVideo} />
            )}
          </>
        )}
        {showMemberships && <FAQ />}
      </div>
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
      <VideoPlayer
        url="/skill-sessions.mp4"
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => setWatchVideo(false)}
      />
    </>
  );
};

export default ProductsPage;

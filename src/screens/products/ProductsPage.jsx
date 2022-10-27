/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getAvailableProducts, getPageLoading } from 'screens/products/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  initialLoad,
  setSelectedProduct,
  reactivateSubscription,
} from 'screens/products/actionCreators';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import MembershipsFeatures from 'shared/components/MembershipsFeatures';
import VideoPlayer from 'shared/components/VideoPlayer';

import Memberships from './components/Memberships';
import ReserveTeamMemberships from './components/reserve-team/Memberships';
import ReserveTeamMembershipsFeatures from './components/reserve-team/MembershipsFeatures';
import DropIns from './components/DropIns';
import SessionPassPacks from './components/season-pass/SeasonPassPacks';
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

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const [showNoFreeSessionInformationModal, setShowNoFreeSessionInformationModal] = useState(
    !!showNoFreeSessionInformation
  );

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-cc-black pt-16 pb-10">
        {showAnimation && <NoSessionCredits />}
        <div className="flex flex-col lg:flex-row p-4">
          {comesFromCancelModal ? (
            <SessionPassPacks
              selectProductHandler={selectProductHandler}
              availableProducts={availableProducts}
            />
          ) : (
            <>
              <DropIns
                selectProductHandler={selectProductHandler}
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
        {!comesFromCancelModal && (
          <>
            {reserveTeam ? (
              <ReserveTeamMembershipsFeatures setWatchVideo={setWatchVideo} />
            ) : (
              <MembershipsFeatures setWatchSkillsVideo={setWatchVideo} />
            )}
          </>
        )}
        <FAQ />
      </div>
      <CancelMembershipModal
        isOpen={showCancelModal}
        closeHandler={() => setShowCancelModal(false)}
        activeSubscription={activeSubscription}
      />
      <NoFreeSessionInformationModal
        isOpen={showNoFreeSessionInformationModal}
        closeHandler={() => setShowNoFreeSessionInformationModal(false)}
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

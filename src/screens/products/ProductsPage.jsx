import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import {
  getAvailableProducts,
  getPageLoading,
  getRecurringProducts,
  getTrialProducts,
} from 'screens/products/reducer';
import {
  getShowAddPaymentMethodModal,
  getShowSelectPaymentMethodModal,
} from 'screens/checkout/reducer';
import {
  selectProduct,
  setPromoCodeInit,
  showAddPaymentMethodModal,
  closeAddPaymentMethodModal,
  showSelectPaymentMethodModal,
  closeSelectPaymentMethodModal,
} from 'screens/checkout/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import { initialLoad } from 'screens/products/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Loading from 'shared/components/Loading';
import MembershipIsPausedModal from 'screens/memberships/components/MembershipIsPausedModal';
import Memberships from 'screens/products/components/Memberships';
import ReserveTeamMemberships from 'screens/products/components/reserve-team/Memberships';
import ReserveTeamMembershipsFeatures from 'screens/products/components/reserve-team/MembershipsFeatures';
import DropIns from 'screens/products/components/DropIns';
import SeasonPass from 'screens/products/components/SeasonPass';
import Scoutings from 'screens/products/components/Scoutings';
import FAQ from 'screens/products/components/FAQ';
import AmenitiesAndFeatures from 'screens/products/components/AmenitiesAndFeatures';
import NoSessionCredits from 'screens/products/components/NoSessionCredits';
import SelectPaymentMethodModal from 'screens/checkout/components/SelectPaymentMethodModal';
import PurchaseDetailsModal from 'screens/checkout/components/PurchaseDetailsModal';
import AddPaymentMethodModal from 'screens/checkout/components/AddPaymentMethodModal';
import triangleTexture from 'screens/products/images/triangle-texture.png';
import Link from 'shared/components/Link';
import CompareMembershipsTable from 'screens/products/components/CompareMembershipsTable';
import ArrowPointDownSvg from 'shared/components/svg/ArrowPointDownSvg';
import { findMostExpensiveProduct } from 'screens/products/utils';
import Trials from './components/Trials';
import { isTrial } from './utils';
import ScheduleTour from './components/ScheduleTour';

const ProductsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const compareMembershipsTableRef = useRef(null);
  const amenitiesAndFeaturesRef = useRef(null);

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const addPaymentMethodModalOpen = useSelector(getShowAddPaymentMethodModal);
  const selectPaymentMethodModalOpen = useSelector(getShowSelectPaymentMethodModal);
  const recurringProducts = useSelector(getRecurringProducts);
  const trialProducts = useSelector(getTrialProducts);
  const { activeSubscription, reserveTeam } = userProfile;

  const showAnimation = state?.showNoCreditsAnimation;
  const comesFromCancelModal = state?.comesFromCancelModal;
  const showScouting = state?.showScouting;

  const [showMembershipIsPausedModal, setShowMembershipIsPausedModal] = useState(false);
  const [showPurchaseDetailsModal, setShowPurchaseDetailsModal] = useState(false);

  const showMemberships = !comesFromCancelModal && !showScouting;

  const mostExpensiveProduct = findMostExpensiveProduct(recurringProducts);

  const productsToShow = isAuthenticated
    ? recurringProducts
    : recurringProducts.filter((product) => product.id !== mostExpensiveProduct.id);

  const selectProductHandler = (product) => {
    if (!isAuthenticated) {
      history.push(ROUTES.SIGNUP);
      return;
    }

    dispatch(selectProduct({ product }));

    if (!product.trial && product.promoCode?.validForUser) {
      dispatch(setPromoCodeInit({ promoCode: product.promoCode.code, product }));
    }

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

  const onSubmit = (isActiveSubscription, product) => {
    if (isActiveSubscription) {
      history.push(ROUTES.MANAGE_MEMBERSHIP);
    } else {
      selectProductHandler(product);
    }
  };

  const getSubmitText = (isActiveSubscription, activeSubscription, product = null) => {
    if (isTrial(product)) {
      return 'Buy';
    }

    if (isActiveSubscription) {
      return activeSubscription.canceled ? 'Reactivate' : 'Cancel';
    }

    if (activeSubscription) {
      if (product) {
        return Number(activeSubscription.product.price) > Number(product.price)
          ? 'Downgrade'
          : 'Upgrade';
      }

      return activeSubscription ? 'Select' : 'Join';
    }

    return 'Join';
  };

  const scrollIntoRef = (ref) => {
    // We subtract 80 because of the header
    window.scrollTo({ top: ref.current.offsetTop - 80, behavior: 'smooth' });
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

  const pageDescription = (() => {
    if (comesFromCancelModal || showScouting || reserveTeam) {
      return;
    }

    return (
      'All memberships are designed to help you connect, create, and compete in the pursuit of ' +
      'progress. Each tier comes with full access to the club during operating hours, access ' +
      'to all physical and digital community experiences, and a number of other perks limited ' +
      'to Crosscourt members.'
    );
  })();

  return (
    <>
      <PageLayout noPadding className="relative">
        {showAnimation && <NoSessionCredits />}
        <SectionLayout className="relative mb-12 md:mb-24 pt-24 md:pt-28">
          <img
            className="scale-[2.5] md:scale-100 top-36 -left-48 bottom-0 inset-x-0 md:inset-0 absolute"
            src={triangleTexture}
            alt="triangle-texture"
          />
          <div className="relative">
            <div className="lg:flex sm:justify-between mb-6 lg:mb-10">
              <div>
                <h2 className="font-shapiro95_super_wide text-3xl sm:text-4xl">{pageTitle}</h2>
                {pageDescription && (
                  <p className="text-sm max-w-3xl mt-6 md:mt-2">{pageDescription}</p>
                )}
              </div>
              {showMemberships && (
                <div className="flex lg:block mt-6 lg:mt-2">
                  <Link
                    variant="white"
                    onClick={() => scrollIntoRef(compareMembershipsTableRef)}
                    className="font-shapiro95_super_wide text-xs flex lg:justify-end items-center mb-1 mr-4 lg:mr-0"
                  >
                    Compare
                    <ArrowPointDownSvg className="w-3 sm:w-5 ml-1 text-cc-purple" />
                  </Link>
                  <Link
                    variant="white"
                    onClick={() => scrollIntoRef(amenitiesAndFeaturesRef)}
                    className="font-shapiro95_super_wide text-xs flex lg:justify-end items-center"
                  >
                    Amenities
                    <ArrowPointDownSvg className="w-3 sm:w-5 ml-1 text-cc-purple" />
                  </Link>
                </div>
              )}
            </div>
            <div className="md:flex">
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
                <div className="flex flex-col">
                  {reserveTeam ? (
                    <ReserveTeamMemberships
                      onSubmit={onSubmit}
                      availableProducts={availableProducts}
                      activeSubscription={activeSubscription}
                      getSubmitText={getSubmitText}
                    />
                  ) : (
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 items-end">
                      {!isAuthenticated && (
                        <Trials
                          onSubmit={onSubmit}
                          availableProducts={trialProducts}
                          activeSubscription={activeSubscription}
                          getSubmitText={getSubmitText}
                        />
                      )}
                      <Memberships
                        onSubmit={onSubmit}
                        availableProducts={productsToShow}
                        activeSubscription={activeSubscription}
                        getSubmitText={getSubmitText}
                      />
                    </div>
                  )}
                  {isAuthenticated ? (
                    <DropIns
                      selectProductHandler={selectProductDropInHandler}
                      availableProducts={availableProducts}
                    />
                  ) : (
                    <ScheduleTour />
                  )}
                  <div className="text-center">
                    <span>Cancel anytime.</span>
                    <span className="block text-xs">
                      <Link to={ROUTES.TERMS}>Terms and conditions</Link> apply.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionLayout>
        {showMemberships && reserveTeam && <ReserveTeamMembershipsFeatures />}
        {showMemberships && (
          <>
            <div ref={compareMembershipsTableRef}>
              <SectionLayout className="mb-12 md:mb-24">
                <CompareMembershipsTable
                  products={[...(isAuthenticated ? [] : trialProducts), ...productsToShow]}
                />
              </SectionLayout>
            </div>
            <div ref={amenitiesAndFeaturesRef}>
              <AmenitiesAndFeatures />
            </div>
            <FAQ />
          </>
        )}
      </PageLayout>
      <MembershipIsPausedModal
        isOpen={showMembershipIsPausedModal}
        closeHandler={() => setShowMembershipIsPausedModal(false)}
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

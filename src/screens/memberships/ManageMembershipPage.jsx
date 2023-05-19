import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ExpandedLayout from 'shared/components/layout/ExpandedLayout';

import ROUTES from 'shared/constants/routes';
import { subscriptionPeriodFormattedDate, shortMonthDayFullYear } from 'shared/utils/date';
import Loading from 'shared/components/Loading';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import {
  cancelPauseSubscription,
  unpauseSubscription,
  reactivateSubscription,
} from 'screens/products/actionCreators';
import { creditsString } from 'screens/products/utils';
import { getUnpauseLoading, getReactivateLoading } from 'screens/products/reducer';
import UnpauseMembershipModal from 'screens/memberships/components/UnpauseMembershipModal';
import Button from 'shared/components/Button';
import manageMembershipImg from 'screens/memberships/images/manage-membership.jpg';
import { pluralize } from 'shared/utils/helpers';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import trustTheProgressShapeImg from 'shared/images/trust-the-progress-shape.png';
import EndMembershipModal from 'shared/components/EndMembershipModal';

const ManageMembershipPage = () => {
  const { activeSubscription } = useSelector(getUserProfile);
  const unpauseLoading = useSelector(getUnpauseLoading);
  const reactivateLoading = useSelector(getReactivateLoading);

  const loading = useSelector(getPageLoading);
  const dispatch = useDispatch();
  const [showUnpauseModal, setShowUnpauseModal] = useState(false);
  const [showEndMembershipModal, setShowEndMembershipModal] = useState(false);

  const active = !activeSubscription?.canceled;
  const paused = activeSubscription?.paused;
  const product = activeSubscription?.product;
  const willPause = activeSubscription?.willPause;

  const productsCreditsString = creditsString(product?.credits);

  const cancelPauseSubscriptionAction = () => dispatch(cancelPauseSubscription(activeSubscription));
  const unpauseSubscriptionAction = () => dispatch(unpauseSubscription(activeSubscription));
  const reactivateSubscriptionAction = () => {
    dispatch(reactivateSubscription(activeSubscription));
  };

  const statusText = (() => {
    if (paused) {
      return (
        <>
          <span className="mb-2 block">
            Your membership is currently <span className="text-notice font-bold">paused</span>
          </span>
          until {subscriptionPeriodFormattedDate(activeSubscription?.pausedUntil)}.
        </>
      );
    }

    if (willPause) {
      return (
        <>
          <span className="mb-2 block">
            Your membership will be <span className="text-notice font-bold">paused</span>
          </span>
          from {subscriptionPeriodFormattedDate(activeSubscription?.pausedFrom)} until{' '}
          {subscriptionPeriodFormattedDate(activeSubscription?.pausedUntil)}.
        </>
      );
    }

    if (active) {
      return 'Pause or cancel your membership';
    }

    return (
      <>
        <span className="mb-2 block">
          Your membership will be <span className="text-warning font-bold">canceled</span> on{' '}
          {subscriptionPeriodFormattedDate(activeSubscription.currentPeriodEnd)}.
        </span>
        You can reactivate your membership anytime until then.
      </>
    );
  })();

  const actionButton = (() => {
    if (paused) {
      return (
        <Button
          className="w-full"
          onClick={() => setShowUnpauseModal(true)}
          loading={unpauseLoading}
        >
          Unpause
        </Button>
      );
    }

    if (willPause) {
      return (
        <Button className="w-full" onClick={() => cancelPauseSubscriptionAction()}>
          Cancel Pause
        </Button>
      );
    }

    if (active) {
      return (
        <Button className="w-full" onClick={() => setShowEndMembershipModal(true)}>
          End Membership
        </Button>
      );
    }

    return (
      <Button
        className="w-full"
        onClick={() => reactivateSubscriptionAction()}
        loading={reactivateLoading}
      >
        Reactivate
      </Button>
    );
  })();

  if (loading) {
    return <Loading />;
  }

  if (!activeSubscription) {
    return <Redirect to={ROUTES.MYACCOUNT} />;
  }

  return (
    <>
      <PageLayout>
        <SectionLayout className="mb-28">
          <h2 className="font-shapiro95_super_wide text-3xl md:text-5xl mb-12">Manage</h2>
          <div className="md:flex border border-white/30">
            <div className="flex flex-col justify-between md:w-1/3 p-4 border-b md:border-r md:border-b-0 border-white/30 min-h-[12rem]">
              <div>
                <span className="font-shapiro95_super_wide text-lg mb-2 block">Billing</span>
                <span className="block mb-2">Current Membership ${product?.price} + tax.</span>
                <span className="block">
                  Next bill due: {shortMonthDayFullYear(activeSubscription.currentPeriodEnd)}.
                </span>
              </div>
              <Button className="w-full" to={ROUTES.SETTINGS_BILLING}>
                EDIT CARDS
              </Button>
            </div>
            <div className="flex flex-col justify-between md:w-1/3 p-4 border-b md:border-r md:border-b-0 border-white/30 min-h-[12rem]">
              <div>
                <span className="font-shapiro95_super_wide text-lg mb-2 block">Current Plan</span>
                <span className="block mb-2">{product?.name}</span>
                <span className="block mb-4">
                  {productsCreditsString} {pluralize('credit', product?.credits)}/month.
                </span>
              </div>
              <Button className="w-full" to={ROUTES.MEMBERSHIPS}>
                CHANGE PLAN
              </Button>
            </div>
            <div className="flex flex-col justify-between md:w-1/3 p-4 min-h-[12rem]">
              <div>
                <span className="font-shapiro95_super_wide text-lg mb-2 block">Status</span>
                <span className="block mb-4">{statusText}</span>
              </div>
              {actionButton}
            </div>
          </div>
        </SectionLayout>
        <SectionLayout className="mx-auto">
          <ExpandedLayout mdBreakpoint={false} lgBreakpoint={false} xlBreakpoint={false}>
            <LazyBackgroundImage
              img={manageMembershipImg}
              className="relative bg-no-repeat bg-cover object-center bg-center min-h-[50rem]"
            >
              <img
                alt="trust-the-progress-shape-img"
                src={trustTheProgressShapeImg}
                className="absolute -top-16 right-20 md:right-52 max-w-2xs"
              />
            </LazyBackgroundImage>
          </ExpandedLayout>
        </SectionLayout>
      </PageLayout>
      <EndMembershipModal
        isOpen={showEndMembershipModal}
        closeHandler={() => setShowEndMembershipModal(false)}
      />
      <UnpauseMembershipModal
        isOpen={showUnpauseModal}
        closeHandler={() => setShowUnpauseModal(false)}
        unpauseSubscriptionAction={unpauseSubscriptionAction}
      />
    </>
  );
};

ManageMembershipPage.defaultProps = {};

ManageMembershipPage.propTypes = {};

export default ManageMembershipPage;

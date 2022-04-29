import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import PauseMembershipModal from './components/PauseMembershipModal';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { pauseSubscription, cancelPauseSubscription } from 'screens/products/actionCreators';

const ManageMembershipPage = () => {
  const { activeSubscription } = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const active = !activeSubscription?.canceled;
  const paused = activeSubscription?.paused;
  const product = activeSubscription?.product;
  const willPause = activeSubscription?.willPause;
  const canPause = active && activeSubscription?.canPause;

  const pauseSubscriptionAction = (months) =>
    dispatch(pauseSubscription(activeSubscription, months));
  const cancelPauseSubscriptionAction = () => dispatch(cancelPauseSubscription(activeSubscription));

  if (loading) {
    return <Loading />;
  }

  if (!activeSubscription) {
    return <Redirect to={ROUTES.MYACCOUNT} />;
  }

  return (
    <div className="min-h-screen p-12">
      <h1 className="font-shapiro95_super_wide text-3xl text-cc-black uppercase mb-6">
        Membership
      </h1>

      <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase">Status</h3>
      {active ? (
        <>
          <p className="mb-1 capitalize">{activeSubscription?.status}</p>
          {paused && (
            <p className="mb-8">{`Your membership is paused until ${subscriptionPeriodFormattedDate(
              activeSubscription?.pausedUntil
            )}.`}</p>
          )}

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase">Billing</h3>
          <div className="mb-3">
            {!paused &&
              `Your current membership price is $${
                product.price
              } + tax and your next bill is due on ${subscriptionPeriodFormattedDate(
                activeSubscription.currentPeriodEnd
              )}.`}
          </div>
          <PrimaryButton
            fontSize="0.75rem"
            className="block mb-8 w-max"
            to={ROUTES.PAYMENT_METHODS_MEMBERSHIP}
          >
            Edit
          </PrimaryButton>

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase">
            Current Membership
          </h3>
          <div className="mb-2">{`${product?.name}/month`}</div>
          <PrimaryButton fontSize="0.75rem" className="w-max block mb-8" to={ROUTES.MEMBERSHIPS}>
            Change Membership
          </PrimaryButton>

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase mb-3">
            Manage Membership
          </h3>
          <div className="flex flex-col w-max items-start">
            {willPause ? (
              <PrimaryButton
                className="mb-1"
                fontSize="0.75rem"
                onClick={() => cancelPauseSubscriptionAction()}
              >
                Cancel pause
              </PrimaryButton>
            ) : (
              <PrimaryButton
                className="mb-1"
                fontSize="0.75rem"
                onClick={() => setShowPauseModal(true)}
                disabled={!canPause || paused}
              >
                Pause Membership
              </PrimaryButton>
            )}
            {!canPause && !willPause && (
              <p className="mb-2">You can't pause your membership anymore for this year.</p>
            )}
            {willPause && (
              <p className="mb-2">{`Your membership will be paused from ${subscriptionPeriodFormattedDate(
                activeSubscription?.pausedFrom
              )} until ${subscriptionPeriodFormattedDate(activeSubscription?.pausedUntil)}`}</p>
            )}
            <PrimaryButton
              className="mt-1"
              inverted
              fontSize="0.75rem"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Membership
            </PrimaryButton>
          </div>
          <CancelMembershipModal
            isOpen={showCancelModal}
            closeHandler={() => setShowCancelModal(false)}
          />
          <PauseMembershipModal
            isOpen={showPauseModal}
            closeHandler={() => setShowPauseModal(false)}
            activeSubscription={activeSubscription}
            pauseSubscriptionAction={pauseSubscriptionAction}
          />
        </>
      ) : (
        <>
          <div className="mb-1">Canceled</div>
          <div className="mb-8">
            {`Billing period ends on ${subscriptionPeriodFormattedDate(
              activeSubscription.currentPeriodEnd
            )}.`}
            <br />
            Your membership can be reactivated at any point prior to that date.
          </div>
          <PrimaryButton fontSize="0.75rem" to={ROUTES.MEMBERSHIPS}>
            Reactivate
          </PrimaryButton>
        </>
      )}
    </div>
  );
};

ManageMembershipPage.defaultProps = {};

ManageMembershipPage.propTypes = {};

export default ManageMembershipPage;

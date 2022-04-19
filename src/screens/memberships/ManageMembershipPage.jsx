import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';

const ManageMembershipPage = () => {
  const { activeSubscription } = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const active = !activeSubscription?.canceled;
  const product = activeSubscription?.product;

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
          <div className="mb-8">Active</div>

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase">Billing</h3>
          <div className="mb-3">
            {`Your current membership price is $${
              product.price
            } + tax and your next bill is due on ${subscriptionPeriodFormattedDate(
              activeSubscription.currentPeriodEnd
            )}.`}
          </div>
          <PrimaryButton
            fontSize="0.75rem"
            className="block mb-8"
            to={ROUTES.PAYMENT_METHODS_MEMBERSHIP}
          >
            Edit
          </PrimaryButton>

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase">
            Current Membership
          </h3>
          <div className="mb-2">{`${product?.name}/month`}</div>
          <PrimaryButton fontSize="0.75rem" className="block mb-8" to={ROUTES.MEMBERSHIPS}>
            Change Membership
          </PrimaryButton>

          <h3 className="font-shapiro95_super_wide text-xl text-cc-black uppercase mb-3">
            Manage Membership
          </h3>
          <PrimaryButton inverted fontSize="0.75rem" onClick={() => setShowCancelModal(true)}>
            cancel membership
          </PrimaryButton>
          <CancelMembershipModal
            isOpen={showCancelModal}
            closeHandler={() => setShowCancelModal(false)}
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

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Loading from 'shared/components/Loading';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { cancelSubscription } from 'screens/products/actionCreators';

const ManageMembershipPage = () => {
  const dispatch = useDispatch();

  const { activeSubscription } = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (!activeSubscription) {
    return <Redirect to={ROUTES.MYACCOUNT} />;
  }

  const active = !activeSubscription.canceled;
  const product = activeSubscription.product;

  const cancelSubscriptionAction = async () => dispatch(cancelSubscription(activeSubscription));

  return (
    <>
      <div className="flex flex-col p-12 min-h-screen">
        <h1 className="uppercase font-shapiro95_super_wide text-3xl text-cc-black mb-6">
          Membership
        </h1>

        <h3 className="uppercase font-shapiro95_super_wide text-xl text-cc-black">status</h3>
        <p className="mb-8">{active ? 'Active' : 'Canceled'}</p>

        {active ? (
          <>
            <h3 className="uppercase font-shapiro95_super_wide text-xl text-cc-black">billing</h3>
            <p className="mb-8">
              {`Your current membership price is $${
                product.price
              } + tax and your next bill is due on ${subscriptionPeriodFormattedDate(
                activeSubscription.currentPeriodEnd
              )}.`}
            </p>

            <h3 className="uppercase font-shapiro95_super_wide text-xl text-cc-black">
              current membership
            </h3>
            <p className="mb-3 lowercase">{`${product?.name}/month`}</p>
            <PrimaryButton inverted bg="transparent" className="w-max mb-8" to={ROUTES.MEMBERSHIPS}>
              change membership
            </PrimaryButton>

            <h3 className="uppercase font-shapiro95_super_wide text-xl text-cc-black mb-3">
              manage membership
            </h3>
            <PrimaryButton
              inverted
              bg="transparent"
              className="w-max"
              onClick={() => setShowCancelModal(true)}
            >
              cancel membership
            </PrimaryButton>
          </>
        ) : (
          <PrimaryButton to={ROUTES.MEMBERSHIPS} className="w-max">
            reactivate
          </PrimaryButton>
        )}
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

ManageMembershipPage.defaultProps = {};

ManageMembershipPage.propTypes = {};

export default ManageMembershipPage;

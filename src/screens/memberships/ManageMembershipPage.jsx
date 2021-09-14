import React, { useState } from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from 'screens/my-account/reducer';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import CancelMembershipModal from 'shared/components/CancelMembershipModal';
import { cancelSubscription } from 'screens/products/actionCreators';

const ManageMembershipPage = () => {
  const userProfile = useSelector(getUserProfile);
  const activeSubscription = userProfile.activeSubscription;
  const active = !!activeSubscription;
  const product = activeSubscription?.product ?? {};
  const dispatch = useDispatch();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const cancelSubscriptionAction = async () => dispatch(cancelSubscription(activeSubscription));

  return (
    <>
      <div className="flex flex-col p-12 min-h-screen">
        <h1 className="uppercase font-shapiro95_super_wide text-3xl text-cc-black mb-6">
          membership
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
              )}`}
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

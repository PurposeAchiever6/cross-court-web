import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initialLoadInit, updateCard, deleteCard } from 'screens/payment-methods/actionCreators';
import { updateSubscriptionPaymentMethod } from 'screens/products/actionCreators';
import { getUpdateSubscriptionPaymentMethodLoading } from 'screens/products/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  getPageLoading,
  getAvailableCards,
  getDeleteCardLoading,
} from 'screens/payment-methods/reducer';
import Spinner from 'shared/components/Spinner';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Tooltip from 'shared/components/Tooltip';
import Link from 'shared/components/Link';
import AddPaymentMethod from 'screens/settings/components/AddPaymentMethod';
import PaymentHistoryModal from 'screens/settings/components/PaymentHistoryModal';
import Button from 'shared/components/Button';
import Loading from 'shared/components/Loading';
import CreditCard from 'shared/components/CreditCard';

const Billing = () => {
  const dispatch = useDispatch();

  const [cardIdToDelete, setCardIdToDelete] = useState(null);
  const [paymentHistoryModalOpen, setPaymentHistoryModalOpen] = useState(false);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const userProfile = useSelector(getUserProfile);
  const { activeSubscription } = userProfile;
  const isLoading = useSelector(getPageLoading);
  const availablePaymentMethods = useSelector(getAvailableCards);
  const isSubscriptionUpdatePaymentMethodLoading = useSelector(
    getUpdateSubscriptionPaymentMethodLoading
  );
  const deleteCardLoading = useSelector(getDeleteCardLoading);

  const updatePaymentMethodAsDefault = (paymentMethod) => {
    dispatch(updateCard(paymentMethod.id, { default: true }));
  };

  const updateSubscriptionPaymentMethodHandler = (paymentMethod) => {
    dispatch(updateSubscriptionPaymentMethod(activeSubscription, paymentMethod));
  };

  const deleteCardHandler = (paymentMethod) => {
    setCardIdToDelete(paymentMethod.id);
    dispatch(deleteCard(paymentMethod.id));
  };

  if (isLoading || isSubscriptionUpdatePaymentMethodLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row mb-12">
          <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">My Cards</span>
          <div className="flex items-center md:w-3/4">
            {availablePaymentMethods.length === 0 ? (
              <div className="bg-cc-blue-500 p-10 w-full flex items-center">
                <span className="mx-auto">There are no payment methods added yet.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {availablePaymentMethods.map((paymentMethod) => (
                  <div
                    key={paymentMethod.id}
                    className="bg-cc-blue-500 flex flex-col md:flex-row p-4 md:p-2 w-full"
                  >
                    <CreditCard
                      last4={paymentMethod.last4}
                      expMonth={paymentMethod.expMonth}
                      expYear={paymentMethod.expYear}
                    />
                    <div className="flex flex-col gap-4 justify-center ml-6">
                      <InputCheckboxField
                        name="default"
                        onChange={() => updatePaymentMethodAsDefault(paymentMethod)}
                        value={paymentMethod.default}
                        checked={paymentMethod.default}
                        formik={false}
                      >
                        Default
                      </InputCheckboxField>
                      {activeSubscription && (
                        <InputCheckboxField
                          name="withActiveSubscription"
                          onChange={() => updateSubscriptionPaymentMethodHandler(paymentMethod)}
                          value={paymentMethod.withActiveSubscription}
                          checked={paymentMethod.withActiveSubscription}
                          formik={false}
                        >
                          Link to membership
                        </InputCheckboxField>
                      )}
                      {deleteCardLoading && cardIdToDelete === paymentMethod.id ? (
                        <Spinner />
                      ) : (
                        <Tooltip
                          variant="black"
                          tooltip={
                            "This card can't be deleted because it's associated with your current active membership"
                          }
                          enable={paymentMethod.withActiveSubscription}
                        >
                          <Link
                            disabled={paymentMethod.withActiveSubscription}
                            className="!text-red-500 text-xs"
                            onClick={() => deleteCardHandler(paymentMethod)}
                          >
                            Remove
                          </Link>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-12">
          <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">Add Card</span>
          <div className="md:w-3/4">
            <AddPaymentMethod />
          </div>
        </div>
        <hr />
        <Button
          className="mt-8 w-max"
          variant="outline-white"
          onClick={() => setPaymentHistoryModalOpen(true)}
        >
          PAYMENT HISTORY
        </Button>
      </div>
      <PaymentHistoryModal
        isOpen={paymentHistoryModalOpen}
        closeHandler={() => setPaymentHistoryModalOpen(false)}
      />
    </>
  );
};

Billing.propTypes = {};

export default Billing;

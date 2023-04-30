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
import CreditCardSvg from 'shared/components/svg/CreditCardSvg';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Tooltip from 'shared/components/Tooltip';
import Link from 'shared/components/Link';
import AddPaymentMethod from 'screens/settings/components/AddPaymentMethod';
import PaymentHistoryModal from 'screens/settings/components/PaymentHistoryModal';
import Button from 'shared/components/Button';
import ccLogo from 'shared/images/logos/cc-white.png';
import Loading from 'shared/components/Loading';

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
                    <div className="relative md:w-max">
                      <CreditCardSvg className="w-full md:w-48" />
                      <img
                        className="absolute w-12 md:w-8 top-8 md:top-4 left-8 md:left-5"
                        src={ccLogo}
                        alt="cc-logo"
                      />
                      <span className="absolute bottom-8 md:bottom-4 right-10 md:right-5 text-2xl md:text-lg text-cc-black font-shapiro95_super_wide">
                        {paymentMethod.last4}
                      </span>
                      <span className="absolute bottom-16 md:bottom-10 right-10 md:right-5 text-sm md:text-xs text-cc-black font-shapiro95_super_wide">
                        {paymentMethod.expMonth}/{paymentMethod.expYear}
                      </span>
                    </div>
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

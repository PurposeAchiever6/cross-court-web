import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { initialLoadInit } from 'screens/payment-methods/actionCreators';
import { getAvailableCards } from 'screens/payment-methods/reducer';
import { selectPaymentMethod } from 'screens/checkout/actionCreators';
import { getSelectedPaymentMethod } from 'screens/checkout/reducer';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import SelectableBox from 'shared/components/SelectableBox';
import CreditCard from 'shared/components/CreditCard';

const SelectPaymentMethodModal = ({
  isOpen,
  closeHandler,
  openPurchaseDetailsModal,
  openAddPaymentMethodModal,
}) => {
  const dispatch = useDispatch();

  const paymentMethods = useSelector(getAvailableCards);
  const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);

  const selectPaymentMethodHandler = (paymentMethod) => {
    dispatch(selectPaymentMethod({ paymentMethod }));
  };

  const continueHandler = () => {
    closeHandler();
    openPurchaseDetailsModal();
  };

  const addPaymentMethodHandler = () => {
    closeHandler();
    openAddPaymentMethodModal();
  };

  useEffect(() => {
    if (!isOpen) return;

    dispatch(initialLoadInit());
  }, [dispatch, isOpen]);

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Choose card" size="2xl">
      <div className="w-full">
        {paymentMethods.map((paymentMethod) => (
          <SelectableBox
            key={paymentMethod.id}
            selected={selectedPaymentMethod?.id === paymentMethod.id}
            onClick={() => selectPaymentMethodHandler(paymentMethod)}
            className="mb-1 w-full"
            variant="blue-light"
          >
            <div className="md:flex md:items-center">
              <CreditCard
                last4={paymentMethod.last4}
                expMonth={paymentMethod.expMonth}
                expYear={paymentMethod.expYear}
              />
              <div className="text-sm ml-4">
                {paymentMethod.withActiveSubscription && (
                  <span className="block">Linked to membership</span>
                )}
                {paymentMethod.default && <span className="block">Default</span>}
              </div>
            </div>
          </SelectableBox>
        ))}
        {paymentMethods.length === 0 && (
          <div className="bg-cc-gray-400 p-4 sm:p-8 text-sm">
            There are no payment methods added yet.
          </div>
        )}
        <div className="flex items-center justify-between mt-6">
          <Button disabled={!selectedPaymentMethod} onClick={continueHandler}>
            Continue
          </Button>
          <Link variant="purple-dark" onClick={addPaymentMethodHandler} className="text-sm">
            Add a new card
          </Link>
        </div>
      </div>
    </Modal>
  );
};

SelectPaymentMethodModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  openPurchaseDetailsModal: PropTypes.func.isRequired,
  openAddPaymentMethodModal: PropTypes.func.isRequired,
};

export default SelectPaymentMethodModal;

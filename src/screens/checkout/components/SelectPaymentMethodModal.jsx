import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

import Modal from 'shared/components/Modal';
import { initialLoadInit, setSelectedCard } from 'screens/payment-methods/actionCreators';
import { getAvailableCards, getSelectedCard } from 'screens/payment-methods/reducer';
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

  const selectPaymentMethod = (paymentMethod) => {
    dispatch(setSelectedCard(paymentMethod));
  };

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const paymentMethods = useSelector(getAvailableCards);
  const selectedPaymentMethod = useSelector(getSelectedCard);

  const handleContinue = () => {
    closeHandler();
    openPurchaseDetailsModal();
  };

  const handleAddPaymentMethod = () => {
    closeHandler();
    openAddPaymentMethodModal();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Choose card" size="2xl">
      <div className="w-full">
        {paymentMethods.map((paymentMethod) => (
          <SelectableBox
            key={paymentMethod.id}
            selected={selectedPaymentMethod?.id === paymentMethod.id}
            onClick={() => selectPaymentMethod(paymentMethod)}
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
        <div className="flex items-center justify-between mt-6">
          <Button
            disabled={!selectedPaymentMethod || isEmpty(selectedPaymentMethod)}
            onClick={handleContinue}
          >
            Continue
          </Button>
          <Link onClick={handleAddPaymentMethod}>Add a new card</Link>
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

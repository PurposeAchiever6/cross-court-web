import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { addCard } from 'screens/payment-methods/actionCreators';
import { getAddCardLoading } from 'screens/payment-methods/reducer';
import PaymentMethodForm from 'shared/components/PaymentMethodForm';
import Modal from 'shared/components/Modal';

const AddPaymentMethodModal = ({ isOpen, closeHandler, openSelectPaymentMethodModal }) => {
  const dispatch = useDispatch();

  const addCardLoading = useSelector(getAddCardLoading);

  const addCardHandler = (stripe, cardElement) => {
    dispatch(addCard(stripe, cardElement));
  };

  const handleBack = () => {
    openSelectPaymentMethodModal();
    closeHandler();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
      title="Add a new card"
      titleClasses="pt-6"
      size="2xl"
      showCloseButton={false}
    >
      <button className="text-cc-black absolute top-4 left-4" type="button" onClick={handleBack}>
        <FontAwesomeIcon size="lg" icon={faChevronLeft} />
      </button>
      <PaymentMethodForm
        variant="expanded"
        onSubmit={addCardHandler}
        submitLoading={addCardLoading}
      />
    </Modal>
  );
};

AddPaymentMethodModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  openSelectPaymentMethodModal: PropTypes.func.isRequired,
};

export default AddPaymentMethodModal;

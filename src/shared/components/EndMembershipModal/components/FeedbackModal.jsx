import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createSubscriptionRequestCancellation } from 'screens/products/actionCreators';
import Modal from 'shared/components/Modal';
import InputTextareaField from 'shared/components/InputTextareaField';
import Button from 'shared/components/Button';

const FeedbackModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  const validate = () => {
    const isValid = reason.trim().length >= 10;

    setError(!isValid);

    return isValid;
  };

  const createSubscriptionRequestCancellationHandler = () => {
    if (validate()) {
      dispatch(createSubscriptionRequestCancellation({ reason }));
    }
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} size="lg" title="Let us know how to improve">
      <div>
        <InputTextareaField
          label="Why are you cancelling your membership today?*"
          className="mb-4"
          value={reason}
          error={error}
          onChange={(e) => setReason(e.target.value)}
          hint="Please include at least 10 characters"
          formik={false}
        />
        <Button fontSize="0.75rem" onClick={createSubscriptionRequestCancellationHandler}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default FeedbackModal;

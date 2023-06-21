import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/components/Button';
import InputTextareaField from 'shared/components/InputTextareaField';

const StepFeedbackContent = ({ createSubscriptionRequestCancellation }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  const validate = () => {
    const isValid = reason.trim().length >= 10;

    setError(!isValid);

    return isValid;
  };

  const onSubmit = () => {
    if (validate()) {
      createSubscriptionRequestCancellation({ reason });
    }
  };

  return (
    <div>
      <h4 className="font-shapiro95_super_wide text-xl mb-4">Let us know how to improve.</h4>
      <InputTextareaField
        label="Why are you cancelling your membership today?*"
        className="mb-4"
        value={reason}
        error={error}
        onChange={(e) => setReason(e.target.value)}
        hint="Please include at least 10 characters"
        formik={false}
      />
      <Button fontSize="0.75rem" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

StepFeedbackContent.propTypes = {
  createSubscriptionRequestCancellation: PropTypes.func.isRequired,
};

export default StepFeedbackContent;

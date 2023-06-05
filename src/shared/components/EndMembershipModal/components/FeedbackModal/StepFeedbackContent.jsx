import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/components/Button';
import InputTextareaField from 'shared/components/InputTextareaField';

const StepFeedbackContent = ({ createSubscriptionRequestCancellation }) => {
  const [reason, setReason] = useState('');

  return (
    <div>
      <h4 className="font-shapiro95_super_wide text-xl mb-4">Let us know how to improve.</h4>
      <InputTextareaField
        formik={false}
        label="Why are you cancelling your membership today?"
        className="mb-4"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button fontSize="0.75rem" onClick={() => createSubscriptionRequestCancellation({ reason })}>
        Submit
      </Button>
    </div>
  );
};

StepFeedbackContent.propTypes = {
  createSubscriptionRequestCancellation: PropTypes.func.isRequired,
};

export default StepFeedbackContent;

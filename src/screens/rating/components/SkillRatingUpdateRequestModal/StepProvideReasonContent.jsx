import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Label from 'shared/components/Label';
import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepProvideReasonContent = ({ submitRequest, newSkillRating }) => {
  const [errors, setErrors] = useState({});
  const [reason, setReason] = useState('');

  const validate = () => {
    const newErrors = {};

    if (reason.trim().length < 8) {
      newErrors.reason = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      submitRequest({ reason });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="mb-5">
          Please submit a request in order to adjust your skill level to{' '}
          <strong>level {newSkillRating}</strong> and allow 3-5 business days for the CCteam to
          review.
        </p>
        <Label className="mb-2">What is the reason for wanting to update your skill level?</Label>
        <InputTextareaField
          placeholder="Share as many details as you can please"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          hint="Please include at least 8 characters"
          error={errors.reason}
          formik={false}
        />
      </div>
      <div className="text-center">
        <PrimaryButton inverted onClick={onSubmit}>
          Submit Request
        </PrimaryButton>
      </div>
    </div>
  );
};

StepProvideReasonContent.defaultProps = {
  newSkillRating: null,
};

StepProvideReasonContent.propTypes = {
  submitRequest: PropTypes.func.isRequired,
  newSkillRating: PropTypes.string,
};

export default StepProvideReasonContent;

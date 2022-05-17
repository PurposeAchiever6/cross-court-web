import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Label from 'shared/components/Label';
import InputTextareaField from 'shared/components/InputTextareaField';
import StarsRate from 'shared/components/StarsRate';

const StepFeedbackContent = ({ subscriptionFeedback }) => {
  const [errors, setErrors] = useState({});
  const [experiencieRate, setExperiencieRate] = useState(0);
  const [serviceRate, setServiceRate] = useState(0);
  const [recommendRate, setRecommendRate] = useState(0);
  const [feedback, setFeedback] = useState('');

  const validate = () => {
    const newErrors = {};

    if (experiencieRate === 0) {
      newErrors.experiencieRate = true;
    }
    if (serviceRate === 0) {
      newErrors.serviceRate = true;
    }
    if (recommendRate === 0) {
      newErrors.recommendRate = true;
    }
    if (feedback.trim().length < 20) {
      newErrors.feedback = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      subscriptionFeedback({ experiencieRate, serviceRate, recommendRate, feedback });
    }
  };

  return (
    <div className="text-sm">
      <p className="mb-5">
        Please share your reason(s) for cancelling, to help make Crosscourt better.
      </p>
      <div className="flex flex-wrap justify-between mb-5">
        <div className="w-full md:w-auto">
          <Label>Overall experience</Label>
          <div>How was your time as a member?</div>
        </div>
        <div>
          <StarsRate
            size="lg"
            rate={experiencieRate}
            onClick={(newRate) => setExperiencieRate(newRate)}
            className="mt-2 md:mt-0"
            showEmptyStars
          />
          {errors.experiencieRate && (
            <div className="text-red-500 md:text-right text-xs mt-2 mr-2">Required</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-5">
        <div className="w-full md:w-auto">
          <Label>Service as described</Label>
          <div>Did the experience meet expectations?</div>
        </div>
        <div>
          <StarsRate
            size="lg"
            rate={serviceRate}
            onClick={(newRate) => setServiceRate(newRate)}
            className="mt-2 md:mt-0"
            showEmptyStars
          />
          {errors.serviceRate && (
            <div className="text-red-500 md:text-right text-xs mt-2 mr-2">Required</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-5">
        <div className="w-full md:w-auto">
          <Label>Join again or recommend</Label>
          <div>Would you recommend CC to a friend?</div>
        </div>
        <div>
          <StarsRate
            size="lg"
            rate={recommendRate}
            onClick={(newRate) => setRecommendRate(newRate)}
            className="mt-2 md:mt-0"
            showEmptyStars
          />
          {errors.recommendRate && (
            <div className="text-red-500 md:text-right text-xs mt-2 mr-2">Required</div>
          )}
        </div>
      </div>
      <div>
        <Label className="mb-1">What is the primary reason(s) for cancelling?</Label>
        <InputTextareaField
          placeholder="Share as many details as you can to help us improve Crosscourt"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          hint="Please include at least 20 characters"
          error={errors.feedback}
          className="mb-6"
          formik={false}
        />
      </div>
      <div className="text-center">
        <PrimaryButton onClick={onSubmit}>Submit Request</PrimaryButton>
      </div>
    </div>
  );
};

StepFeedbackContent.propTypes = {
  subscriptionFeedback: PropTypes.func.isRequired,
};

export default StepFeedbackContent;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Label from 'shared/components/Label';
import StarsRate from 'shared/components/StarsRate';
import { getUserProfile } from 'screens/my-account/reducer';
import { getAvailableProducts } from 'screens/products/reducer';
import { initialLoad as fetchProducts } from 'screens/products/actionCreators';
import FeedbackOptions, { MANDATORY_DETAILS_REASONS } from './FeedbackOptions';

const StepFeedbackContent = ({
  createSubscriptionRequestCancellation,
  closeModal,
  setShowPauseModal,
}) => {
  const [errors, setErrors] = useState({});
  const [experiencieRate, setExperiencieRate] = useState(0);
  const [serviceRate, setServiceRate] = useState(0);
  const [recommendRate, setRecommendRate] = useState(0);
  const [reason, setReason] = useState(null);
  const [details, setDetails] = useState('');

  const dispatch = useDispatch();

  const products = useSelector(getAvailableProducts);
  const currentUser = useSelector(getUserProfile);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    // eslint-disable-next-line
  }, [dispatch]);

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
    if (!reason) {
      newErrors.reason = true;
    }
    if (MANDATORY_DETAILS_REASONS.includes(reason) && details.trim().length < 20) {
      newErrors.reasonDetails = reason;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      createSubscriptionRequestCancellation({
        experiencieRate,
        serviceRate,
        recommendRate,
        reason: `${reason}${details.length > 0 ? ` - ${details}` : ''}`,
      });
    }
  };

  const onChangeReason = (e) => {
    const { checked, id: value } = e.target;
    setReason(checked ? value : null);
    setErrors({});
  };

  return (
    <div>
      <p className="text-sm mb-5">
        Please share your reason(s) for cancelling, to help make Crosscourt better.
      </p>
      <div className="flex flex-wrap justify-between mb-5">
        <div className="w-full md:w-auto">
          <Label color="purple" className="uppercase">
            Overall experience
          </Label>
          <div className="text-sm">How was your time as a member?</div>
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
          <Label color="purple" className="uppercase">
            Service as described
          </Label>
          <div className="text-sm">Did the experience meet expectations?</div>
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
      <div className="flex flex-wrap justify-between mb-8">
        <div className="w-full md:w-auto">
          <Label color="purple" className="uppercase">
            Join again or recommend
          </Label>
          <div className="text-sm">Would you recommend CC to a friend?</div>
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
      {errors.reason && (
        <div className="font-shapiro45_welter_extd text-xs text-red-500 mb-4">
          Please select at least one reason from the list below
        </div>
      )}
      <FeedbackOptions
        onChangeReason={onChangeReason}
        reason={reason}
        details={details}
        setDetails={setDetails}
        activeSubscription={currentUser?.activeSubscription}
        error={errors.reasonDetails}
        closeModal={closeModal}
        products={products}
        setShowPauseModal={setShowPauseModal}
        className="mb-5"
      />
      <div className="text-center">
        <PrimaryButton onClick={onSubmit}>Submit Request</PrimaryButton>
      </div>
    </div>
  );
};

StepFeedbackContent.propTypes = {
  createSubscriptionRequestCancellation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  setShowPauseModal: PropTypes.func.isRequired,
};

export default StepFeedbackContent;

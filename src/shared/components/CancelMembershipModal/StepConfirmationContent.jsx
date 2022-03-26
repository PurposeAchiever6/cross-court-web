import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepConfirmationContent = ({ showFeedback }) => (
  <div>
    <div className="text-sm mb-8">
      <p className="mb-5">
        You are about to cancel your membership. The credits in your account will remain available
        until the end of the billing period. At that point, your card on file will no longer be
        charged.
      </p>
      <p>Your membership can be reactivated at any point prior to end of billing period.</p>
    </div>
    <div className="text-center">
      <PrimaryButton onClick={showFeedback}>YES</PrimaryButton>
    </div>
  </div>
);

StepConfirmationContent.propTypes = {
  showFeedback: PropTypes.func.isRequired,
};

export default StepConfirmationContent;

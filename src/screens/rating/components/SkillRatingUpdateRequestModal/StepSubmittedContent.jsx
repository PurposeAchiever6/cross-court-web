import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepSubmittedContent = ({ goToMyAccount }) => (
  <div className="text-center">
    <p className="mb-8">Thank you. Your request has been submitted. The CCteam will be in touch!</p>
    <PrimaryButton onClick={goToMyAccount}>Done</PrimaryButton>
  </div>
);

StepSubmittedContent.propTypes = {
  goToMyAccount: PropTypes.func.isRequired,
};

export default StepSubmittedContent;

import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepAreYouSureContent = ({ areYouSureHandler, pausesPerYear }) => (
  <div className="text-center">
    <div className="mb-8">
      <p className="mb-2">
        We require a 30-day notice so you will be billed for one additional billing period. Your
        sessions will remain available during this final period and can be used.
      </p>
      <p>
        {`Please note, you also have the ability to pause your membership for 1 or 2 months up to ${pausesPerYear} times per year.`}
      </p>
    </div>
    <PrimaryButton fontSize="0.75rem" onClick={areYouSureHandler}>
      Yes, I'm sure
    </PrimaryButton>
  </div>
);

StepAreYouSureContent.defaultProps = {
  pausesPerYear: '2',
};

StepAreYouSureContent.propTypes = {
  areYouSureHandler: PropTypes.func.isRequired,
  pausesPerYear: PropTypes.string,
};

export default StepAreYouSureContent;

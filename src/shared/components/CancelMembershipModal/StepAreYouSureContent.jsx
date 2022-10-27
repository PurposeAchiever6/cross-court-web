import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import BasketballSvg from 'shared/components/svg/BasketballSvg';

const StepAreYouSureContent = ({ areYouSureHandler, pausesPerYear }) => (
  <div className="relative pt-4">
    <span>We're sad to see you go, but here's what you need to know:</span>
    <div className="flex items-center my-4">
      <div className="w-10 h-10 mr-4">
        <BasketballSvg className="w-10 h-10 text-cc-purple" />
      </div>
      We require a 30-day notice so you will be billed for one additional billing period (credits
      will remain available during this period).
    </div>
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 mr-4">
        <BasketballSvg className="w-10 h-10 text-cc-purple" />
      </div>
      Any unused sessions that have been accumulated during rollover periods will be lost. The
      credits you currently have saved up will dissapear after cancellation.
    </div>
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 mr-4">
        <BasketballSvg className="w-10 h-10 text-cc-purple" />
      </div>
      Access to CC perks such as Open Club, Highlights, Tournaments, Events, etc will no longer be
      available.
    </div>
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 mr-4">
        <BasketballSvg className="w-10 h-10 text-cc-purple" />
      </div>
      Your data will be retained for 60 days before it gets deleted from our servers.
    </div>
    <div className="flex flex-col items-start mb-4">
      <span className="mb-1 text-cc-purple ml-2">ps:</span>
      <span className="text-cc-black text-sm uppercase font-shapiro95_super_wide border-2 border-cc-purple p-2">
        Instead, you do have the ability to{' '}
        <span className="font-shapiro96_inclined_wide text-cc-purple">pause your membership</span>{' '}
        for 1 - 2 months up to {pausesPerYear} times per year free of charge (you will not be able
        to book during this period and credits will not be accumulated). You can unpause any time!
      </span>
    </div>
    <div className="text-center">
      <PrimaryButton fontSize="0.75rem" onClick={areYouSureHandler}>
        Yes, I'm sure
      </PrimaryButton>
    </div>
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

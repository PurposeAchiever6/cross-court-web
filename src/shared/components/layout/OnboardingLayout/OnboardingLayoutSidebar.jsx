import React from 'react';
import PropTypes from 'prop-types';

import ProgressTracker from 'shared/components/ProgressTracker';

const OnboardingLayoutSidebar = ({ children, active }) => {
  const steps = [
    { label: 'Account', active: true },
    { label: 'Membership', active: ['membership', 'review'].includes(active) },
    { label: 'Review', active: active === 'review' },
  ];

  return (
    <>
      <div className="hidden md:block bg-cc-blue-500 p-10 w-1/4 shrink-0">
        {children}
        <ProgressTracker steps={steps} className="text-sm mt-8 h-[10rem]" />
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-cc-blue-500 p-4">
        {children}
        <ProgressTracker steps={steps} noLabels vertical={false} className="text-sm mt-4" />
      </div>
    </>
  );
};

OnboardingLayoutSidebar.defaultProps = {
  children: null,
  active: null,
};

OnboardingLayoutSidebar.propTypes = {
  children: PropTypes.node,
  active: PropTypes.string,
};

export default OnboardingLayoutSidebar;

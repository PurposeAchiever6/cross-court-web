import React from 'react';
import PropTypes from 'prop-types';

const OnboardingLayoutContent = ({ children }) => (
  <div className="bg-white text-black px-4 py-6 md:px-10 md:py-10 w-full">{children}</div>
);

OnboardingLayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnboardingLayoutContent;

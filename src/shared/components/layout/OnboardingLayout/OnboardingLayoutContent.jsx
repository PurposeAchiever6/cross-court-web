import React from 'react';
import PropTypes from 'prop-types';

const OnboardingLayoutContent = ({ children, className }) => (
  <div className={`bg-white text-black px-4 py-6 md:px-10 md:py-10 ${className}`}>{children}</div>
);

OnboardingLayoutContent.defaultProps = {
  className: '',
};

OnboardingLayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default OnboardingLayoutContent;

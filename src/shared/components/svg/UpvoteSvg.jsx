import React from 'react';
import PropTypes from 'prop-types';

const UpvoteSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M2.80184 9.12786L6.03947 8.8446L6.96913 19.4707L3.7315 19.7539L2.80184 9.12786Z"
      fill="currentColor"
    />
    <path
      d="M7.08547 8.75309L20.7333 7.55905L21.2911 13.9347C21.4965 16.2821 19.7898 18.349 17.479 18.5512L8.01513 19.3792L7.08547 8.75309Z"
      fill="currentColor"
    />
    <path
      d="M6.80367 5.53206C6.70259 4.37668 7.55727 3.35811 8.71265 3.25702C9.86804 3.15594 10.8866 4.01062 10.9877 5.166L11.2695 8.38703L7.08547 8.75309L6.80367 5.53206Z"
      fill="currentColor"
    />
  </svg>
);

UpvoteSvg.defaultProps = {
  className: '',
};

UpvoteSvg.propTypes = {
  className: PropTypes.string,
};

export default UpvoteSvg;

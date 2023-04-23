import React from 'react';
import PropTypes from 'prop-types';

const EnvelopeSvg = ({ className }) => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1666 4.58331H1.83331V17.4166H20.1666V4.58331ZM5.17985 6.63731L11 11.626L16.8201 6.63731L18.0132 8.02928L11 14.0406L3.98673 8.02928L5.17985 6.63731Z"
      fill="currentcolor"
    />
  </svg>
);

EnvelopeSvg.defaultProps = {
  className: '',
};

EnvelopeSvg.propTypes = {
  className: PropTypes.string,
};

export default EnvelopeSvg;

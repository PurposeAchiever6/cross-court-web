import React from 'react';
import PropTypes from 'prop-types';

const EmailSvg = ({ className }) => (
  <svg
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.3327 0.666687H0.666016V19.3334H27.3327V0.666687ZM5.5337 3.65432L13.9993 10.9106L22.4649 3.65432L24.2004 5.679L13.9993 14.4228L3.79826 5.679L5.5337 3.65432Z"
      fill="currentColor"
    />
  </svg>
);

EmailSvg.defaultProps = {
  className: '',
};

EmailSvg.propTypes = {
  className: PropTypes.string,
};

export default EmailSvg;

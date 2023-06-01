import React from 'react';
import PropTypes from 'prop-types';

const InfoSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 -1.04907e-06C5.37259 -1.62846e-06 1.62846e-06 5.37258 1.04907e-06 12C4.69686e-07 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 -4.69686e-07 12 -1.04907e-06ZM13 10L13 18L11 18L11 10L13 10ZM11 7C11 6.44771 11.4477 6 12 6C12.5523 6 13 6.44771 13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7Z"
      fill="currentColor"
    />
  </svg>
);

InfoSvg.defaultProps = {
  className: '',
};

InfoSvg.propTypes = {
  className: PropTypes.string,
};

export default InfoSvg;

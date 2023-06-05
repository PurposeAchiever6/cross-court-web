import React from 'react';
import PropTypes from 'prop-types';

const ExclamationSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM11 14V6H13V14H11ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
      fill="currentColor"
    />
  </svg>
);

ExclamationSvg.defaultProps = {
  className: '',
};

ExclamationSvg.propTypes = {
  className: PropTypes.string,
};

export default ExclamationSvg;

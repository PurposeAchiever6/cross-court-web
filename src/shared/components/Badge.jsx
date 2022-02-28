import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ variant, pill, className, children }) => {
  let badgeClasses = `text-center whitespace-nowrap align-middle leading-none text-xs font-normal px-2 py-1 ${
    pill ? 'rounded-full' : 'rounded'
  }`;

  switch (variant) {
    case 'purple':
      badgeClasses += ' text-white bg-cc-purple';
      break;
    case 'black':
      badgeClasses += ' text-white bg-cc-black';
      break;
    case 'white':
      badgeClasses += ' text-cc-black bg-white';
      break;
    default:
      break;
  }

  return <span className={`${badgeClasses} ${className}`}>{children}</span>;
};

Badge.defaultProps = {
  variant: 'purple',
  pill: false,
  className: '',
};

Badge.propTypes = {
  variant: PropTypes.string,
  pill: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Badge;

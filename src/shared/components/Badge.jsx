import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ variant, size, align, pill, shrink, className, children }) => {
  let badgeClasses = `inline-block font-shapiro95_super_wide uppercase align-middle font-normal ${
    pill ? 'rounded-full' : ''
  }`;

  shrink ? (badgeClasses += 'px-1 py-px') : (badgeClasses += ' px-2 py-1');

  switch (size) {
    case 'sm':
      badgeClasses += ' text-2xs';
      break;
    case 'md':
      badgeClasses += ' text-xs';
      break;
    default:
      break;
  }

  switch (align) {
    case 'left':
      badgeClasses += ' text-left';
      break;
    case 'right':
      badgeClasses += ' text-right';
      break;
    case 'center':
    default:
      badgeClasses += ' text-center';
      break;
  }

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
  size: 'md',
  align: 'center',
  pill: false,
  shrink: false,
  className: '',
};

Badge.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  pill: PropTypes.bool,
  shrink: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Badge;

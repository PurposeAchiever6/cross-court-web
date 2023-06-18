import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const getVariantClasses = (variant) => {
  switch (variant) {
    case 'none':
      return '';
    case 'white-opacity':
      return 'text-white hover:opacity-60 transition-opacity duration-300';
    case 'white':
      return 'text-white hover:underline';
    case 'purple-dark':
      return 'text-cc-purple-900 hover:underline';
    case 'purple-light':
    default:
      return 'text-cc-purple hover:underline';
  }
};

const Link = ({ to, onClick, variant, isExternal, disabled, children, className, ...props }) => {
  let linkClassName = `${getVariantClasses(variant)} ${className}`;

  if (disabled) {
    linkClassName += ' pointer-events-none opacity-50';
  }

  if (isExternal) {
    return (
      <a href={disabled ? undefined : to} className={linkClassName} {...props}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <span
        onClick={disabled ? undefined : onClick}
        className={`${linkClassName} cursor-pointer`}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <RRLink to={disabled ? undefined : to} className={linkClassName} {...props}>
      {children}
    </RRLink>
  );
};

Link.defaultProps = {
  to: null,
  onClick: null,
  variant: 'purple-light',
  isExternal: false,
  disabled: false,
  className: '',
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  isExternal: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Link;

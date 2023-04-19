/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from 'shared/components/Spinner';

const getVariantClasses = (variant) => {
  switch (variant) {
    case 'outline-purple':
      return 'border-2 border-cc-purple-500 text-cc-purple-500 hover:border-cc-purple-700 hover:text-cc-purple-700';
    case 'outline-black':
      return 'border-2 border-cc-black text-cc-black hover:border-cc-black/75 hover:text-cc-black/75';
    case 'outline-white':
      return 'border-2 border-white text-white hover:border-white/60 hover:text-white/60';
    case 'purple':
    default:
      return 'bg-cc-purple-500 border-3 border-cc-purple-500 text-black shadow-md hover:bg-cc-purple-700 hover:border-cc-purple-700';
  }
};

const getSizeClasses = (size) => {
  switch (size) {
    case 'sm':
      return 'text-xs';
    case 'lg':
      return 'text-base';
    case 'md':
    default:
      return 'text-sm';
  }
};

const Button = ({
  variant,
  size,
  disabled,
  type,
  loading,
  onClick,
  to,
  className,
  children,
  isExternal,
  ...props
}) => {
  let btnClassName =
    'font-shapiro95_super_wide uppercase inline-block transition-all duration-300 text-center whitespace-nowrap px-6 py-2 outline-none focus:outline focus:outline-offset-1 focus:outline-cc-purple-300';

  btnClassName += ` ${getVariantClasses(variant)}`;

  btnClassName += ` ${getSizeClasses(size)}`;

  if (disabled) {
    btnClassName += ' pointer-events-none opacity-50';
  }

  if (loading) {
    btnClassName += ' pointer-events-none opacity-75';
  }

  if (className) {
    btnClassName += ` ${className}`;
  }

  const onClickBtn = (e) => {
    e.target.blur();
    onClick();
  };

  return to ? (
    isExternal ? (
      <a rel="noreferrer" href={to} className={btnClassName} {...props}>
        {children}
      </a>
    ) : (
      <Link to={to} className={btnClassName} {...props}>
        {children}
      </Link>
    )
  ) : (
    <button
      className={btnClassName}
      type={type}
      disabled={disabled}
      onClick={onClickBtn}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'purple',
  size: 'md',
  disabled: false,
  type: 'button',
  loading: false,
  onClick: () => null,
  to: null,
  className: '',
  isExternal: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['purple', 'outline-purple', 'outline-black', 'outline-white']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  className: PropTypes.string,
  isExternal: PropTypes.bool,
};

export default Button;

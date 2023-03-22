import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Link = ({ to, children, className, ...props }) => (
  <RRLink to={to} className={`text-cc-purple hover:underline ${className}`} {...props}>
    {children}
  </RRLink>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = {
  className: '',
};

export default Link;

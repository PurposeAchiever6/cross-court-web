import React from 'react';
import PropTypes from 'prop-types';

const SectionLayout = ({ className, children }) => (
  <section className={`px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 ${className}`}>{children}</section>
);

SectionLayout.defaultProps = {
  className: '',
};

SectionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionLayout;

import React from 'react';
import PropTypes from 'prop-types';

const PageLayout = ({ dark, children }) => (
  <div className={dark ? 'bg-black text-white' : ''}>
    <div className="max-w-screen-2xl mx-auto pt-28 pb-24">{children}</div>
  </div>
);

PageLayout.defaultProps = {
  dark: true,
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
};

export default PageLayout;

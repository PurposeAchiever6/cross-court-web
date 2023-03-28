import React from 'react';
import PropTypes from 'prop-types';

const CircleDashedSvg = ({ strokeWidth, strokeDashArray, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={className}>
    <rect
      width="100%"
      height="100%"
      fill="none"
      rx="1000"
      ry="1000"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDashArray}
      strokeDashoffset="22"
      strokeLinecap="butt"
    />
  </svg>
);

CircleDashedSvg.defaultProps = {
  className: '',
  strokeWidth: '2',
  strokeDashArray: '10',
};

CircleDashedSvg.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDashArray: PropTypes.string,
};

export default CircleDashedSvg;

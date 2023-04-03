import React from 'react';
import PropTypes from 'prop-types';

const LineDashedSvg = ({ strokeWidth, strokeDashArray, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2px" className={className}>
    <line
      x1="0"
      y1="0"
      x2="100%"
      y2="0"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDashArray}
      strokeLinecap="square"
    />
  </svg>
);

LineDashedSvg.defaultProps = {
  className: '',
  strokeWidth: '2',
  strokeDashArray: '8',
};

LineDashedSvg.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDashArray: PropTypes.string,
};

export default LineDashedSvg;

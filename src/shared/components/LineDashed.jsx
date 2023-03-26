import React from 'react';
import PropTypes from 'prop-types';

const LineDashed = ({ strokeWidth, strokeDashArray, className }) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2px">
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
  </div>
);

LineDashed.defaultProps = {
  className: '',
  strokeWidth: '2',
  strokeDashArray: '8',
};

LineDashed.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDashArray: PropTypes.string,
};

export default LineDashed;

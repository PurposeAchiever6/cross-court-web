import React from 'react';
import PropTypes from 'prop-types';

const CrossSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g id="Icon / Close">
      <path
        id="shape"
        d="M10.5858 12.0001L2.80761 19.7783L4.22182 21.1925L12 13.4143L19.7782 21.1925L21.1924 19.7783L13.4142 12.0001L21.1924 4.22193L19.7782 2.80772L12 10.5859L4.22183 2.80772L2.80761 4.22193L10.5858 12.0001Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

CrossSvg.defaultProps = {
  className: '',
};

CrossSvg.propTypes = {
  className: PropTypes.string,
};

export default CrossSvg;

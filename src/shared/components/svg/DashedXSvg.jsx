import React from 'react';

const DashedXSvg = ({ ...props }) => (
  <svg
    width="354"
    height="221"
    viewBox="0 0 354 221"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M67.8799 1L177 110.5L67.8799 220" stroke="#9999FF" strokeDasharray="8 8" />
    <path
      opacity="0.66"
      d="M35.0269 1L144.147 110.5L35.0269 220"
      stroke="#9999FF"
      strokeDasharray="8 8"
    />
    <path opacity="0.33" d="M1 1L110.12 110.5L1 220" stroke="#9999FF" strokeDasharray="8 8" />
    <path d="M286.12 220L177 110.5L286.12 1.00003" stroke="white" strokeDasharray="8 8" />
    <path
      opacity="0.66"
      d="M320.146 220L211.026 110.5L320.147 1.00003"
      stroke="white"
      strokeDasharray="8 8"
    />
    <path
      opacity="0.33"
      d="M353 220L243.88 110.5L353 1.00003"
      stroke="white"
      strokeDasharray="8 8"
    />
  </svg>
);

export default DashedXSvg;

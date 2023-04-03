import React from 'react';

const DashedCircleSvg = ({ ...props }) => (
  <svg
    width="352"
    height="340"
    viewBox="0 0 352 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="206" cy="194" r="124" stroke="#9999FF" strokeWidth="2" strokeDasharray="8 8" />
    <circle
      opacity="0.25"
      cx="206"
      cy="194"
      r="145"
      stroke="#9999FF"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="206" cy="194" r="97" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
    <line
      x1="0.680043"
      y1="1.26683"
      x2="207.434"
      y2="193.039"
      stroke="#9999FF"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
  </svg>
);

export default DashedCircleSvg;

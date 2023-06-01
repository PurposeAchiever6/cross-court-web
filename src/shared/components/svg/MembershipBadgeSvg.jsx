import React from 'react';

const MembershipBadgeSvg = ({ ...props }) => (
  <svg
    width="48"
    height="54"
    viewBox="0 0 48 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 15L0 11V9H48V11L24 15ZM24 17.3333L0 14V28.359L24 54L48 28.359V14L24 17.3333Z"
      fill="currentColor"
    />
    <mask
      id="mask0_593_1803"
      style={{ maskYype: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="9"
      width="48"
      height="45"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 15L48 11V9H0V11L24 15ZM24 17.3333L48 14V28.359L24 54L0 28.359V14L24 17.3333Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0_593_1803)">
      <rect width="24" height="45" transform="matrix(-1 0 0 1 24 9)" fill="#AAAFF3" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.269 23.3177L31.7312 24.6823L21.6668 35.4656L16.269 29.6823L17.7312 28.3177L21.6668 32.5344L30.269 23.3177Z"
      fill="#1A1A1A"
    />
    <path
      d="M41.5834 47.4167V51.5834H42.4167V47.4167H46.5834V46.5834H42.4167V42.4167H41.5834V46.5834H37.4167V47.4167H41.5834Z"
      fill="currentColor"
    />
    <path
      d="M9.75 3.25V5.75H10.25V3.25H12.75V2.75H10.25V0.25H9.75V2.75H7.25V3.25H9.75Z"
      fill="currentColor"
    />
    <path
      d="M3.66658 42.3333V45.6666H4.33325V42.3333H7.66658V41.6666H4.33325V38.3333H3.66659V41.6666H0.333252V42.3333H3.66658Z"
      fill="currentColor"
    />
  </svg>
);

export default MembershipBadgeSvg;

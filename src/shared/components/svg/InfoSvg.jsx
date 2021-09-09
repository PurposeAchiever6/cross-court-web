import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ dataTip, className, imageSrc }) => {
  const image = imageSrc ? (
    <img alt="" class="tooltip-image" src={imageSrc} />
  ) : (
    <svg
      className={className}
      data-tip={dataTip}
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.58065 0 0 3.6129 0 8C0 12.4194 3.58065 16 8 16C12.3871 16 16 12.4194 16 8C16 3.6129 12.3871 0 8 0ZM8 3.54839C8.74194 3.54839 9.35484 4.16129 9.35484 4.90323C9.35484 5.67742 8.74194 6.25806 8 6.25806C7.22581 6.25806 6.64516 5.67742 6.64516 4.90323C6.64516 4.16129 7.22581 3.54839 8 3.54839ZM9.80645 11.7419C9.80645 11.9677 9.6129 12.129 9.41935 12.129H6.58065C6.35484 12.129 6.19355 11.9677 6.19355 11.7419V10.9677C6.19355 10.7742 6.35484 10.5806 6.58065 10.5806H6.96774V8.51613H6.58065C6.35484 8.51613 6.19355 8.35484 6.19355 8.12903V7.35484C6.19355 7.16129 6.35484 6.96774 6.58065 6.96774H8.64516C8.83871 6.96774 9.03226 7.16129 9.03226 7.35484V10.5806H9.41935C9.6129 10.5806 9.80645 10.7742 9.80645 10.9677V11.7419Z"
        fill="currentColor"
      />
    </svg>
  );
  return image;
};

Info.propTypes = {
  dataTip: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default Info;

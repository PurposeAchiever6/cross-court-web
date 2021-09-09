import React from 'react';
import PropTypes from 'prop-types';
import colors from 'shared/styles/constants';

const MapMarker = ({ onClickHandler, selected, location, $hover }) => {
  const LocationInfo = () => (
    <div className="absolute bottom-20 -left-14 flex flex-col bg-cc-black text-white shadow-lg rounded-sm p-2 w-48 justify-center">
      <p className="font-shapiro95_super_wide truncate">ADDRESS</p>
      <p className="font-shapiro45_welter_extd truncate">{location.address}</p>
      <p className="font-shapiro45_welter_extd truncate">{`${location.city}, ${location.state} ${location.zipcode}`}</p>
    </div>
  );

  return (
    <>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 -top-12 -left-9">
        {$hover && <LocationInfo />}
        <svg
          onClick={onClickHandler}
          width="83"
          height="83"
          viewBox="0 0 83 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d)">
            <circle
              cx="41.5"
              cy="39.5"
              r="27.5"
              fill={selected ? colors.white : colors.brandPurple}
            />
            <circle
              cx="41.5"
              cy="39.5"
              r="25"
              fill={selected ? colors.brandPurple : colors.white}
            />
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="16"
              y="14"
              width="51"
              height="51"
            >
              <circle cx="41.5" cy="39.5" r="25" fill="#737373" />
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M42.5898 29.4876H52.7369C52.0853 27.1866 51.2164 25.1032 50.1613 23.2376C48.0512 19.6617 45.4136 17.454 42.5898 16.9876V29.4876ZM53.2955 31.8818H42.5587V47.1182H53.2955C53.792 44.6928 54.0402 42.143 54.0402 39.5C54.0402 36.857 53.792 34.2761 53.2955 31.8818ZM49.5097 18.4179C50.4716 19.444 51.3715 20.6567 52.2094 22.056C53.4817 24.2326 54.4746 26.7512 55.1884 29.4876H61.6118C59.1293 24.4502 54.816 20.4701 49.5097 18.4179ZM62.6358 31.8818H55.7159C56.1814 34.3072 56.4296 36.857 56.4296 39.5C56.4296 42.1119 56.1814 44.6928 55.7159 47.1182H62.6358C63.4736 44.7239 63.9391 42.1741 63.9391 39.5C63.9391 36.8259 63.4736 34.245 62.6358 31.8818ZM61.6118 49.4813H55.1884C54.4746 52.2177 53.4817 54.7363 52.2094 56.9129C51.4026 58.3122 50.5027 59.5249 49.5097 60.551C54.816 58.4988 59.1293 54.5187 61.6118 49.4813ZM50.1613 55.7002C51.2474 53.8657 52.0853 51.7512 52.7369 49.4502H42.5898V61.9502C45.4136 61.5149 48.0512 59.3383 50.1613 55.7002ZM40.2004 14.5311L-2.25 14.5V64.4689H40.2004V64.4378C27.0122 63.8159 16.4617 52.8706 16.4617 39.4689C16.4617 26.0672 27.0122 15.153 40.2004 14.5311ZM23.9091 53.7724C28.0673 48.7351 33.8701 45.75 40.2004 45.4391V40.6816H18.8511C19.1304 45.6256 20.9612 50.1654 23.9091 53.7724ZM25.5227 55.5448C29.3395 59.3383 34.4907 61.7637 40.2004 62.0746V47.8022C34.4907 48.1443 29.2465 50.9117 25.5227 55.5448ZM18.8511 38.2873H40.2004V33.5609C33.8701 33.2189 28.0673 30.2338 23.9091 25.2276C20.9612 28.8346 19.1304 33.3433 18.8511 38.2873ZM40.2004 16.9254C34.4907 17.2363 29.3395 19.6617 25.5227 23.4552C29.2465 28.0883 34.4907 30.8557 40.2004 31.1978V16.9254ZM85.0091 64.4689V14.5H42.5898V14.5311C55.778 15.153 66.3285 26.0983 66.3285 39.5C66.3285 52.9017 55.778 63.847 42.5898 64.4689V64.5H85.0091V64.4689Z"
                fill={selected ? colors.white : colors.brandPurple}
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="83"
              height="83"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="7" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};

MapMarker.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default MapMarker;

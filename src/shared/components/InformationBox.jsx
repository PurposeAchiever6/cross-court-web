import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const InformationBox = ({
  icon,
  title,
  description,
  label,
  clipCorner,
  backgroundImage,
  darkenBackground,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const clipCornerClass = (() => {
    switch (clipCorner) {
      case 'top-left':
        return 'clip-corner-top-left';
      case 'top-right':
        return 'clip-corner-top-right';
      case 'bottom-left':
        return 'clip-corner-bottom-left';
      case 'bottom-right':
        return 'clip-corner-bottom-right';
      default:
        return '';
    }
  })();

  return (
    <div className={className}>
      <LazyBackgroundImage
        img={backgroundImage}
        onClick={toggleOpen}
        className={`group transition-all duration-500 cursor-pointer bg-cc-blue-700 w-full h-full relative ${clipCornerClass} ${
          backgroundImage ? 'bg-no-repeat bg-cover' : ''
        }`}
      >
        {darkenBackground && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 ${
              open ? '' : 'group-hover:bg-opacity-10'
            }`}
          />
        )}
        <div className="absolute top-0 right-0 m-3 px-2 py-1 bg-cc-blue-500 text-white z-10">
          <FontAwesomeIcon
            className={`mt-1 trasform transition-all ${open ? 'rotate-45' : 'rotate-0'}`}
            icon={faPlus}
          />
        </div>
        <div
          className={`transition-all duration-150 absolute-center text-center ${
            open ? 'opacity-0 delay-0' : 'delay-300'
          }`}
        >
          {icon ? (
            <img src={icon} alt="icon" className="group-hover:opacity-50 transition-all h-10" />
          ) : (
            <span className="group-hover:opacity-50 transition-all font-shapiro95_super_wide text-xl uppercase">
              {title}
            </span>
          )}
        </div>
        {label && !open && (
          <div className="absolute-center-x bottom-8 clip-trapezoid bg-cc-blue-100 font-shapiro95_super_wide uppercase text-2xs whitespace-nowrap px-6 py-1">
            {label}
          </div>
        )}
        <div
          className={`absolute inset-0 flex justify-center items-center text-center text-xs p-4 transition-all duration-300 ${
            open ? 'opacity-100' : 'opacity-0 -z-1'
          }`}
        >
          {description}
        </div>
      </LazyBackgroundImage>
    </div>
  );
};

InformationBox.defaultProps = {
  icon: null,
  title: null,
  label: null,
  backgroundImage: null,
  darkenBackground: false,
  clipCorner: null,
  className: '',
};

InformationBox.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  backgroundImage: PropTypes.string,
  darkenBackground: PropTypes.bool,
  clipCorner: PropTypes.string,
  className: PropTypes.string,
};

export default InformationBox;

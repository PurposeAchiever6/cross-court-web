import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Accordion = ({
  title,
  collapsable,
  dark,
  className,
  icon,
  iconRotationDegrees,
  children,
  titleContainerClassName,
}) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    if (collapsable) {
      setOpen(!open);
    }
  };

  const rotationClassName = (() => {
    switch (iconRotationDegrees) {
      case 0:
        return 'rotate-0';
      case 45:
        return 'rotate-45';
      case 90:
        return 'rotate-90';
      case 180:
        return 'rotate-180';
      default:
        return 'rotate-45';
    }
  })();

  return (
    <div
      onClick={toggleCollapse}
      className={`${dark ? 'bg-cc-blue-900 text-white' : 'border border-cc-blue-900 text-black'} ${
        collapsable ? 'cursor-pointer' : ''
      } p-6 ${className}`}
    >
      {title && (
        <div className={`relative text-sm md:text-base pr-8 ${titleContainerClassName}`}>
          {title}
          {collapsable && icon && (
            <FontAwesomeIcon
              className={`${
                open ? `${rotationClassName}` : 'rotate-0'
              } trasform transition-all duration-150 absolute top-0 right-0`}
              icon={icon}
              size="lg"
            />
          )}
        </div>
      )}
      {collapsable ? (
        <div
          className={`block text-sm overflow-hidden transition-all duration-150 ease ${
            open ? 'block mt-6 text-sm' : 'hidden'
          }`}
        >
          {children}
        </div>
      ) : (
        <div className="mt-6 text-sm">{children}</div>
      )}
    </div>
  );
};

Accordion.defaultProps = {
  title: undefined,
  collapsable: true,
  dark: true,
  className: '',
  icon: faPlus,
  iconRotationDegrees: 45,
  titleContainerClassName: '',
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  collapsable: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.shape(),
  iconRotationDegrees: PropTypes.oneOf([0, 45, 90, 180]),
  titleContainerClassName: PropTypes.string,
};

export default Accordion;

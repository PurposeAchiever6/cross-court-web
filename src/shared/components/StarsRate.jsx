import React from 'react';
import PropTypes from 'prop-types';

import StarFullIcon from 'shared/images/star-full-purple.png';

const StarsRate = ({ rate, size, className }) => {
  const sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-10 h-10';
      default:
        return 'w-6 h-6';
    }
  })();

  return (
    <div className={className}>
      <div className="flex">
        {[...Array(rate)].map((_, index) => (
          <img
            key={`star-icon-${index}`}
            alt={`star-icon-${index}`}
            className={`mr-1 ${sizeClasses}`}
            src={StarFullIcon}
          />
        ))}
      </div>
    </div>
  );
};

StarsRate.defaultProps = {
  className: '',
  size: 'md',
};

StarsRate.propTypes = {
  rate: PropTypes.number.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default StarsRate;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Star from 'shared/components/Star';

const StarsRate = ({ rate, maxRate, showEmptyStars, size, onClick, fadeEffect, className }) => {
  const [hoverRate, setHoverRate] = useState(0);

  const sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'h-4';
      case 'md':
        return 'h-6';
      case 'lg':
        return 'h-8';
      case 'xl':
        return 'h-10';
      case '2xl':
        return 'h-12';
      default:
        return 'h-6';
    }
  })();

  return (
    <div className={className}>
      <div className="flex">
        {showEmptyStars
          ? [...Array(maxRate)].map((_, index) => (
              <Star
                key={`star-icon-${index}`}
                alt={`star-icon-${index}`}
                full={index + 1 <= hoverRate || index + 1 <= rate}
                onClick={onClick && (() => onClick(index + 1))}
                onMouseEnter={onClick && (() => setHoverRate(index + 1))}
                onMouseLeave={onClick && (() => setHoverRate(null))}
                className={`pr-1 ${sizeClasses} ${onClick ? 'cursor-pointer' : ''}`}
                fadeEffect={fadeEffect}
              />
            ))
          : [...Array(rate)].map((_, index) => (
              <Star
                key={`star-icon-${index}`}
                alt={`star-icon-${index}`}
                full
                onClick={onClick && (() => onClick(index + 1))}
                className={`mr-1 ${sizeClasses} ${onClick ? 'cursor-pointer' : ''}`}
              />
            ))}
      </div>
    </div>
  );
};

StarsRate.defaultProps = {
  maxRate: 5,
  showEmptyStars: false,
  size: 'md',
  onClick: null,
  fadeEffect: true,
  className: '',
};

StarsRate.propTypes = {
  rate: PropTypes.number.isRequired,
  maxRate: PropTypes.number,
  showEmptyStars: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func,
  fadeEffect: PropTypes.bool,
  className: PropTypes.string,
};

export default StarsRate;

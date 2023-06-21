import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Star from 'shared/components/Star';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size as breakpoints } from 'shared/styles/mediaQueries';

const StarsRate = ({
  rate,
  maxRate,
  showEmptyStars,
  size,
  onClick,
  fadeEffect,
  className,
  error,
}) => {
  const [hoverRate, setHoverRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);
  const { width: windowSize } = useWindowSize();
  const isDesktop = windowSize >= breakpoints.desktop;

  const sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-6 w-6';
      case 'lg':
        return 'h-8 w-8';
      case 'xl':
        return 'h-10 w-10';
      case '2xl':
        return 'h-12 w-12';
      default:
        return 'h-6 w-6';
    }
  })();

  const handleClick = (index) => {
    if (!onClick) return;

    onClick(index + 1);
    setSelectedRate(index + 1);
  };

  return (
    <div className={className}>
      <div className="flex">
        {showEmptyStars
          ? [...Array(maxRate)].map((_, index) => (
              <Star
                key={`star-icon-${index}`}
                alt={`star-icon-${index}`}
                full={index + 1 <= selectedRate}
                hover={index + 1 <= hoverRate}
                selectedRate={selectedRate}
                onClick={() => handleClick(index)}
                onMouseEnter={isDesktop && onClick ? () => setHoverRate(index + 1) : undefined}
                onMouseLeave={isDesktop && onClick ? () => setHoverRate(null) : undefined}
                className={sizeClasses}
                fadeEffect={fadeEffect}
              />
            ))
          : [...Array(rate)].map((_, index) => (
              <Star
                key={`star-icon-${index}`}
                alt={`star-icon-${index}`}
                full
                selectedRate={selectedRate}
                onClick={() => handleClick(index)}
                className={sizeClasses}
              />
            ))}
      </div>
      {error && <p className="font-shapiro45_welter_extd text-xs text-red-500 mt-2">{error}</p>}
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
  error: '',
};

StarsRate.propTypes = {
  rate: PropTypes.number.isRequired,
  maxRate: PropTypes.number,
  showEmptyStars: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func,
  fadeEffect: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default StarsRate;

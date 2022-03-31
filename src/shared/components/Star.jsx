import React from 'react';
import PropTypes from 'prop-types';

import StarFullIcon from 'shared/images/star-full-purple.png';
import StarEmptyIcon from 'shared/images/star-empty.png';

const Star = ({ alt, full, className, fadeEffect, ...props }) =>
  fadeEffect ? (
    <div className="relative">
      <img
        {...props}
        alt={alt}
        src={StarFullIcon}
        className={`absolute ${className} ${
          full ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'
        }`}
      />
      <img {...props} alt={alt} src={StarEmptyIcon} className={className} />
    </div>
  ) : (
    <img {...props} alt={alt} src={full ? StarFullIcon : StarEmptyIcon} className={className} />
  );

Star.defaultProps = {
  full: true,
  fadeEffect: false,
  className: '',
};

Star.propTypes = {
  alt: PropTypes.string.isRequired,
  full: PropTypes.bool,
  fadeEffect: PropTypes.bool,
  className: PropTypes.string,
};

export default Star;

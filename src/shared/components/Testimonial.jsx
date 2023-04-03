import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Testimonial = ({ name, image, description, className }) => (
  <div className={`bg-cc-blue-700 text-white px-6 py-8 ${className}`}>
    <FontAwesomeIcon icon={faQuoteLeft} className="text-cc-purple text-4xl mb-4" />
    <p className="text-sm mb-5">{description}</p>
    <div className="flex items-center">
      {image && (
        <div className="w-14 h-14 mr-3">
          <img alt={name} src={image} className="w-full h-full object-cover rounded-sm" />
        </div>
      )}
      <div className="text-cc-purple text-sm">{name}</div>
    </div>
  </div>
);

Testimonial.defaultProps = {
  className: '',
  image: null,
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  className: PropTypes.string,
};

export default Testimonial;

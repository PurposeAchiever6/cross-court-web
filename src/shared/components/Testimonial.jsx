import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Testimonial = ({ name, description, className }) => (
  <div className={`bg-cc-blue-700 text-white px-6 py-8 ${className}`}>
    <FontAwesomeIcon icon={faQuoteLeft} className="text-cc-purple text-4xl mb-4" />
    <p className="text-sm mb-4">{description}</p>
    <div className="text-cc-purple text-sm">{name}</div>
  </div>
);

Testimonial.defaultProps = {
  className: '',
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Testimonial;

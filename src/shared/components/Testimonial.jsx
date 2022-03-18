import React from 'react';
import PropTypes from 'prop-types';

import StarsRate from 'shared/components/StarsRate';

const Testimonial = ({ name, rate, description, className }) => (
  <div className="border-2 border-white p-4 h-full">
    <h4 className="text-cc-purple font-shapiro96_inclined_wide uppercase mb-2">{name}</h4>
    <StarsRate rate={rate} className="mb-4" />
    <p className="font-shapiro96_inclined_wide text-xs uppercase">"{description}"</p>
  </div>
);

Testimonial.defaultProps = {
  className: '',
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Testimonial;

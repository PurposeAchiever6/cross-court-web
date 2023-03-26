import React from 'react';
import PropTypes from 'prop-types';

const Indicator = ({ isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-cream w-4 h-1 mx-1 cursor-pointer ${isSelected ? '' : 'bg-opacity-50'}`}
  />
);

Indicator.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Indicator;

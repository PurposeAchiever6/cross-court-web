import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ArrowPrev = ({ onClick }) => (
  <div
    onClick={onClick}
    className="bg-cream hover:bg-opacity-80 transition-all duration-300 w-10 h-10 flex justify-center items-center cursor-pointer absolute -bottom-14 right-14"
  >
    <FontAwesomeIcon className="text-cc-black" icon={faChevronLeft} />
  </div>
);

ArrowPrev.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ArrowPrev;

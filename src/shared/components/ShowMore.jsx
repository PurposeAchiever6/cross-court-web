import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ShowMore = ({ onClick, className }) => (
  <div
    onClick={onClick}
    className={`bg-cc-blue-900 text-white px-4 py-2 text-center text-xs cursor-pointer hover:bg-cc-blue-700 transition-all duration-300 ${
      className || ''
    }`}
  >
    Show more
    <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
  </div>
);

ShowMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ShowMore.defaultProps = {
  className: '',
};

export default ShowMore;

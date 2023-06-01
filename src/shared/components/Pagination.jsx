import React from 'react';
import PropTypes from 'prop-types';
import { FIRST_PAGE } from 'shared/hooks/usePagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ className, nextPage, prevPage, currentPage, maxPage }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <span className="mr-6">
      Page {currentPage} of {maxPage}
    </span>
    <button
      type="button"
      className={`mr-2 w-8 h-8 ${
        currentPage === FIRST_PAGE ? 'bg-gray-300' : 'bg-cc-blue-500'
      } text-white`}
      onClick={() => prevPage()}
      disabled={currentPage === FIRST_PAGE}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
    <button
      type="button"
      className={`ml-2 w-8 h-8 ${
        currentPage === maxPage ? 'bg-gray-300' : 'bg-cc-blue-500'
      } text-white`}
      onClick={() => nextPage()}
      disabled={currentPage === maxPage}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  </div>
);

Pagination.defaultProps = {
  className: '',
};

Pagination.propTypes = {
  className: PropTypes.string,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export default Pagination;

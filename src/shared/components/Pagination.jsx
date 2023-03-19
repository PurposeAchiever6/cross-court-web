import React from 'react';
import PropTypes from 'prop-types';
import { FIRST_PAGE } from 'shared/hooks/usePagination';
import PrimaryButton from './buttons/PrimaryButton';

const Pagination = ({ className, nextPage, prevPage, currentPage, maxPage }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <PrimaryButton
      inverted
      className="mx-4"
      onClick={() => prevPage()}
      disabled={currentPage === FIRST_PAGE}
    >
      Prev
    </PrimaryButton>
    Page {currentPage} of {maxPage}
    <PrimaryButton
      inverted
      className="mx-4"
      onClick={() => nextPage()}
      disabled={currentPage === maxPage}
    >
      Next
    </PrimaryButton>
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

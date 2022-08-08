import React from 'react';
import PrimaryButton from './buttons/PrimaryButton';
import { FIRST_PAGE } from 'shared/hooks/usePagination';

const Pagination = ({ className, nextPage, prevPage, currentPage, maxPage }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
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
};

export default Pagination;

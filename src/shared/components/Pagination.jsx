import React from 'react';
import { FIRST_PAGE } from 'shared/hooks/usePagination';
import PrimaryButton from './buttons/PrimaryButton';

const Pagination = ({ className, nextPage, prevPage, currentPage, maxPage }) => (
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

export default Pagination;

import { useState } from 'react';

export const FIRST_PAGE = 1;
const DEFAULT_PER_PAGE = 25;

const usePagination = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PER_PAGE);

  const maxPage = Math.ceil(totalRecords / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, FIRST_PAGE));
  };

  const jumpToPage = (page) => {
    const pageNumber = Math.max(FIRST_PAGE, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return {
    nextPage,
    prevPage,
    jumpToPage,
    currentPage,
    maxPage,
    itemsPerPage,
    setItemsPerPage,
    totalRecords,
    setTotalRecords,
  };
};

export default usePagination;

import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import currency from 'currency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';
import Table from 'shared/components/Table';
import Tooltip from 'shared/components/Tooltip';
import Pagination from 'shared/components/Pagination';
import { paymentFormattedDate } from 'shared/utils/date';
import usePagination from 'shared/hooks/usePagination';

import { fetchPayments } from './actionCreators';
import { getPageLoading, getPaymentHistory, getPagination } from './reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';

const SUCCESS = 'success';

const PaymentHistoryPage = () => {
  const dispatch = useDispatch();

  const [firstLoad, setFirstLoad] = useState(true);
  const isLoading = useSelector(getPageLoading);
  const paymentHistory = useSelector(getPaymentHistory);
  const { totalRecords } = useSelector(getPagination);
  const { nextPage, prevPage, currentPage, maxPage, setTotalRecords } = usePagination();

  useEffect(() => {
    dispatch(fetchPayments(currentPage));
    setFirstLoad(false);
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (setTotalRecords && totalRecords) {
      setTotalRecords(totalRecords);
    }
  }, [totalRecords, setTotalRecords]);

  const status = (row) =>
    row.status === SUCCESS ? (
      <FontAwesomeIcon icon={faCheckCircle} color="green" />
    ) : (
      <Tooltip tooltip={row.errorMessage}>
        <FontAwesomeIcon icon={faTimesCircle} color="red" />
      </Tooltip>
    );

  const columns = useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Date',
        accessor: (row) => paymentFormattedDate(row.date),
      },
      {
        Header: 'Amount',
        accessor: (row) =>
          `$ ${currency(row.amount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Discount',
        accessor: (row) =>
          `$ ${currency(row.discount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'CC Cash',
        accessor: (row) =>
          `$ ${currency(row.ccCash, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Card',
        accessor: 'last4',
      },
      {
        Header: 'Status',
        accessor: (row) => status(row),
      },
    ],
    []
  );

  if (isLoading && firstLoad) {
    return <Loading />;
  }

  return (
    <>
      <BackButton className="my-6 md:mt-0 ml-0 max-w-max px-4 py-10" />
      {paymentHistory?.length > 0 ? (
        <div className="px-4 flex flex-col items-center">
          <h2 className="text-center font-shapiro95_super_wide mb-4">PAYMENT HISTORY</h2>
          <Table
            columns={columns}
            data={paymentHistory}
            className="w-full lg:max-w-screen-lg text-center font-bold mx-auto overflow-y-auto"
            headerClassName="bg-cc-black text-white"
          />
          <Pagination
            className="my-8"
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        </div>
      ) : (
        <div className="md:mt-6 md:mb-24 items-center">
          <h1 className="font-shapiro95_super_wide text-2xl md:text-3xl text-cc-black text-center uppercase mb-6">
            PAYMENT HISTORY
          </h1>
          <div className="text-center mb-6">
            <p className="mb-6 md:pt-4">
              It looks like you haven't made any purchases.
              <strong className="block">Check out our memberships?</strong>
            </p>
            <PrimaryButton type="button" to={ROUTES.MEMBERSHIPS}>
              Memberships
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHistoryPage;

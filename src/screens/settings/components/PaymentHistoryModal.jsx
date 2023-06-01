import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import currency from 'currency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRotateLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Loading from 'shared/components/Loading';
import Table from 'shared/components/Table';
import Tooltip from 'shared/components/Tooltip';
import Pagination from 'shared/components/Pagination';
import { paymentFormattedDate } from 'shared/utils/date';
import usePagination from 'shared/hooks/usePagination';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import ROUTES from 'shared/constants/routes';
import { fetchPayments } from 'screens/payment-history/actionCreators';
import { getPageLoading, getPaymentHistory, getPagination } from 'screens/payment-history/reducer';

const ERROR = 'error';
const REFUNDED = 'refunded';
const PARTIALLY_REFUNDED = 'partially_refunded';

const PaymentHistoryModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const [firstLoad, setFirstLoad] = useState(true);
  const isLoading = useSelector(getPageLoading);
  const paymentHistory = useSelector(getPaymentHistory);
  const { totalRecords } = useSelector(getPagination);
  const { nextPage, prevPage, currentPage, maxPage, setTotalRecords } = usePagination(10);

  useEffect(() => {
    dispatch(fetchPayments(currentPage));
    setFirstLoad(false);
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (setTotalRecords && totalRecords) {
      setTotalRecords(totalRecords);
    }
  }, [totalRecords, setTotalRecords]);

  const status = (row) => {
    switch (row.status) {
      case ERROR:
        return (
          <Tooltip enable={!!row.errorMessage} tooltip={row.errorMessage}>
            <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
          </Tooltip>
        );
      case REFUNDED:
        return (
          <Tooltip tooltip="This payment has been refunded">
            <FontAwesomeIcon icon={faArrowRotateLeft} className="text-yellow-600" />
          </Tooltip>
        );
      case PARTIALLY_REFUNDED:
        return (
          <Tooltip tooltip="This payment has been partially refunded">
            <FontAwesomeIcon icon={faArrowRotateLeft} className="text-yellow-600" />
          </Tooltip>
        );
      default:
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />;
    }
  };

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
          `$${currency(row.totalAmount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Discount',
        accessor: (row) =>
          `$${currency(row.discount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'CC CA$H',
        accessor: (row) =>
          `$${currency(row.ccCash, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Charged',
        accessor: (row) =>
          `$${currency(row.amount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Refunded',
        accessor: (row) =>
          `$${currency(row.amountRefunded, {
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
        className: 'text-center',
      },
    ],
    []
  );

  if (isLoading && firstLoad) {
    return <Loading />;
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} size="full" title="Payment History">
      {paymentHistory?.length > 0 ? (
        <div className="px-4 flex flex-col items-center">
          <Table
            columns={columns}
            data={paymentHistory}
            className="w-full mx-auto overflow-y-auto"
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
        <div>
          <div className="text-center">
            <p className="mb-6 md:pt-4">
              It looks like you haven't made any purchases.
              <strong className="block mt-2">Check out our memberships</strong>
            </p>
            <Button type="button" to={ROUTES.MEMBERSHIPS}>
              Memberships
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

PaymentHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default PaymentHistoryModal;

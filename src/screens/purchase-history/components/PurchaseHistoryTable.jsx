import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import currency from 'currency.js';

import { purchaseFormattedDate } from 'shared/utils/date';

const TableContainer = styled.div`
  width: 50%;
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #bbbecd;

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 0;
      border-right: 0;
      text-align: center;
      border-bottom: 1px solid #bbbecd;
    }
    .row {
      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    .name,
    .credits,
    .price {
      font-weight: 600;
    }
  }

  @media (max-width: 991px) {
    width: 95%;
    table {
      td {
        padding: 0.5rem;
        font-size: 0.8rem;
      }
    }
  }
`;

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    className: 'name',
  },
  {
    Header: 'Credits',
    accessor: 'credits',
    className: 'credits',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Price',
    accessor: 'price',
    className: 'price',
  },
];

const PurchaseHistoryTable = ({ purchaseHistory }) => {
  const data = purchaseHistory.map(purchase => {
    const credits =
      purchase.credits < 0
        ? 'Unlimited Sessions'
        : purchase.credits > 1
        ? `${purchase.credits} Sessions`
        : `${purchase.credits} Session`;

    return {
      ...purchase,
      credits,
      date: purchaseFormattedDate(purchase.date),
      price: `$ ${currency(purchase.price, {
        symbol: '$',
        precision: 2,
      })}`,
    };
  });

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <TableContainer className="purchase-history-table">
      <table {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={idx}>
                {row.cells.map((cell, idx) => (
                  <td key={idx} className={cell.column.className} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default PurchaseHistoryTable;

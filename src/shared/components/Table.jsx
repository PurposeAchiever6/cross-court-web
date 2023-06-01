import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';

const SHARED_CLASSES = 'text-sm md:text-base';

const Table = ({ columns, data, className, headerClassName, initialState }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    initialState,
    columns,
    data,
  });

  return (
    <div className={className}>
      <table {...getTableProps({ className: 'w-full border-separate border-spacing-x-0.5' })}>
        <thead>
          {headerGroups.map((headerGroup, k) => (
            <tr key={`row-header-${k}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={`header-${i}`}
                  {...column.getHeaderProps({
                    className: `p-2 text-left bg-cc-blue-900 text-sm text-white ${headerClassName}`,
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, j) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`row-${j}`}>
                {row.cells.map((cell, c) => (
                  <td
                    key={`row-data-${c}`}
                    {...cell.getCellProps({
                      className: `p-3 ${j % 2 ? 'bg-gray-100' : 'bg-white'} ${SHARED_CLASSES} ${
                        cell.column.className ? cell.column.className : ''
                      }`,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  className: '',
  headerClassName: '',
  initialState: {},
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  initialState: PropTypes.shape({}),
};

export default Table;

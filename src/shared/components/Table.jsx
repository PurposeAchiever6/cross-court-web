import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';

const SHARED_CLASSES = 'border border-cc-black text-sm md:text-base bg-gray-100';

const Table = ({ columns, data, className, headerClassName, initialState }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    initialState,
    columns,
    data,
  });

  return (
    <div className={className}>
      <table {...getTableProps({ className: 'w-full' })}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    className: `p-2 ${SHARED_CLASSES} ${headerClassName}`,
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps({
                      className: `p-3 ${SHARED_CLASSES} ${
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

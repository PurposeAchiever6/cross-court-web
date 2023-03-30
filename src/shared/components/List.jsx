import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items, className }) => (
  <ul className={className}>
    {items.map((item, index) => (
      <li
        key={index}
        className="flex items-center leading-[1.5em] mb-[1em] before:block before:flex-shrink-0 before:w-[0.75em] before:h-[0.75em] before:mr-[1.5em] before:bg-cc-purple"
      >
        {item}
      </li>
    ))}
  </ul>
);

List.defaultProps = {
  className: '',
};

List.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default List;

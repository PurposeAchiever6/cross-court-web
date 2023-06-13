import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items, align, variant, bulletsColor, className }) => {
  const alignClasses = (() => {
    switch (align) {
      case 'center':
        return 'items-center';
      case 'top':
      default:
        return 'items-start before:mt-[0.35em]';
    }
  })();

  const variantClasses = (() => {
    switch (variant) {
      case 'cross':
        return "before:text-3xl before:content-['_x'] before:mr-[0.5em]";
      case 'square':
      default:
        return 'before:w-[0.75em] before:h-[0.75em] before:mr-[1.5em]';
    }
  })();

  const bulletsColorClasses = (() => {
    switch (bulletsColor) {
      case 'warning':
        return 'before:text-warning';
      case 'purple':
      default:
        return 'before:bg-cc-purple';
    }
  })();

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex leading-[1.5em] mb-[1em] before:block before:flex-shrink-0 ${variantClasses} ${bulletsColorClasses} ${alignClasses}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  variant: 'square',
  bulletsColor: 'purple',
  align: 'top',
  className: '',
};

List.propTypes = {
  variant: PropTypes.oneOf(['square', 'cross']),
  bulletsColor: PropTypes.oneOf(['purple', 'warning']),
  align: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default List;

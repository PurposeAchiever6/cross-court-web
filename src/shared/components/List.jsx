import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'shared/styles/constants';

const UnorderedList = styled.ul`
  padding: 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    line-height: 1.5em;

    &:before {
      content: '';
      display: block;
      flex-shrink: 0;
      width: 0.75em;
      height: 0.75em;
      margin-right: 1.5em;
      background-color: ${colors.brandPurple};
    }
  }
`;

const List = ({ items, className }) => (
  <UnorderedList className={className}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </UnorderedList>
);

List.defaultProps = {
  className: '',
};

List.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
};

export default List;

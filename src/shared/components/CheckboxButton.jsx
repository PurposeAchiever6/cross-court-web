import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import PropTypes from 'prop-types';

const Container = styled.div`
  button {
    padding: 0;
    -webkit-appearance: none;
    box-shadow: none;
    outline: none;
    background-color: ${colors.white};
    border-width: 0;
  }
`;

const CheckboxButton = ({ onClick, children }) => (
  <Container>
    <button type="button" onClick={onClick}>
      {children}
    </button>
  </Container>
);

CheckboxButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CheckboxButton;

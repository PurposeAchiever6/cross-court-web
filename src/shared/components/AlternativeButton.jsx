import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'shared/styles/constants';

const ButtonContainer = styled.button`
  background-color: ${colors.polarPlum} !important;
  color: #000 !important;
  border-color: ${colors.polarPlum} !important;
  border-radius: 0 !important;
  font-size: 1rem !important;
`;

export const AlternativeButton = ({ children }) => {
  return (
    <ButtonContainer className="button is-primary is-inverted is-outlined is-large is-outlined">
      {children}
    </ButtonContainer>
  );
};

AlternativeButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default AlternativeButton;

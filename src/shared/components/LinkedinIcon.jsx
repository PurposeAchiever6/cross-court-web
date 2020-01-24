import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const IconContainer = styled.span`
  background-color: ${colors.white};
  padding: 1rem;
  color: ${colors.polarPlum};
  border-radius: 3rem;
  padding: 0.5rem 0.7rem;
`;

const LinkedinIcon = () => {
  return (
    <IconContainer>
      <FontAwesomeIcon icon={faLinkedinIn} />
    </IconContainer>
  );
};

export default LinkedinIcon;

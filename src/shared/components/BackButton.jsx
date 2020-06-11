import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';

const BackButtonContainer = styled.button`
  font-size: 1.5rem;
  background-color: transparent;
  border: 0;
  margin-right: 0.5rem;
  margin-left: 3rem;
  margin-top: 2rem;
  cursor: pointer;
  touch-action: manipulation;

  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  @media ${device.mobile} {
    margin-left: 1rem;
    margin-top: 2rem;
    font-size: 1.3rem;

    svg {
      font-size: 1.3rem;
      margin-right: 1rem;
    }
  }
`;

const BackButton = ({ className, showText = true, color = 'black' }) => {
  const { goBack } = useHistory();

  return (
    <BackButtonContainer type="button" className={`go-back ${className}`} onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} color={color} /> {showText && 'Back'}
    </BackButtonContainer>
  );
};

BackButton.propTypes = {
  showText: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default BackButton;

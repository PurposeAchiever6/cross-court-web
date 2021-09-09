import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import backButtonIcon from 'shared/images/back-button.png';

import ROUTES from 'shared/constants/routes';

const BackButtonContainer = styled.button`
  font-size: 1.5rem;
  background-color: transparent;
  border: 0;
  margin-right: 0.5rem;
  margin-left: 3rem;
  cursor: pointer;
  touch-action: manipulation;

  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  @media (max-width: 991px) {
    margin-left: 1rem;
    font-size: 1.3rem;

    svg {
      font-size: 1.3rem;
      margin-right: 1rem;
    }
  }
`;

const BackButton = ({ className = '' }) => {
  const { goBack } = useHistory();
  const history = useHistory();
  const goBackHandler = () => {
    if (window.location.pathname.indexOf('/session/') === 0) {
      history.push(ROUTES.LOCATIONS);
    } else {
      goBack();
    }
  };

  return (
    <BackButtonContainer type="button" className={`go-back ${className}`} onClick={goBackHandler}>
      <img alt="Back" className="back-button" src={backButtonIcon} />
    </BackButtonContainer>
  );
};

BackButton.propTypes = {
  showText: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default BackButton;

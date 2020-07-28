import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ScrollLock from 'react-scrolllock';

import ROUTES from 'shared/constants/routes';
import { claimFreeSessionInit } from 'screens/payments/actionCreators';
import { setSelectedProduct } from 'screens/series/actionCreators';
import { getAvailableProducts } from 'screens/series/reducer';

import Button from 'shared/components/Button';

const FreeSessionModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .title {
    font-size: 1.75rem;
    line-height: 1.9rem;
    color: #000000;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  .text {
    color: #000000;
    margin-bottom: 3rem;
  }

  svg {
    right: 0;
    position: absolute;
    top: 0;
    font-size: 1.25rem;
    color: #000;
    cursor: pointer;
    font-size: 1.75rem;
  }
`;

const FreeSessionModal = ({ closeHandler, isOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const availableProducts = useSelector(getAvailableProducts);

  const selectProductHandler = product => {
    dispatch(setSelectedProduct(product));
    history.push(ROUTES.PAYMENTS);
  };

  const claimFreeSessionAction = () => {
    const selectedProduct = head(
      availableProducts.filter(product => product.name === 'Free Session')
    );

    closeHandler();
    dispatch(claimFreeSessionInit());
    selectProductHandler(selectedProduct);
  };

  return (
    <ScrollLock isActive={isOpen}>
      <FreeSessionModalContainer className="free-session-modal">
        <FontAwesomeIcon icon={faTimes} onClick={closeHandler} />
        <span className="title">LET&apos;S SWEAT!</span>
        <span className="text">
          While your first Session is on us, we do require you to input a payment method in case you
          do not show up and we have to charge your account.
        </span>
        <Button className="ar-button inverted" onClick={claimFreeSessionAction}>
          <div className="ar-button-inner">I UNDERSTAND</div>
        </Button>
      </FreeSessionModalContainer>
    </ScrollLock>
  );
};

FreeSessionModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default FreeSessionModal;

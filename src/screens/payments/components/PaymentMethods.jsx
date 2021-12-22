import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import { getUserProfile } from 'screens/my-account/reducer';
import CCIcon from 'shared/components/CCIcon';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { deleteCard, setSelectedCard } from '../actionCreators';

const PaymentMethodsContainer = styled.div`
  width: 35%;

  .payment-methods-container {
    border: 1px solid #bbbecd;
    display: flex;
    flex-direction: column;
    min-height: 13rem;
    justify-content: flex-start;
    .empty-message {
      min-height: 15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      font-weight: 500;
      color: #bbbecd;
      text-align: center;
    }
    .credit-card-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 1rem;
      border-bottom: 1px solid #bbbecd;
      &:last-child {
        border-bottom: 0;
      }
      .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ccnumber-container {
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 22px;
        letter-spacing: 0.1rem;
      }
      .expire-container {
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: italic;
        font-weight: normal;
        font-size: 1rem;
        line-height: 1.3rem;
      }
      .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button {
        font-size: 1rem;
        padding: 0.25rem;
        background-color: transparent;
        border: 0;
        cursor: pointer;
      }
      .select-container {
        border: 1px solid #bbbecd;
        border-radius: 50px;
        padding: 0.25rem;
      }
      .selector {
        background-color: white;
        height: 2rem;
        width: 2rem;
        border-radius: 50px;
      }
      .selected {
        background-color: #9999ff;
      }
    }
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
    margin: 4rem 0;

    .alt-btn {
      color: #000;
      border-color: #000;
    }
  }

  @media (max-width: 991px) {
    width: 85%;

    .payment-methods-container {
      .credit-card-container {
        align-items: center;
        .select-container {
          padding: 0.1rem;
          height: 1rem;
          width: 1rem;
          display: flex;
        }
        .cc-info {
          .brand {
            display: flex;
          }
          .ccnumber-container {
            width: auto;
            font-size: 1rem;
          }
          .expire-container {
            width: auto;
            font-size: 0.8rem;
          }
        }
        .selector {
          height: 1rem;
          width: 1rem;
        }
        .selected {
        }
      }
    }
  }

  .buttons-container {
    .alt-btn {
      height: 100%;
    }
  }
`;

const PaymentMethods = ({ availableCards }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector(getUserProfile);

  const [selectedCard, setSelectedCard2] = useState('');

  const deleteCardHandler = (paymentMethodId) => dispatch(deleteCard(paymentMethodId));
  const selectedCardHandler = (paymentMethod) => {
    dispatch(setSelectedCard(paymentMethod));
    setSelectedCard2(paymentMethod.id);
  };

  const redirectUrl = window.localStorage.getItem('redirect');

  const shouldReturnFSFDetailsPage = () =>
    isUserInFirstFreeSessionFlow(userInfo) && availableCards.length && redirectUrl;

  const nextHandler = () => {
    if (shouldReturnFSFDetailsPage()) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    } else {
      history.push('/checkout');
    }
  };

  return (
    <PaymentMethodsContainer className="payments">
      <h2 className="mb-8">CHOOSE A PAYMENT METHOD</h2>
      <div className="payment-methods-container">
        {isEmpty(availableCards) ? (
          <div className="empty-message">There are no payment methods added yet.</div>
        ) : (
          availableCards.map((payment) => {
            const isCardSelected = selectedCard === payment.id;
            return (
              <div className="credit-card-container" key={payment.id}>
                <div className="select-container">
                  <button
                    className={`${isCardSelected ? 'selector selected' : 'selector'}`}
                    type="button"
                    onClick={() => selectedCardHandler(payment)}
                  />
                </div>
                <div className="icon-container">
                  <CCIcon ccType={payment.card.brand} />
                </div>
                <div className="cc-info">
                  <div className="ccnumber-container">
                    <span>{`***${payment.card.last4}`}</span>
                  </div>
                  <div className="expire-container">
                    <span>Expires {`${payment.card.expMonth}/${payment.card.expYear}`}</span>
                  </div>
                </div>
                <div className="button-container">
                  <button type="button" onClick={() => deleteCardHandler(payment.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="buttons-container">
        <PrimaryButton to={ROUTES.PAYMENTSADDCARD} inverted>
          ADD NEW CARD
        </PrimaryButton>
        <PrimaryButton disabled={isEmpty(selectedCard)} onClick={nextHandler}>
          NEXT
        </PrimaryButton>
      </div>
    </PaymentMethodsContainer>
  );
};

PaymentMethods.propTypes = {
  availableCards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PaymentMethods;

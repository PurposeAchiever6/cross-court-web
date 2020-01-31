import React, { useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import CCIcon from 'shared/components/CCIcon';
import { Link, useHistory } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';
import device from 'shared/styles/constants';
import { deleteCard, setSelectedCard } from '../actionCreators';

const PaymentMethodsContainer = styled.div`
  width: 25%;
  margin-top: 5rem;

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
        background-color: #aaaff3;
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

  @media ${device.mobile} {
    width: 85%;

    .payment-methods-container {
      .credit-card-container {
        align-items: center;
        &:last-child {
        }
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

  const [selectedCard, setSelectedCard2] = useState('');

  const deleteCardHandler = paymentMethodId => dispatch(deleteCard(paymentMethodId));
  const selectedCardHandler = paymentMethod => {
    dispatch(setSelectedCard(paymentMethod));
    setSelectedCard2(paymentMethod.id);
  };

  const nextHandler = () => {
    history.push('/checkout');
  };

  return (
    <PaymentMethodsContainer>
      <h2>Choose a Payment Method</h2>
      <div className="payment-methods-container">
        {isEmpty(availableCards) ? (
          <div className="empty-message">
            <span>There are no payment methods added yet</span>
          </div>
        ) : (
          availableCards.map(payment => {
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
                    <span>{`**** ${payment.card.last4}`}</span>
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
        <Link to={ROUTES.PAYMENTSADDCARD}>
          <AlternativeButton className="alt-btn">Add New Card</AlternativeButton>
        </Link>
        <Button disabled={isEmpty(selectedCard)} onClick={nextHandler}>
          Next
        </Button>
      </div>
    </PaymentMethodsContainer>
  );
};

export default PaymentMethods;

import React from 'react';
import { useSelector } from 'react-redux';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import styled from 'styled-components';
import device from 'shared/styles/mediaQueries';
import Button from 'shared/components/Button';
import { getAddCardLoading } from '../reducer';

const AddCardContainer = styled.div`
  h2 {
    margin: 4.2rem 0;
    margin-left: 2rem;
  }
  margin-bottom: 5rem;
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5.1rem;
    .card-number-element {
      width: 12rem;
    }
    .expiration-date-element {
      width: 4rem;
    }
    .cvc-element {
      width: 2rem;
    }
    .row-container {
      display: flex;
    }
    .label {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      text-transform: uppercase;
      /* Polar Plum */
      color: #aaaff3;
      margin-left: 2rem;
    }
    input,
    .StripeElement {
      display: block;
      margin: 10px 0 20px 0;
      padding: 10px 14px;
      font-size: 1em;
      border: 1px solid rgba(0, 0, 0, 0.2);

      outline: 0;
      border-radius: 0;
      background: white;
    }

    input::placeholder {
      color: #aab7c4;
    }

    input:focus,
    .StripeElement--focus {
      box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
      -webkit-transition: all 150ms ease;
      transition: all 150ms ease;
    }
  }
  .buttons-container {
    display: flex;
    justify-content: center;
  }

  @media ${device.mobile} {
    .card-container {
      flex-direction: column;
    }
    .label {
      margin-left: 0;

      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const AddCard = ({ stripe, elements, addCardHandler }) => {
  const addCardLoading = useSelector(getAddCardLoading);
  const submitHandler = e => {
    e.preventDefault();

    const cardElement = elements.getElement('cardNumber');

    addCardHandler(stripe, cardElement);
  };

  return (
    <AddCardContainer className="add-card">
      <h2>ADD NEW CARD</h2>
      <div className="card-container">
        <span className="label card-number">
          Card Number
          <CardNumberElement className="card-number-element" />
        </span>
        <div className="row-container">
          <span className="label card-expire">
            Expiration
            <CardExpiryElement className="expiration-date-element" />
          </span>
          <span className="label card-cvc">
            CVC
            <CardCvcElement className="cvc-element" />
          </span>
        </div>
      </div>
      <div className="buttons-container">
        <Button
          className="ar-button"
          onClick={submitHandler}
          loading={addCardLoading}
          disabled={addCardLoading}
        >
          <div className="ar-button-inner">ADD</div>
        </Button>
      </div>
    </AddCardContainer>
  );
};

export default injectStripe(AddCard);

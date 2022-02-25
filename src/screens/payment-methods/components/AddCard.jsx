import React from 'react';
import { useSelector } from 'react-redux';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import styled from 'styled-components';
import { getAddCardLoading } from '../reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const AddCardContainer = styled.div`
  input,
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    padding: 10px 14px;
    font-size: 1em;
    border: 1px solid black;
    outline: 0;
    border-radius: 0;
    background: #fbf7f3;
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
`;

const AddCard = ({ stripe, elements, addCardHandler }) => {
  const addCardLoading = useSelector(getAddCardLoading);
  const submitHandler = (e) => {
    e.preventDefault();

    const cardElement = elements.getElement('cardNumber');

    addCardHandler(stripe, cardElement);
  };

  return (
    <AddCardContainer className="flex flex-col">
      <h2 className="font-shapiro95_super_wide text-lg mb-8 text-center mx-4">
        ADD NEW PAYMENT METHOD
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center mb-8">
        <span className="w-screen px-6 md:p-0 md:w-44">
          <p className="text-sm text-cc-purple font-shapiro95_super_wide uppercase">Card Number</p>
          <CardNumberElement />
        </span>
        <span className="md:ml-8 px-6 md:p-0 w-screen md:w-32">
          <p className="text-sm text-cc-purple font-shapiro95_super_wide uppercase">Expiration</p>
          <CardExpiryElement />
        </span>
        <span className="md:ml-8 px-6 md:p-0 w-screen md:w-16">
          <p className="text-sm text-cc-purple font-shapiro95_super_wide uppercase">CVC</p>
          <CardCvcElement />
        </span>
      </div>
      <PrimaryButton onClick={submitHandler} loading={addCardLoading}>
        ADD
      </PrimaryButton>
    </AddCardContainer>
  );
};

export default injectStripe(AddCard);

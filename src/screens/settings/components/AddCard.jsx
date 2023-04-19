import React from 'react';
import { useSelector } from 'react-redux';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import { getAddCardLoading } from 'screens/payment-methods/reducer';

const AddCardContainer = styled.div`
  input,
  .StripeElement {
    display: block;
    padding-left: 1rem; // px-4
    padding-right: 1rem;
    padding-top: 1.25rem; // py-5
    padding-bottom: 1.25rem;
    background-color: rgb(31 31 51 / 1); // bg-cc-blue-500
    border-width: 1px; // border
    border-color: rgb(31 31 51 / 1); // border-cc-blue-500
    &:hover {
      border-color: rgb(31 31 51 / 1); // border-cc-blue-500
    }
    outline: 0;
    border-radius: 0;
  }
`;

const elementsStyle = { base: { fontSize: '16px', color: '#FBF7F3' } };

const AddCard = ({ stripe, elements, addCardHandler }) => {
  const addCardLoading = useSelector(getAddCardLoading);
  const submitHandler = (e) => {
    e.preventDefault();

    const cardElement = elements.getElement('cardNumber');

    addCardHandler(stripe, cardElement);
  };

  return (
    <AddCardContainer className="flex flex-col gap-2 w-full">
      <CardNumberElement style={elementsStyle} />
      <div className="flex gap-2">
        <CardExpiryElement style={elementsStyle} className="w-1/2 !text-white" />
        <CardCvcElement style={elementsStyle} className="w-1/2" />
      </div>
      <Button
        className="w-max mt-4"
        variant="outline-white"
        onClick={submitHandler}
        loading={addCardLoading}
      >
        SUBMIT
      </Button>
    </AddCardContainer>
  );
};

export default injectStripe(AddCard);

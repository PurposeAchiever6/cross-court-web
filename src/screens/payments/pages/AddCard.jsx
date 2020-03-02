import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader';
import { useDispatch } from 'react-redux';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import Loading from 'shared/components/Loading';
import { addCard } from '../actionCreators';
import AddCardStripe from '../components/AddCard';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddCard = () => {
  const env = runtimeEnv();
  const STRIPE_API_KEY = env.REACT_APP_STRIPE_API_KEY;

  const dispatch = useDispatch();
  const addCardHandler = (stripe, cardElement) => dispatch(addCard(stripe, cardElement));

  return (
    <StripeScriptLoader uniqueId="stripeLib" script="https://js.stripe.com/v3/" loader={Loading}>
      <StripeProvider apiKey={STRIPE_API_KEY}>
        <PageContainer>
          <Elements>
            <AddCardStripe addCardHandler={addCardHandler} />
          </Elements>
        </PageContainer>
      </StripeProvider>
    </StripeScriptLoader>
  );
};

export default AddCard;

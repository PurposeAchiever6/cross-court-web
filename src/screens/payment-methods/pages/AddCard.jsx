import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader';
import { useDispatch } from 'react-redux';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { useLocation } from 'react-router-dom';

import Loading from 'shared/components/Loading';
import { addCard } from '../actionCreators';
import AddCardStripe from 'screens/payment-methods/components/AddCard';

const AddCard = () => {
  const env = runtimeEnv();
  const STRIPE_API_KEY = env.REACT_APP_STRIPE_API_KEY;
  const location = useLocation();
  const redirectTo = location.state.redirectTo;

  const dispatch = useDispatch();
  const addCardHandler = (stripe, cardElement) =>
    dispatch(addCard(stripe, cardElement, redirectTo));

  return (
    <div className="min-h-screen flex flex-col items-center mt-20 md:mt-40">
      <StripeScriptLoader
        uniqueId="stripeLib"
        script="https://js.stripe.com/v3/"
        loader={<Loading />}
      >
        <StripeProvider apiKey={STRIPE_API_KEY}>
          <Elements>
            <AddCardStripe addCardHandler={addCardHandler} />
          </Elements>
        </StripeProvider>
      </StripeScriptLoader>
    </div>
  );
};

export default AddCard;

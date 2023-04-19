import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { addCard } from 'screens/payment-methods/actionCreators';
import Loading from 'shared/components/Loading';
import AddCard from 'screens/settings/components/AddCard';
import ROUTES from 'shared/constants/routes';

const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [stripeLoaded, setStripeLoaded] = useState({});

  const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_API_KEY;
  const redirectTo = location.state?.redirectTo ?? ROUTES.BILLING;

  const addCardHandler = (stripe, cardElement) => {
    dispatch(addCard(stripe, cardElement, redirectTo));
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve({ successful: true });
      });
      script.addEventListener('error', () => {
        reject();
      });
      document.head.appendChild(script);
    });

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadScript('https://js.stripe.com/v3/');
      setStripeLoaded(result);
    };
    fetchData();
  }, []);

  return stripeLoaded.successful ? (
    <StripeProvider apiKey={STRIPE_API_KEY}>
      <Elements>
        <AddCard addCardHandler={addCardHandler} />
      </Elements>
    </StripeProvider>
  ) : (
    <Loading />
  );
};

export default AddPaymentMethod;

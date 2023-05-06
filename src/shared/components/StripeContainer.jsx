import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

const StripeContainer = ({ children }) => {
  const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLISHABLE_KEY));
  }, []);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

StripeContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StripeContainer;

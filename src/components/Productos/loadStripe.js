import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Cargar Stripe usando tu clave pública
const stripePromise = loadStripe('pk_test_51Q2bhrL6Uwo5yj7nQJIPVxVbUWiz48NmkIB4rwvZkVFGZoFO9mEjngGKbeTzG1KtQCgWIiwhgjv3T4KrQDDgIUeO002GVJR4iS');

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

const PaymentForm = ({ amount, name, email }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/payment-sheet',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            name: name,
            amount: amount * 100, // Enviar el monto en centavos
            currency: 'mxn',
          }),
        }
      );

      const { paymentIntent } = await response.json();

      const { error, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmCardPayment(paymentIntent, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: name },
          },
        });

      if (error) {
        setPaymentResult(`Error: ${error.message}`);
      } else if (confirmedPaymentIntent.status === 'succeeded') {
        setPaymentResult('Pago exitoso!');
      }
    } catch (error) {
      setPaymentResult(`Error: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Formulario de Pago</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <CardElement
          className="p-2"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Procesando...' : 'Pagar'}
      </button>
      {paymentResult && (
        <p className="text-center text-green-600 font-semibold">{paymentResult}</p>
      )}
    </form>
  );
};

export default PaymentForm;
PaymentForm.propTypes = {
    amount: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  
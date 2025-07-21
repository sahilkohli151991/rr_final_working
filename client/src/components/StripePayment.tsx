import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// Import from @stripe/react-stripe-js for React components
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// Import from @stripe/stripe-js for core Stripe types
import type { Stripe, PaymentIntent } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  // In Vite, we should use import.meta.env instead of process.env
  // Default to the test key if environment variable is not set
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51MPfj5JSLOfCCYKO5q84BcSai24N9d4n5d8XaWplBcteTBBcjCPsLAwTh7TJQO5vVnyAwONCpiNbsCAOLISTtfD900zxSeufUH'
);

interface StripePaymentFormProps {
  amount: number;
  productName: string;
  productDescription: string;
  onSuccess?: (paymentIntent: PaymentIntent) => void;
  onError?: (error: Error) => void;
  successUrl?: string;
  cancelUrl?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  productName,
  productDescription,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create a payment intent on the server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          name: productName,
          description: productDescription,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: window.location.href,
        }),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create payment session');
      }

      // 2. Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }

      // 3. If we get here, the redirect was successful
      if (onSuccess) {
        onSuccess(session);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="stripe-payment-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

// Export the form component for use in other components
export const CheckoutForm = StripePaymentForm;

// Also export the default wrapped version
export const StripePayment: React.FC<StripePaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm {...props} />
    </Elements>
  );
};

export default StripePayment;

import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51MPfj5JSLOfCCYKO5q84BcSai24N9d4n5d8XaWplBcteTBBcjCPsLAwTh7TJQO5vVnyAwONCpiNbsCAOLISTtfD900zxSeufUH';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

type StripeCheckoutButtonProps = {
  amount: number;
  name: string;
  description: string;
};

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ amount, name, description }) => {
  const handleClick = async () => {
    const successUrl = `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/payment-cancel`;
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, name, description, successUrl, cancelUrl }),
    });
    const data = await res.json();
    console.log('Stripe session response:', data);
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error('Stripe redirect error:', error);
        alert('Payment failed: ' + error.message);
      }
    } else {
      alert('Stripe.js failed to load');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 px-6 bg-[#635bff] hover:bg-[#3f2b96] text-white font-medium rounded-lg transition-colors duration-200"
    >
      Pay with Card (Stripe)
    </button>
  );
};

export default StripeCheckoutButton;
import { useEffect, useRef, useState } from 'react';

interface PayPalSmartButtonProps {
  amount: number;
  description: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

export function PayPalSmartButton({ amount, description, onSuccess, onError }: PayPalSmartButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    if (window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description,
              amount: {
                value: amount.toFixed(2),
                currency_code: 'USD'
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const details = await actions.order.capture();
          setSuccess(true);
          setLoading(false);
          if (onSuccess) onSuccess(details);
        },
        onError: (err: any) => {
          setError('Payment failed. Please try again or contact support.');
          setLoading(false);
          if (onError) onError(err);
        },
        onInit: () => {
          setLoading(false);
        }
      }).render(paypalRef.current);
    } else {
      setError('PayPal SDK failed to load. Please refresh the page.');
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [amount, description]);

  return (
    <div className="space-y-3">
      {loading && (
        <div className="flex items-center justify-center py-4">
          <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="ml-2 text-blue-600 font-medium">Loading payment options…</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-semibold">
          Payment successful! Thank you for your purchase.
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center font-semibold">
          {error}
        </div>
      )}
      <div ref={paypalRef} className={loading ? 'opacity-50 pointer-events-none' : ''}></div>
    </div>
  );
} 
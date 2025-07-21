import { useEffect, useRef, useState } from 'react';

interface PayPalHostedButtonProps {
  planName: string;
  amount: number;
  hostedButtonId: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalHostedButton({ planName, amount, hostedButtonId }: PayPalHostedButtonProps) {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hostedButtonId) {
      setError('PayPal button ID not configured');
      setLoading(false);
      return;
    }

    const loadButton = async () => {
      try {
        if (paypalButtonRef.current && window.paypal) {
          // Clear any existing buttons
          paypalButtonRef.current.innerHTML = '';
          
          // Create container for hosted button
          const container = document.createElement('div');
          container.id = `paypal-button-${hostedButtonId}`;
          paypalButtonRef.current.appendChild(container);
          
          // Render PayPal hosted button
          await window.paypal.Buttons({
            createOrder: () => hostedButtonId,
            onApprove: () => {
              // Payment approved
              console.log('Payment approved');
            },
            onError: (err: any) => {
              console.error('PayPal error:', err);
              setError('Payment failed. Please try again.');
            }
          }).render(`#paypal-button-${hostedButtonId}`);
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering PayPal button:', err);
        setError('Failed to load payment button');
        setLoading(false);
      }
    };

    loadButton();
  }, [hostedButtonId]);

  return (
    <div className="space-y-3">
      {/* Product Information */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600 mb-1">{planName}</p>
        <p className="text-lg font-semibold text-gray-800">${amount.toLocaleString()}</p>
      </div>

      {/* PayPal Button Container */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-sm text-gray-600">Loading payment options...</span>
        </div>
      )}
      {error && (
        <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      <div ref={paypalButtonRef} className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'}></div>

      {/* Secure Transaction Badge */}
      <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="currentColor"/>
          <path d="M9 11L11 13L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Secure Transaction
      </div>
    </div>
  );
} 
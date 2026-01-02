import { useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount: number;
  planName: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalButton({ amount, planName, onSuccess, onError }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
      // Clear any existing buttons
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: (_: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `RoleRaise ${planName} Plan`,
                amount: {
                  currency_code: 'USD',
                  value: amount.toString()
                }
              }
            ]
          });
        },
        onApprove: async (_: any, actions: any) => {
          const order = await actions.order.capture();
          onSuccess(order);
        },
        onError: (err: any) => {
          onError(err);
        }
      }).render(paypalRef.current);
    }
  }, [amount, planName, onSuccess, onError]);

  return <div ref={paypalRef} />;
} 
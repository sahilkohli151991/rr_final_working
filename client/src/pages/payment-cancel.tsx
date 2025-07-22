import React from "react";

const PaymentCancel: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Failed or Cancelled</h1>
        <p className="text-lg text-gray-700 mb-2">
          Your payment was not completed. This could be due to insufficient funds, a declined card, or you cancelled the payment.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Please check your card details or try again with a different payment method.
        </p>
        <a href="/" className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentCancel;

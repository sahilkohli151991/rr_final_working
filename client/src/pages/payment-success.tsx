import React from "react";

const PaymentSuccess: React.FC = () => {
  // Optionally, parse session_id from URL for more details
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Thank you for your payment. Your transaction was successful.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500 mb-4">Session ID: {sessionId}</p>
        )}
        <a href="/" className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;

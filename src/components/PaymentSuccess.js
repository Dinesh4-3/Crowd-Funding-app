import React from 'react';

function PaymentSuccess({ amount, onClose }) {
  return (
    <div className="payment-success-overlay">
      <div className="payment-success-modal">
        <div className="success-icon">✓</div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your contribution of ${amount}</p>
        <button onClick={onClose} className="close-button">
          Continue
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess; 
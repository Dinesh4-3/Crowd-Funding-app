import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase/config';
import PaymentSuccess from './PaymentSuccess';

const updateProjectStats = async (projectId, amount) => {
  const projectRef = doc(db, 'projects', projectId);
  
  try {
    await runTransaction(db, async (transaction) => {
      const projectDoc = await transaction.get(projectRef);
      if (!projectDoc.exists()) {
        throw new Error('Project does not exist!');
      }

      const currentAmount = projectDoc.data().amountRaised || 0;
      const currentBackers = projectDoc.data().backersCount || 0;

      transaction.update(projectRef, {
        amountRaised: currentAmount + amount,
        backersCount: currentBackers + 1
      });
    });
  } catch (error) {
    console.error('Error updating project stats:', error);
    throw error;
  }
};

const handlePaymentSuccess = async (projectId, amount) => {
  try {
    // Update project stats
    await runTransaction(db, async (transaction) => {
      const projectRef = doc(db, 'projects', projectId);
      const projectDoc = await transaction.get(projectRef);
      
      if (!projectDoc.exists()) {
        throw new Error('Project not found');
      }

      const currentAmount = projectDoc.data().raised || 0;
      const currentBackers = projectDoc.data().backersCount || 0;

      transaction.update(projectRef, {
        raised: currentAmount + Number(amount),
        backersCount: currentBackers + 1
      });
    });
    
    // Show success message
    toast.success('Payment Successful! Thank you for your support! 🎉');
    
    // Redirect after a delay
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 3000);
    
  } catch (error) {
    console.error('Error processing payment:', error);
    toast.error('Something went wrong. Please try again.');
  }
};

function Payment() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Your payment processing logic here
      
      // After successful payment
      await handlePaymentSuccess(projectId, paymentAmount);
      setShowSuccess(true);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div>
      {/* Your payment form */}
      
      {showSuccess && (
        <PaymentSuccess 
          amount={paymentAmount}
          onClose={() => {
            setShowSuccess(false);
            // Optionally redirect here
            navigate(`/project/${projectId}`);
          }}
        />
      )}
    </div>
  );
}

export default Payment;
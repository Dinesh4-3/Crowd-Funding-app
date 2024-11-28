import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../firebase/config';
import { createFunding } from '../firebase/funding';
import { initializePayment } from '../services/payu';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

function PayUForm({ project, isAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated || !auth.currentUser) {
      toast.error('Please login first');
      return;
    }

    try {
      const fundingData = {
        projectId: project.id,
        userId: auth.currentUser.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: Number(formData.amount),
        message: formData.message,
        status: 'pending'
      };

      // Create funding and update project stats
      const { fundingId } = await createFunding(fundingData);

      // Initialize payment with redirect handling
      await initializePayment({
        ...fundingData,
        fundingId: fundingId,
        onSuccess: () => {
          navigate('/');
          toast.success('Payment Successful! Thank you for your support!');
        },
        onFailure: () => {
          navigate('/');
          toast.error('Payment failed. Please try again.');
        }
      });

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
        required
      />
      <textarea
        placeholder="Message (optional)"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </form>
  );
}

export default PayUForm; 
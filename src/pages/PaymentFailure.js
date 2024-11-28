import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/projects');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-red-600">
        Payment Failed
      </h1>
      <p className="mt-4">Sorry, your payment could not be processed.</p>
      <p className="mt-2">Redirecting you back to projects...</p>
    </div>
  );
}

export default PaymentFailure; 
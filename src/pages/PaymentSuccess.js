import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'react-feather'; // Make sure react-feather is installed

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/projects');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your contribution. Your payment has been processed successfully.
        </p>
        <div className="text-sm text-gray-500">
          Redirecting you back to projects in 5 seconds...
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Return to Projects
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess; 
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';

function Navbar({ user }) {
  return (
    <nav className="bg-green-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-white text-green-600 px-3 py-1 rounded">CF</span>
              <span className="text-xl font-semibold text-white">CrowdFund</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-white hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/create-project" 
                  className="text-white hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Create Project
                </Link>
                <button
                  onClick={() => auth.signOut()}
                  className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 






























import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { Toaster } from 'react-hot-toast';
import { getProjects } from './firebase/projects';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateProject from './components/CreateProject';
import CrowdfundingPage from './components/CrowdfundingPage';
import Spinner from './components/Spinner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Projects effect
  useEffect(() => {
    const loadProjects = async () => {
      setProjectsLoading(true);
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setProjectsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<CrowdfundingPage projects={projects} isAuthenticated={!!user} />} />
          <Route path="/projects" element={<CrowdfundingPage projects={projects} isAuthenticated={!!user} />} />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/" />} 
          />
          <Route 
            path="/create-project" 
            element={user ? <CreateProject user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

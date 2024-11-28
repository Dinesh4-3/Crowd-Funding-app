import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard';

function Home({ projects, isAuthenticated }) {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      toast.success('Payment Successful! Thank you for your support! 🎉');
    } else if (status === 'failure') {
      toast.error('Payment failed. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Support Amazing Projects
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}

export default Home; 
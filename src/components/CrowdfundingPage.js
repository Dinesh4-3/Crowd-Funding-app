import ProjectCard from './ProjectCard';

function CrowdfundingPage({ projects, isAuthenticated }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support innovative projects and help make dreams come true
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CrowdfundingPage; 















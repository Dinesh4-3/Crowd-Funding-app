import { useState } from 'react';
import { Link } from 'react-router-dom';
import PayUForm from './PayUForm';
import { formatINR } from '../utils/format';

function ProjectCard({ project, isAuthenticated }) {
  const [showFundingForm, setShowFundingForm] = useState(false);
  const progress = project.raised ? (project.raised / project.goal) * 100 : 0;

  return (
    <div className="campaign-card group">
      <div className="relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="campaign-image"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="campaign-content">
        <h2 className="campaign-title">{project.title}</h2>
        <p className="campaign-description">{project.description}</p>
        <p className="campaign-creator">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span>{project.creatorName || 'Anonymous'}</span>
        </p>

        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="campaign-stats">
          <div>
            <p className="font-semibold">{formatINR(project.raised || 0)}</p>
            <p>raised of {formatINR(project.goal)}</p>
          </div>
          <div>
            <p className="font-semibold">{Math.round((project.raised / project.goal) * 100)}%</p>
            <p>funded</p>
          </div>
          <div>
            <p className="font-semibold">{project.daysLeft}</p>
            <p>days left</p>
          </div>
        </div>

        <button
          onClick={() => setShowFundingForm(!showFundingForm)}
          className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          {showFundingForm ? 'Close Form' : 'Fund This Project'}
        </button>

        {showFundingForm && (
          <div className="mt-4">
            <PayUForm 
              project={project} 
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard; 






























































































































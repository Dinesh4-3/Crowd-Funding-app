import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

function CampaignStats({ projectId }) {
  const [stats, setStats] = useState({
    amountRaised: 0,
    backersCount: 0,
    goal: 0
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'projects', projectId), 
      (doc) => {
        if (doc.exists()) {
          setStats({
            amountRaised: doc.data().amountRaised || 0,
            backersCount: doc.data().backersCount || 0,
            goal: doc.data().goal || 0
          });
        }
      });

    return () => unsubscribe();
  }, [projectId]);

  return (
    <div className="campaign-stats">
      <div className="stat-box">
        <h3>Raised</h3>
        <p>${stats.amountRaised.toLocaleString()}</p>
        <p>of ${stats.goal.toLocaleString()} goal</p>
      </div>
      <div className="stat-box">
        <h3>Backers</h3>
        <p>{stats.backersCount}</p>
      </div>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{
            width: `${Math.min((stats.amountRaised / stats.goal) * 100, 100)}%`
          }}
        />
      </div>
    </div>
  );
}

export default CampaignStats; 
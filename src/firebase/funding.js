import { collection, addDoc, updateDoc, doc, increment, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export const createFunding = async (fundingData) => {
  try {
    const projectRef = doc(db, 'projects', fundingData.projectId);
    
    const result = await runTransaction(db, async (transaction) => {
      const projectDoc = await transaction.get(projectRef);
      if (!projectDoc.exists()) {
        throw new Error('Project not found');
      }

      // Create funding document
      const fundingRef = doc(collection(db, 'fundings'));
      
      // Get current values
      const currentAmount = projectDoc.data().raised || 0;
      const currentBackers = projectDoc.data().backersCount || 0;

      // Update project stats
      transaction.update(projectRef, {
        raised: currentAmount + Number(fundingData.amount),
        backersCount: currentBackers + 1
      });

      // Set funding document
      transaction.set(fundingRef, {
        ...fundingData,
        createdAt: serverTimestamp()
      });

      return { 
        fundingId: fundingRef.id,
        newAmount: currentAmount + Number(fundingData.amount)
      };
    });

    return result;
  } catch (error) {
    console.error('Funding error:', error);
    throw error;
  }
}; 
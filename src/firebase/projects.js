import { collection, addDoc, getDocs, query, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export const uploadProjectImage = async (imageFile) => {
  if (!imageFile) return null;
  
  try {
    if (!imageFile.type.match('image.*')) {
      throw new Error('Only image files are allowed');
    }

    // Compress and resize image before uploading
    const maxWidth = 800; // Max width in pixels
    const maxSize = 500 * 1024; // Max size in bytes (500KB)

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const image = new Image();

      reader.onload = (e) => {
        image.src = e.target.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          let width = image.width;
          let height = image.height;

          // Calculate new dimensions
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress image
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          // Convert to base64 with reduced quality
          let quality = 0.7;
          let base64String = canvas.toDataURL('image/jpeg', quality);
          
          // Reduce quality if size is still too large
          while (base64String.length > maxSize && quality > 0.1) {
            quality -= 0.1;
            base64String = canvas.toDataURL('image/jpeg', quality);
          }

          resolve(base64String);
        };
        image.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image. Please try again.');
  }
};

export const createProject = async (projectData, userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    console.log('Processing image...');
    const imageData = await uploadProjectImage(projectData.image);
    if (!imageData) {
      throw new Error('Failed to process image');
    }
    console.log('Image processed successfully');

    const newProject = {
      title: projectData.title.trim(),
      description: projectData.description.trim(),
      goal: parseFloat(projectData.goal),
      endDate: new Date(projectData.endDate).toISOString(),
      imageUrl: imageData, // This will now be a base64 string
      createdBy: userId,
      creatorName: userDoc.data().displayName || 'Anonymous',
      createdAt: serverTimestamp(),
      amountRaised: 0,
      backersCount: 0,
      status: 'active'
    };

    console.log('Creating project...');
    const docRef = await addDoc(collection(db, 'projects'), newProject);
    console.log('Project created successfully:', docRef.id);

    return { id: docRef.id, ...newProject };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const projectsQuery = query(collection(db, 'projects'));
    const querySnapshot = await getDocs(projectsQuery);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (error) {
    throw error;
  }
}; 































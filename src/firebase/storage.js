import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';







import { storage } from './config';















export const uploadProjectImage = async (imageFile, onProgress) => {







  if (!imageFile) return null;







  







  try {







    // Validate file type







    if (!imageFile.type.match('image.*')) {







      throw new Error('Only image files are allowed');







    }















    // Validate file size (1MB max for base64)







    if (imageFile.size > 1024 * 1024) {







      throw new Error('Image size should be less than 1MB');







    }















    // Convert to base64







    return new Promise((resolve, reject) => {







      const reader = new FileReader();







      reader.onprogress = (event) => {







        if (event.lengthComputable && onProgress) {







          const progress = (event.loaded / event.total) * 100;







          onProgress(progress);







        }







      };







      reader.onloadend = () => {







        onProgress && onProgress(100);







        resolve(reader.result);







      };







      reader.onerror = reject;







      reader.readAsDataURL(imageFile);







    });







  } catch (error) {







    console.error('Error processing image:', error);







    throw error;







  }







}; 







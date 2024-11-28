import SHA512 from 'crypto-js/sha512';

export const generateHash = async (hashString) => {
  try {
    // Generate SHA512 hash using crypto-js
    const hash = SHA512(hashString).toString();
    return hash;
  } catch (error) {
    console.error('Hash generation error:', error);
    throw error;
  }
}; 
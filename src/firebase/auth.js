import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store user data in Firestore if first time
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
      });
    }

    // Store login history
    await setDoc(doc(db, 'login_history', `${user.uid}_${Date.now()}`), {
      userId: user.uid,
      email: user.email,
      timestamp: serverTimestamp(),
      provider: 'google',
      deviceInfo: {
        userAgent: navigator.userAgent,
      }
    });

    return user;
  } catch (error) {
    console.error('Google login error:', error);
    throw new Error('Failed to login with Google. Please try again.');
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'login_history', `${user.uid}_${Date.now()}`), {
      userId: user.uid,
      email: user.email,
      timestamp: serverTimestamp(),
      provider: 'email',
      deviceInfo: {
        userAgent: navigator.userAgent,
      }
    });

    return user;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password');
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

export const signupUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      createdAt: serverTimestamp(),
      projects: []
    });

    await setDoc(doc(db, 'login_history', `${user.uid}_${Date.now()}`), {
      userId: user.uid,
      email: user.email,
      type: 'signup',
      timestamp: serverTimestamp(),
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform
      }
    });

    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already registered. Please login instead.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters long.');
    } else {
      throw new Error('An error occurred during signup. Please try again.');
    }
  }
}; 







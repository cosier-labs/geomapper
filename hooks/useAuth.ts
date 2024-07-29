import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebaseConfig'; // Import Firestore configuration
import { createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signInWithCredential, onAuthStateChanged, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ firstName: string; lastName: string } | null>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '246358053582-95e65gm2ti0chd85b9dmrs8dleiu63rn.apps.googleusercontent.com',
    androidClientId: '246358053582-95e65gm2ti0chd85b9dmrs8dleiu63rn.apps.googleusercontent.com',
    iosClientId: '1080386554290-cq3m5krr8cgutrkku7jq0nk90ij4ff37.apps.googleusercontent.com'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
       
        const userDoc = doc(db, "users", user.email || "");
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data() as { firstName: string; lastName: string });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((error) => {
        console.error('Sign in with credential error:', error);
      });
    }
  }, [response]);

  const signUpWithEmailAndPassword = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add user details to Firestore
      const userRef = doc(db, "users", email); // or use user.uid if available
      await setDoc(userRef, { firstName, lastName, email });

      return user; // Return the user object if needed
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await firebaseSignInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return {
    user,
    userData,
    signUpWithEmailAndPassword,
    loginWithEmailAndPassword,
    signOut,
    signInWithGoogle: () => promptAsync(),
  };
};

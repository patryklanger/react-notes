import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from '../data/firebase';
import User from '../models/User.model';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    var response = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = {
      email: response.user.email as string,
      uid: response.user.uid as string,
      emailVerified: response.user.emailVerified as boolean,
    };
    return user;
  } catch (error: any) {
    var firebaseError = error as FirebaseError;
    throw new Error(firebaseError.code);
  }
};
export const login = async (email: string, password: string): Promise<User> => {
  try {
    var response = await signInWithEmailAndPassword(auth, email, password);
    const user: User = {
      email: response.user.email as string,
      uid: response.user.uid as string,
      emailVerified: response.user.emailVerified as boolean,
    };
    return user;
  } catch (error: any) {
    var firebaseError = error as FirebaseError;
    throw new Error(firebaseError.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    var firebaseError = error as FirebaseError;
    throw new Error(firebaseError.code);
  }
};

export const getCurrentUser = async () => {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  const user: User = {
    email: firebaseUser.email as string,
    uid: firebaseUser.uid as string,
    emailVerified: firebaseUser.emailVerified as boolean,
  };
  return user;
};
export { auth as firebaseAuth };

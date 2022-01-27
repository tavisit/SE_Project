import { auth } from './common';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const register = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

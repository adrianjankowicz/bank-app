import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import fbConfig from './config'

const firebaseConfig = {
    apiKey: fbConfig.apiKey,
    authDomain: fbConfig.authDomain,
    databaseURL:  fbConfig.databaseURL,
    projectId: fbConfig.projectId,
    storageBucket: fbConfig.storageBucket,
    messagingSenderId: fbConfig.messagingSenderId,
    appId: fbConfig.appId,
    measurementId: fbConfig.measurementId
  };

const app = initializeApp(firebaseConfig);
export let auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export let db = getFirestore();

export let register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export let login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export let logout = () => signOut(auth);
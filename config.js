// firebase config key setup

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

//your web app's firebase configuration

const firebaseConfig = {

  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

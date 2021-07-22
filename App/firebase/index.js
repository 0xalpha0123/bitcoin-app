import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQ8gvuSA2rypgSC_BHUpdRF2y89tpmSxY',
  authDomain: 'chatkitty-example-7ed83.firebaseapp.com',
  projectId: 'chatkitty-example-7ed83',
  storageBucket: 'chatkitty-example-7ed83.appspot.com',
  messagingSenderId: '254148809793',
  appId: '1:254148809793:web:e8c2ae9376f26e2658e2c0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

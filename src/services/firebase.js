import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
   apiKey: 'AIzaSyA4ZYGQrLCk60T_MMWgjTY4YeR4lYn8tTM',
   authDomain: 'respectbud.firebaseapp.com',
   databaseURL: 'https://respectbud.firebaseio.com',
   projectId: 'respectbud',
   storageBucket: 'respectbud.appspot.com',
   messagingSenderId: '847327134368',
   appId: '1:847327134368:web:79b123825d7a884e6fffc5',
   measurementId: 'G-26KC2JC5YS',
});

window.firebase = firebase;

firebase.firestore().settings({ experimentalForceLongPolling: true });

export const firestore = firebase.firestore();
export default firebase;

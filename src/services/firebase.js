import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions'

// firebase.initializeApp({
//   apiKey: 'AIzaSyA4ZYGQrLCk60T_MMWgjTY4YeR4lYn8tTM',
//   authDomain: 'respectbud.firebaseapp.com',
//   databaseURL: 'https://respectbud.firebaseio.com',
//   projectId: 'respectbud',
//   storageBucket: 'respectbud.appspot.com',
//   messagingSenderId: '847327134368',
//   appId: '1:847327134368:web:79b123825d7a884e6fffc5',
//   measurementId: 'G-26KC2JC5YS',
// });


// respectbud2
firebase.initializeApp({
  apiKey: "AIzaSyCCp4PAFzaCMIY47nyPLZFMfPTlsEp_NUY",
  authDomain: "inbound-analogy-278220.firebaseapp.com",
  databaseURL: "https://inbound-analogy-278220.firebaseio.com",
  projectId: "inbound-analogy-278220",
  storageBucket: "inbound-analogy-278220.appspot.com",
  messagingSenderId: "531837573566",
  appId: "1:531837573566:web:1021754364828505aec1ef",
  measurementId: "G-1YPP5DR0WT"
});



firebase.firestore().settings({ experimentalForceLongPolling: true });

export const firestore = firebase.firestore();
export const functions = firebase.functions;
export default firebase

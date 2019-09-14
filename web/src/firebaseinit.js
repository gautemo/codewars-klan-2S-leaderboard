import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDkn2EyNZFSXBEqvOJ5xowy4mvpcb-H7bM",
  authDomain: "codewars-leaderboard-2s.firebaseapp.com",
  databaseURL: "https://codewars-leaderboard-2s.firebaseio.com",
  projectId: "codewars-leaderboard-2s",
  storageBucket: "codewars-leaderboard-2s.appspot.com",
  messagingSenderId: "168173005355",
  appId: "1:168173005355:web:676d5551760dc139f0986e"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
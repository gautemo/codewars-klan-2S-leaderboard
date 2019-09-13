<template>
  <div id="app">
    <button @click="showDialog = true">ADD WARRIOR</button>

    <dialog :open="showDialog">
      <input type="text" v-model="newUser" @keyup.enter="addPlayer()">
      <button @click="addPlayer()">ADD</button>
      <button @click="closeDialog()" class="close">X</button>
    </dialog>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

import "firebase/firestore";

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
const db = firebase.firestore();

export default {
  name: 'home',
  data() {
    return {
      allUsers: [],
      newUser: '',
      showDialog: false
    }
  },
  methods: {
    async addPlayer() {
      await db.collection('users').doc(this.newUser).add({timeadded: new Date().toUTCString()});
      this.closeDialog();
    },
    closeDialog(){
      this.newUser = '';
      this.showDialog = false;
    }
  },
  async created(){
    const resp = await fetch('https://europe-west1-codewars-leaderboard-2s.cloudfunctions.net/getAllWarriors');
    this.allUsers = await resp.json();
  }
}
</script>

<style>

html, body{
  margin: 0;
  padding: 0;
}

.close{
  position: absolute;
  top: -15px;
  right: -15px;
  background: red;
  border-radius: 50%;
  border: 1px solid black;
  font-size: 1.5em;
  height: 35px;
  width: 35px;
}

</style>

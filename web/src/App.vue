<template>
  <div id="app">
    <header>
      <h1>Sopra Steria's Codewars challenge!</h1>
      <p>Gather your team members, create a clan(same clan name in Account Settings) 
        on <a href="http://codewars.com" target="_blank" rel="noopener ">Codewars</a>
        and rise up the leaderboard!</p>
      <button @click="showDialog = true">ADD WARRIOR</button>
    </header>
    <Leaderboard :users="allUsers"/>

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
      if(this.newUser.length > 0){
        await db.collection('users').doc(this.newUser).set({updated: new Date().toUTCString()});
        await this.retrieveUsers();
        this.closeDialog();
      }
    },
    closeDialog(){
      this.newUser = '';
      this.showDialog = false;
    },
    async retrieveUsers(){
      const resp = await fetch('https://europe-west1-codewars-leaderboard-2s.cloudfunctions.net/getAllWarriors');
      this.allUsers = await resp.json();
    }
  },
  async created(){
    await this.retrieveUsers();
  },
  components: {
    Leaderboard: () => import('./components/Leaderboard')
  }
}
</script>

<style>

:root{
  --white: rgb(247, 247, 247);
  --main-color: #cf022b;
  --secondary-color: #071E22;
  --first-color: rgb(240, 125, 0);
}

a{
  color: var(--white);
}

body{
  margin: 0;
  background: var(--main-color);
  display: flex;
  justify-content: center;
}

#app{
  width: 80vw;
  margin: 40px 0;
  background: var(--secondary-color);
  color: var(--white); 
  border-radius: 15px;
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

header{
  position: relative;
  margin: 20px 50px;
}

header button{
  position: absolute;
  top: 5px;
  right: 0;
  border: 2px solid var(--white);
  background: transparent;
  color: var(--white);
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

header button:hover{
  border: 2px solid var(--main-color);
  color: var(--main-color);
}

</style>

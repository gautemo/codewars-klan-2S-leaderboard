<template>
  <div id="app">
    <header>
      <h1>Sopra Steria's Codewars challenge!</h1>
      <p>Gather your team members, create a clan(same clan name in Account Settings) 
        on <a href="http://codewars.com" target="_blank" rel="noopener ">Codewars</a>
        and rise up the leaderboard!</p>
      <button @click="showDialog = true">ADD WARRIOR</button>
    </header>
    <button class="toggle one">ALL-TIME</button>
    <button class="toggle two" title="Honor since 14.09 or when player was added">14.09 - 31.12</button>
    <Leaderboard :users="allUsers"/>
    <Loader v-if="allUsers.length === 0" />
    <Info/>

    <AddPlayerDialog :open="showDialog" v-on:closed="closeDialog($event)"/>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      allUsers: [],
      showDialog: false
    }
  },
  methods: {
    async retrieveUsers(){
      const resp = await fetch('https://europe-west1-codewars-leaderboard-2s.cloudfunctions.net/getAllWarriors');
      this.allUsers = await resp.json();
    },
    async closeDialog(refresh){
      if(refresh){
        await this.retrieveUsers();
      }
      this.showDialog = false;
    }
  },
  async created(){
    await this.retrieveUsers();
  },
  components: {
    Leaderboard: () => import('./components/Leaderboard'),
    AddPlayerDialog: () => import('./components/AddPlayerDialog'),
    Info: () => import('./components/Info'),
    Loader: () => import('./components/Loader')
  }
}
</script>

<style>

:root{
  --white: rgb(247, 247, 247);
  --main-color: #cf022b;
  --secondary-color: #071E22;
  --first-color: #f07d00;
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
  box-shadow: 0 5px 20px black;
}

header{
  position: relative;
  margin: 20px 50px;
}

.toggle, header button{
  border: 2px solid var(--white);
  background: transparent;
  color: var(--white);
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

header button{
  position: absolute;
  top: 5px;
  right: 0;
  animation: border-pulsate 10s infinite;
}

header button:hover{
  border: 2px solid var(--main-color);
  color: var(--main-color);
}

@keyframes border-pulsate {
    0%   { border-color: var(--white) }
    40%   { border-color: var(--white) }
    50%  { border-color: var(--main-color); }
    60% { border-color: var(--white) }
    100% { border-color: var(--white) }
}

</style>

<template>
    <dialog @click="dialogClicked" id="d">
        <div>
            <input type="text" v-model="newUser" @keyup.enter="addPlayer()" placeholder="username">
            <button @click="addPlayer()">ADD</button>
        </div>
    </dialog>
</template>

<script>
import firebase from "@/firebaseinit";
import "firebase/firestore";
const db = firebase.firestore();

export default {
  props: {
    open: Boolean
  },
  data() {
    return {
      newUser: '',
    }
  },
  methods: {
    async addPlayer() {
      if(this.newUser.length > 0){
        await db.collection('users').doc(this.newUser).set({updated: new Date().toUTCString()});
        this.closeDialog(true);
      }
    },
    closeDialog(refresh){
      this.newUser = '';
      this.$emit('closed', refresh);
    },
    dialogClicked(e){
        if(e.target.id === 'd'){
            this.closeDialog(false);
        }
    }
  },
  watch: { 
    open(newValue){
        if(newValue){
            document.querySelector('dialog').showModal();
        }else{
            document.querySelector('dialog').close();
        }
    }
  }
}

</script>

<style scoped>
dialog{
    padding: 0;
    border: 1px solid var(--secondary-color);
    border-radius: 2px;
    box-shadow: 0 5px 20px black;
    top: 30%;
}
div{
    padding: 40px;
    width: 80vw;
    display: flex;
}
input{
    flex: 1;
    font-size: 1.5em;
    border-radius: 5px 0 0 5px;
    border: 2px solid var(--secondary-color);
    text-align: center;
    padding: 20px 0;
}
button{
    border-radius: 0 5px 5px 0;
    border: 2px solid var(--secondary-color);
    background: var(--secondary-color);
    font-size: 1.5em;
    color: var(--white);
    padding: 20px;
    cursor: pointer;
}

dialog::backdrop {
    background: rgba(0,0,0,0.4);
    cursor: pointer;
}
</style>
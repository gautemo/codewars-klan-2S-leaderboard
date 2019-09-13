<template>
  <div>
    <section class="user-input">
      <input type="text" v-model="token" @keyup.enter="addToken" />
      <button @click="addToken">ENTER</button>
    </section>
    <section>
      <p>Your codewars api token is needed to perform request to their API. To find your token:</p>
      <ol>
        <li>
          Sign into
          <a href="http://codewars.com" target="_blank" rel="noopener">
            <b>codewars.com</b>
          </a>
        </li>
        <li>
          Hover your
          <b>profile image</b> in the top right corder
        </li>
        <li>
          Click
          <b>Account Settings</b>
        </li>
        <li>
          Scroll down to
          <b>API ACCESS TOKEN</b> and copy the value
        </li>
      </ol>
      <p>Your token is only stored in your localStorage and will never be stored by my backend.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      token: ''
    }
  },
  methods: {
    async addToken() {
      // DAMN FRIGGIN CORS BY CODEWARS API
      //   const resp = await fetch('https://www.codewars.com/api/v1/users/gautemo', {
      //       headers: {
      //           'Authorization': this.token
      //       }
      //   }).catch(err => console.err(err));

        try{
            const resp = await fetch('https://europe-west1-codewars-leaderboard-2s.cloudfunctions.net/getUserStats', {
                method: 'POST',
                body: JSON.stringify({ user: 'gautemo', token: this.token })
            });

            const json = await resp.json();
            if(json){
                localStorage.setItem('codewars-api-token', this.token);
                this.$router.push('/');
            }
        }catch{
            alert('not valid token');
        }
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.user-input {
  width: 70vw;
  height: 70px;
  display: flex;
}

input {
  flex: 1;
  border-radius: 10px 0 0 10px;
  border: 3px solid black;
  text-align: center;
  font-size: 2em;
}

button {
  border-radius: 0 10px 10px 0;
  font-weight: bold;
  padding: 0 20px;
}
</style>

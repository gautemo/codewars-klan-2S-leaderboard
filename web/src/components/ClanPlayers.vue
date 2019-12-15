<template>
    <div class="players">
        <div class="row" v-for="player in playersSorted" :key="player.username">
            <span class="name">
                <a :href="`https://www.codewars.com/users/${player.username}`" target="_blank" rel="noopener noreferrer">
                    {{player.username}}
                </a>
            </span>
            <Cell title="Honor" :value="player.useHonor"/>
            <Cell title="Favourite Language" :value="language(player)"/>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    players: Array,
  },
  computed: {
      playersSorted(){
          return this.players.concat().sort((a,b) => b.useHonor - a.useHonor);
      }
  },
  methods: {
      language(p){
          const languages = Object.entries(p.ranks.languages);
          const fav = languages.sort((a,b) => b[1].score - a[1].score);
          return fav[0][0];
      }
  },
  components: {
      Cell: () => import('./Cell')
  }
}

</script>

<style scoped>
.players{
    font-size: 0.9em;
    margin-left: 10%;
}
.row{
    display: flex;
    align-items: center;
}

.name{
    flex: 1;
    margin: 0 15px;
    font-size: 1.15em;
}
</style>

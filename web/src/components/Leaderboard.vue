<template>
  <div class="clan-list">
    <details v-for="(clan, i) in clans" :key="clan.name">
      <summary :style="{ background: `rgba(240, 125, 0, ${1 - i/3})` }">
        <ClanInfo :clan="clan" :place="i" />
      </summary>
      <ClanPlayers :players="clan.users"/>
    </details>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  },
  computed: {
    clans(){
      const clans = this.users.reduce((acc, cur) => {
        let index = acc.findIndex(team => team.name === cur.clan);
        if(index === -1){
          acc.push({ name: cur.clan, users: [], totalHonor: 0 });
          index = acc.length - 1;
        }
        acc[index].users.push(cur);
        acc[index].totalHonor += cur.useHonor;
        return acc;
      }, []);
      return clans.sort((a,b) => averageScore(b) - averageScore(a));
    }
  },
  components:{
    ClanInfo: () => import('./ClanInfo'),
    ClanPlayers: () => import('./ClanPlayers')
  }
}

const averageScore = clan => clan.totalHonor / clan.users.length;
</script>

<style scoped>
.clan-list{
  margin: 15px 0;
}

summary{
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
}
</style>

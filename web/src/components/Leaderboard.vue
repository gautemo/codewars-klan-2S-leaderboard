<template>
  <div>
    <div v-for="clan in clans" :key="clan.name">
      Name: {{clan.name}}, Score: {{clan.totalHonor}}
    </div>
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
        acc[index].totalHonor += cur.honor;
        return acc;
      }, []);
      return clans.sort((a,b) => averageScore(a) < averageScore(b));
    }
  }
}

const averageScore = clan => clan.totalHonor / clan.users.length;
</script>

<style scoped>

</style>

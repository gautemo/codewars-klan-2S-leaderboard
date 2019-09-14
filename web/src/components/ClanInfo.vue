<template>
  <div class="row">
    <span class="place">{{place + 1}}</span>
    <span class="name">{{clan.name}}</span>
    <Cell title="Average Honor" :value="average"/>
    <Cell title="Total Honor" :value="clan.totalHonor"/>
  </div>
</template>

<script>
export default {
  props: {
    clan: Object,
    place: Number
  },
  computed:{
      average(){
          return parseFloat((this.clan.totalHonor / this.clan.users.length).toFixed(2));
      }
  },
  components: {
      Cell: () => import('./Cell')
  }
}

</script>

<style scoped>
.row{
    display: flex;
    align-items: center;
    width: 100%
}

.lead{
    background: var(--first-color);
}

.name{
    flex: 1;
    font-weight: bold;
    font-size: 1.5em;
    margin: 0 15px;
}
.place{
    background: var(--white);
    color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1.2em;
    height: 30px;
    width: 30px;
    margin: 15px;
}
</style>
